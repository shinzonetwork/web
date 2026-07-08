import { resolveShinzoHubChain } from "@/shared/lib/shinzohub/resolve-chain";

export async function GET() {
  try {
    const chain = await resolveShinzoHubChain();
    return Response.json({ chain });
  } catch (error) {
    console.error("Failed to resolve ShinzoHub chain:", error);
    return Response.json(
      { error: "Failed to resolve ShinzoHub chain" },
      { status: 502 }
    );
  }
}
