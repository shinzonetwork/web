import Link from 'next/link';
import BlockContainer from './block-container';
import BlockSpacing from './block-spacing';

type LatestCommitData = {
    html_url: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
} | null;

async function getLatestCommit(): Promise<LatestCommitData> {
    try {
        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            console.warn('GITHUB_TOKEN is not set');
            return null;
        }

        const res = await fetch(
            "https://api.github.com/repos/shinzonetwork/shinzo-host-client/commits/main",
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    'User-Agent': 'node-fetch',
                },
                next: { revalidate: 3600 }, // cache for 60s
            }
        );

        if (!res.ok) {
            const errorText = await res.text();

            try {
                const errorJson = JSON.parse(errorText);
                console.error('Error details:', JSON.stringify(errorJson, null, 2));
            } catch (e) {
                console.error('Error response text:', e);
            }

            return null;
        }

        const latestCommitData = await res.json<LatestCommitData>();

        return latestCommitData;
    } catch (error) {

        console.error(error);
        return null;
    }
}

export default async function BlockGhLatest() {

    const latestCommitData = await getLatestCommit();

    if (!latestCommitData) {
        return null;
    }

    const commitUrl = latestCommitData.html_url;
    const commitMessage = latestCommitData.commit.message.split('\n')[0];
    const commitAuthor = latestCommitData.commit.author.name;
    const latestCommitDateString = new Date(latestCommitData.commit.author.date).toLocaleTimeString();

    return (
        <BlockSpacing spacing="py-5 bg-szo-light-gray">
            <BlockContainer>

                <div className="flex flex-wrap items-center gap-3 text-px-12 font-medium">
                    <div className="font-mono text-szo-primary border border-szo-primary rounded-full px-4 py-1">Latest</div>
                    <div className=''>
                        <Link href={commitUrl} target="_blank">
                            <span className="underline underline-offset-2">{commitMessage}</span> - {commitAuthor}
                        </Link>
                    </div>

                    <div className="opacity-50">{latestCommitDateString}</div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
