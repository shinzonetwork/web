import type { Endpoint } from "payload";

export const upvoteEndpoint: Endpoint = {
  path: "/:id/upvote",
  method: "post",
  handler: async (req) => {
    const id = req.routeParams?.id as string;
    if (!id) {
      return Response.json({ error: "Missing chain ID" }, { status: 400 });
    }

    const chain = await req.payload.findByID({
      id,
      collection: "chains",
      select: { upvotes: true },
    });

    if (!chain) {
      return Response.json({ error: "Chain not found" }, { status: 404 });
    }

    const updated = await req.payload.update({
      id,
      collection: "chains",
      context: { disableRevalidate: true },
      data: {
        upvotes: (chain.upvotes || 0) + 1,
      },
    });

    return Response.json({ upvotes: updated.upvotes });
  },
};
