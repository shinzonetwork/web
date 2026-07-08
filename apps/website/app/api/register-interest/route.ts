import { createConfirmToken } from "@/lib/confirm-token";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      network: number;
      name: string;
      email: string;
      domain?: string;
      otherChains?: string;
      socialMedia?: { platform: string; link: string }[];
    };
    const payload = await getPayload({ config: configPromise });

    const apiKey = process.env.RESEND_API_KEY;
    const segmentId = process.env.RESEND_SEGMENT_ID;

    const headers = {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    let isExisting = false;
    let alreadyConfirmed = false;

    if (apiKey && segmentId) {
      const existingRes = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(body.email)}`, { headers });
      if (existingRes.ok) {
        isExisting = true;
        const existingData: { unsubscribed: boolean } = await existingRes.json();
        alreadyConfirmed = !existingData.unsubscribed;
      }
    }

    await payload.create({
      collection: "leads",
      data: {
        network: body.network,
        name: body.name,
        email: body.email,
        domain: body.domain,
        otherChains: body.otherChains,
        socialMedia: body.socialMedia,
        confirmed: alreadyConfirmed,
      },
    });

    if (!apiKey || !segmentId) {
      return NextResponse.json({ emailSent: false });
    }

    await fetch(`https://api.resend.com/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: body.email,
        first_name: body.name,
        ...(!isExisting && { unsubscribed: true }),
        segments: [{ id: segmentId }],
      }),
    });

    if (isExisting) {
      return NextResponse.json({ emailSent: false });
    }

    const token = await createConfirmToken(body.email);
    const baseUrl = process.env.NEXT_PUBLIC_URL || "https://shinzo.network";
    const confirmUrl = `${baseUrl}/confirm?token=${token}`;

    try {
      await payload.sendEmail({
        to: body.email,
        subject: "Confirm your interest in Shinzō",
        html: `
          <img src="${baseUrl}/shinzo-logo-email.png" alt="Shinzō" width="200" style="display:block;margin-bottom:24px;" />
          <p>Thanks for registering your interest in becoming a Generator on Shinzō.</p>
          <p>Please confirm your email address by clicking the link below. This link expires in 24 hours.</p>
          <p><a href="${confirmUrl}">Confirm my email</a></p>
          <p>If you didn't submit this request, you can safely ignore this email.</p>
        `,
      });
    } catch (err) {
      payload.logger.error({ err, email: body.email }, "Failed to send confirmation email");
      return NextResponse.json({ emailSent: false });
    }

    return NextResponse.json({ emailSent: true });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ errors: [{ message }] }, { status: 400 });
  }
}
