// import { Octokit } from "octokit"
import { Octokit } from "@octokit/rest";
// import { da } from "date-fns/locale";
//TODO:
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN, // optional if public repo
});
// export function parseGithubLink(githublink: string) {
//     const regex = /github\.com\/([^\/]+)\/([^\/]+)\/commit\/([a-f0-9]+)/;
//     const match = githublink.match(regex)
//     if (match) {
//         return {
//             owner: match[1],
//             repo: match[2],
//             commitHash: match[3]
//         }
//     }
//     return null
// }
export async function fetchcommitdiff(owner: string, repo: string, commitHash: string) {
    try {
        const response = await fetch(`https://github.com/${owner}/${repo}/commit/${commitHash}.diff`, {
            headers: {
                'Accept': 'application/vnd.github.v3.diff',
                // 'User-Agent': 'YourAppName' // Optional but good practice
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch diff: ${response.status} ${response.statusText}`);
        }

        const diffText = await response.text();
        return diffText;
    } catch (error) {
        console.error('Error fetching commit diff:', error);
        throw error;
    }
}

// export async function fetchMetadata(owner: string, repo: string, commitHash: string) {
//     try {
//         const diffurl = `https://github.com/${owner}/${repo}/commit/${commitHash}`
//         const response = await fetch(diffurl)
//         if (!response.ok) {
//             throw new Error(`Failed to fetch diff: ${response.status} ${response.statusText}`);
//         }
//         const commitData = await response.json()
//         return {
//             message: commitData.commit.message,
//             author: commitData.commit.author.name,
//             date: commitData.commit.author.date,
//             stats: commitData.stats,
//             files: commitData.files
//         }
//     } catch (error) {
//         console.error('Error fetching commit metadata:', error);
//         return null;
//     }
// }


export async function fetchMetadata(owner: string, repo: string, commitHash: string) {
    try {
        const { data: commitData } = await octokit.rest.repos.getCommit({
            owner,
            repo,
            ref: commitHash
        });

        return {
            message: commitData.commit.message,
            author: commitData.commit.author?.name || commitData.author?.login || 'Unknown',
            date: commitData.commit.author?.date || 'Unknown',
            stats: commitData.stats,
            files: commitData.files
        };
    } catch (error) {
        console.error('Error fetching commit metadata:', error);
        return null;
    }
}

export async function fetchAllCommits(owner: string, repo: string) {
    try {
        const commits = await octokit.paginate(octokit.repos.listCommits, {
            owner,
            repo,
            per_page: 100,
        });

        return commits.map(commit => ({
            hash: commit.sha,
            message: commit.commit.message,
            author: commit.commit.author?.name || commit.author?.login || 'Unknown',
            date: commit.commit.author?.date || 'Unknown',
        }));
    } catch (error) {
        console.error("Error fetching commits:", error);
        return [];
    }
}
// console.log(fetchAllCommits("khandev-bac", "social-media-for-only-chatting").then((data) => { console.log(data) }))