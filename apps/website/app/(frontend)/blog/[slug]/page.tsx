import BlockContainer from "@/components/block-container";
import BlockHero from "@/components/block-hero";
import RichText from "@/components/RichText";
import { asPopulated, isPopulated } from "@/lib/utils";
import { Post } from "@/payload/payload-types";
import configPromise from '@payload-config';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { cache } from "react";

type BlogDetailProps = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise });

    const posts = await payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    return posts?.docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: paramsPromise }: BlogDetailProps): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const decodedSlug = decodeURIComponent(slug)
    const post = await queryPostBySlug({ slug: decodedSlug });

    return generateMeta({ doc: post })
}

export default async function BlogDetail({ params }: BlogDetailProps) {
    const { slug = '' } = await params;
    const post = await queryPostBySlug({ slug });

    const nextPost = await queryAdjacentPost({ date: post?.publishedAt || '', slug: slug, direction: 'next' });
    const previousPost = await queryAdjacentPost({ date: post?.publishedAt || '', slug: slug, direction: 'previous' });

    if (!post) return notFound();

    const image = asPopulated(post.featuredImage);

    return (
        <div>
            <BlockHero title={<h1>{post.title}</h1>} content={<div>
                <h2 className="text-h4">{post.subtitle}</h2>
                <p className="text-px-12 font-mono">[{post.publishedAt}]
                    {post?.authors?.length && post?.authors?.length > 0 && " | "}
                    {post?.authors?.map((author) => {
                        if (isPopulated(author)) return author?.name;
                    }).join(', ')}
                </p>
            </div>} spacing="pt-10 md:pt-15" />

            <BlockContainer>
                <div className="md:grid grid-cols-12 border-t border-szo-border pt-10">

                    <div className="col-span-2 mb-10"><Link href="/blog" className="font-mono font-bold text-szo-primary text-px-14 text-right">{`{Back}`}</Link></div>

                    <div className="col-span-7 col-start-3 richtext">
                        {image && <Image src={image.url || ''} alt={image.alt || ''} width={image.width || 0} height={image.height || 0} className="w-full aspect-video object-cover border border-szo-border mb-10" />}
                        {post.content && <RichText data={post.content} />}

                        <div className="flex flex-col gap-y-4 not-prose mt-10">
                            {previousPost && <Link href={`/blog/${previousPost?.slug || ''}`} className="group border border-szo-border p-4 hover:bg-szo-light-gray transition-all">
                                <p className="text-px-14 mb-2">Previous Post</p>
                                <h4 className="text-h4 mb-2 group-hover:underline">{previousPost?.title || ''}</h4>
                                <p className="text-px-12 font-mono">[{previousPost?.publishedAt || ''}]</p>
                            </Link>}

                            {nextPost && <Link href={`/blog/${nextPost?.slug || ''}`} className="text-right group border border-szo-border p-4 hover:bg-szo-light-gray transition-all">
                                <p className="text-px-14 mb-2">Next Post</p>
                                <h4 className="text-h4 mb-2 group-hover:underline">{nextPost?.title || ''}</h4>
                                <p className="text-px-12 font-mono">[{nextPost?.publishedAt || ''}]</p>
                            </Link>}
                        </div>
                    </div>
                </div>
            </BlockContainer>
        </div>
    );
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'posts',
        limit: 1,
        overrideAccess: false,
        pagination: false,
        where: { slug: { equals: slug, }, },
    })

    return result.docs?.[0] || null
});

const queryAdjacentPost = cache(async ({ date, slug, direction = 'next' }: { date: string, slug: string, direction?: 'previous' | 'next' }) => {
    const payload = await getPayload({ config: configPromise })
    const operator = direction === 'previous' ? { greater_than: date } : { less_than: date };
    const sort = direction === 'previous' ? 'publishedAt' : '-publishedAt';
    const post = await payload.find({ collection: 'posts', limit: 1, sort: sort, where: { publishedAt: operator, slug: { not_equals: slug, }, }, });

    return post.docs?.[0] || null;
})

const generateMeta = async (args: {
    doc: Partial<Post> | null
}): Promise<Metadata> => {
    const { doc } = args;

    const title = doc?.meta?.title ? doc?.meta?.title : doc?.title ? `${doc?.title} | Shinzō` : 'Shinzō';
    const description = doc?.meta?.description ? doc?.meta?.description : doc?.excerpt ? doc?.excerpt : '';

    return { title, description, }
}
