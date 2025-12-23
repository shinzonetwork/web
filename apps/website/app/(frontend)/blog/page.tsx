import BlockContainer from "@/components/block-container";
import BlockHero from "@/components/block-hero";
import SectionTitle from "@/components/section-title";
import { isPopulated } from "@/lib/utils";
import configPromise from '@payload-config';
import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";

export const dynamic = "force-static"
export const revalidate = 600

export async function generateMetadata({ }): Promise<Metadata> {
    const blogLanding = await queryBlogLandingGlobal();

    return {
        title: blogLanding?.meta?.title || blogLanding.title || 'Blog | Shinzō',
        description: blogLanding?.meta?.description || blogLanding.subtitle || '',
    };
}

export default async function Blog() {
    const blogLanding = await queryBlogLandingGlobal();
    const posts = await queryPosts();

    const firstPost = posts.docs[0];
    const morePosts = posts.docs.slice(1);

    return (
        <div>
            <BlockHero
                title={<h1>{blogLanding?.title}</h1>}
                content={<p>{blogLanding?.subtitle}</p>}
            />

            <BlockContainer>
                {firstPost && (
                    <Link href={`/blog/${firstPost.slug}`} className="md:grid grid-cols-12 group">
                        <div className="col-span-6 order-2 md:order-1 mb-10 md:mb-0">
                            {isPopulated(firstPost.featuredImage) && (
                                <Image
                                    src={firstPost.featuredImage?.url || ''}
                                    alt={firstPost.featuredImage?.alt || ''}
                                    width={firstPost.featuredImage?.width || 500}
                                    height={firstPost.featuredImage?.height || 250}
                                    className="w-full h-[250px] object-cover border border-szo-border group-hover:border-szo-primary transition-all" />
                            )}
                        </div>

                        <div className="col-span-6 flex flex-col gap-y-4 md:mr-6">
                            <p className="text-px-14 text-szo-red font-mono">[{firstPost.publishedAt}]</p>
                            <h2 className="text-h2 group-hover:underline transition-all">{firstPost.title}</h2>
                            <p className="text-px-12 font-mono">{firstPost?.authors?.map((author) => {
                                if (isPopulated(author)) return author.name;
                            }).join(', ')}</p>
                            <div className="richtext">{firstPost.excerpt}</div>
                            <p className="font-mono font-bold text-szo-primary">{`{Read More}`}</p>
                        </div>
                    </Link>
                )}

                {morePosts?.length > 0 && <div className="flex flex-col my-20">
                    <SectionTitle text="More Posts" className="mb-4" />

                    {morePosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="md:flex items-end justify-between border-b border-szo-border py-4 group hover:bg-szo-light-gray">
                            <div>
                                <h2 className="text-h4 group-hover:underline transition-all">{post.title}</h2>
                                <div className="flex items-center flex-wrap gap-x-2 text-px-12 font-mono">
                                    <p>[{post.publishedAt}]
                                        {post?.authors?.length && post?.authors?.length > 0 ? " | " : ""}
                                        {post?.authors?.map((author) => {
                                            if (isPopulated(author)) return author.name;
                                        }).join(', ')}
                                    </p>
                                </div>
                            </div>

                            <p className="font-mono font-bold text-szo-primary text-px-14 shrink-0 block text-right self-end">{`{Read More}`}</p>
                        </Link>
                    ))}
                </div>}
            </BlockContainer>
        </div >
    );
}

const queryPosts = async () => {
    const payload = await getPayload({ config: configPromise });

    return await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 1000,
        overrideAccess: false,
        sort: "-publishedAt",
        select: {
            title: true,
            slug: true,
            featuredImage: true,
            excerpt: true,
            publishedAt: true,
            authors: true,
        },
    });
}

const queryBlogLandingGlobal = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise });
        const global = await payload.findGlobal({
            slug: 'blogLanding',
            depth: 2,
            select: {
                title: true,
                subtitle: true,
                featuredPost: true,
                meta: true,
            },
        });

        return global;
    },
    ['blogLanding'],
    { tags: [`global_blogLanding`] }
);
