import { summarizeRepoCommits } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { repoUrl } = await req.json();
        if (!repoUrl) {
            return NextResponse.json({ error: 'Missing repoUrl' }, { status: 400 });
        }
        const res = await summarizeRepoCommits(repoUrl)
        return NextResponse.json({ data: res });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}