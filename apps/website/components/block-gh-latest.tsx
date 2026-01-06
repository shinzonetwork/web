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

type LatestCommit = {
    data: LatestCommitData;
    repo: string;
} | null;

const REPOS = [
    { owner: 'shinzonetwork', name: 'shinzo-indexer-client' },
    { owner: 'shinzonetwork', name: 'shinzo-view-creator' },
    { owner: 'shinzonetwork', name: 'shinzo-host-client' },
] as const;

async function getLatestCommitForRepo(owner: string, repo: string): Promise<LatestCommit> {
    try {
        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            console.warn('GITHUB_TOKEN is not set');
            return null;
        }

        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/commits/main`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                    'User-Agent': 'node-fetch',
                },
                next: { revalidate: 3600 }, // revalidate at most every hour
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            try {
                const errorJson = JSON.parse(errorText);
                console.error(`Error fetching ${owner}/${repo}:`, JSON.stringify(errorJson, null, 2));
            } catch (e) {
                console.error(`Error response text for ${owner}/${repo}:`, errorText);
            }
            return null;
        }

        const commitData = await res.json<LatestCommitData>();

        return {
            data: commitData,
            repo: `${repo}`,
        };
    } catch (error) {
        console.error(`Error fetching ${owner}/${repo}:`, error);
        return null;
    }
}

async function getLatestCommit(): Promise<LatestCommit> {
    try {
        const commits = await Promise.all(
            REPOS.map(({ owner, name }) => getLatestCommitForRepo(owner, name))
        );

        const validCommits = commits.filter((commit): commit is NonNullable<LatestCommit> => commit !== null);

        if (validCommits.length === 0) return null;


        const latestCommit = validCommits.sort((a, b) => {
            const da = new Date(a?.data?.commit?.author?.date || '').getTime();
            const db = new Date(b?.data?.commit?.author?.date || '').getTime();
            return db - da;
        })[0];

        return latestCommit;
    } catch (error) {
        console.error('Error fetching latest commit:', error);
        return null;
    }
}

export default async function BlockGhLatest() {

    const latestCommit = await getLatestCommit();
    const latestCommitRepo = latestCommit?.repo;
    const latestCommitData = latestCommit?.data;

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
                            <span className="underline underline-offset-2">
                                {`[${latestCommitRepo}] ${commitMessage}`}
                            </span> - {commitAuthor}
                        </Link>
                    </div>

                    <div className="opacity-50">{latestCommitDateString}</div>
                </div>
            </BlockContainer>
        </BlockSpacing>
    );
}
