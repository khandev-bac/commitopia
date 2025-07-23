import { GoogleGenAI } from "@google/genai";
import {
    fetchcommitdiff,
    fetchMetadata,
    fetchAllCommits,
} from "./github"; // Make sure this is implemented correctly

const genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
});

function parseRepoLink(repoUrl: string) {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(regex);
    if (match) {
        return {
            owner: match[1],
            repo: match[2].replace(/\.git$/, ""), // remove .git if present
        };
    }
    return null;
}

async function summarizeCommitWithPrompt(
    owner: string,
    repo: string,
    commitHash: string
) {
    const [diffText, metadata] = await Promise.all([
        fetchcommitdiff(owner, repo, commitHash),
        fetchMetadata(owner, repo, commitHash),
    ]);

    const prompt = `
Please analyze this GitHub commit and provide a comprehensive summary:

COMMIT INFORMATION:
- Repository: ${owner}/${repo}
- Commit Hash: ${commitHash}
- Author: ${metadata?.author || "Unknown"}
- Date: ${metadata?.date || "Unknown"}
- Original Message: ${metadata?.message || "No message"}

COMMIT STATISTICS:
- Files Changed: ${metadata?.files?.length || "Unknown"}
- Additions: +${metadata?.stats?.additions || 0}
- Deletions: -${metadata?.stats?.deletions || 0}
- Total Changes: ${metadata?.stats?.total || 0}

DIFF CONTENT:
${diffText}

Please provide:
1. **Summary**: A clear, concise summary of what this commit does
2. **Key Changes**: Main changes made in this commit
3. **Impact**: What functionality was added, modified, or removed
4. **Files Affected**: Which files were modified and their purpose
5. **Technical Details**: Any important technical aspects

Format your response in a structured, easy-to-read manner.
`;

    const result = await genai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });

    const summary = await result.text; // ✅ fixed line

    return {
        commitHash,
        metadata,
        summary,
    };
}


export async function summarizeRepoCommits(repoUrl: string) {
    const parsed = parseRepoLink(repoUrl);
    if (!parsed) throw new Error("Invalid GitHub repository URL.");

    const { owner, repo } = parsed;
    const commits = await fetchAllCommits(owner, repo);

    console.log(`🔍 Total commits found: ${commits.length}`);

    const results = [];

    for (const commit of commits) {
        try {
            console.log(`📦 Summarizing commit: ${commit.hash}`);
            const result = await summarizeCommitWithPrompt(owner, repo, commit.hash);
            results.push(result);

            await new Promise((res) => setTimeout(res, 1000)); // to avoid rate limit
        } catch (err: any) {
            console.error(`❌ Failed commit ${commit.hash}:`, err.message);
            results.push({ commitHash: commit.hash, error: err.message });
        }
    }

    return results;
}


// const TEST_REPO_URL = "https://github.com/khandev-bac/social-media-for-only-chatting"; // 🔁 Replace with your target repo

// (async () => {
// //     try {
// //         const results = await summarizeRepoCommits(TEST_REPO_URL);

// //         console.log("\n✅ Summary Results:");
// //         results.forEach((commit, index) => {
// //             console.log(`\n🔹 Commit #${index + 1} - ${commit.commitHash}`);
// //             if ("error" in commit) {
// //                 console.log(`❌ Error: ${commit.error}`);
// //             } else {
// //                 console.log(`🧠 Summary:\n${commit.summary}`);
// //             }
// //         });
// //     } catch (error) {
// //         console.error("❌ Test failed:", error);
// //     }
// // })();