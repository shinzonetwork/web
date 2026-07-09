import BlockContainer from "@/components/block-container";
import BlockSpacing from "@/components/block-spacing";
import { verifyConfirmToken } from "@/lib/confirm-token";
import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return <ConfirmResult success={false} message="No confirmation token provided." />;
  }

  let success = false;

  try {
    const email = await verifyConfirmToken(token);

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unsubscribed: false }),
      });
    }

    const payload = await getPayload({ config: configPromise });
    const leads = await payload.find({
      collection: "leads",
      where: { email: { equals: email } },
      limit: 100,
    });

    await Promise.all(
      leads.docs.map((lead) =>
        payload.update({
          collection: "leads",
          id: lead.id,
          data: { confirmed: true },
        })
      )
    );

    success = true;
  } catch {
    // token invalid or expired
  }

  if (!success) {
    return <ConfirmResult success={false} message="This confirmation link is invalid or has expired." />;
  }

  return <ConfirmResult success />;
}

function ConfirmResult({
  success,
  message,
}: {
  success: boolean;
  message?: string;
}) {
  return (
    <BlockSpacing>
      <BlockContainer>
        <div className="max-w-lg richtext">
          {success ? (
            <>
              <h1 className="text-h3">You&apos;re confirmed.</h1>
              <p>We&apos;ll be in touch when support is added.</p>
            </>
          ) : (
            <>
              <h1 className="text-h3">Something went wrong.</h1>
              <p>{message}</p>
            </>
          )}
        </div>
      </BlockContainer>
    </BlockSpacing>
  );
}
