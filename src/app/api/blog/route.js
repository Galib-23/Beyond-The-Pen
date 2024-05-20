import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils"
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await connectToDb();
        const posts = await Post.find();
        //console.log(posts)
        return NextResponse.json(posts);
    } catch (error) {
        return new Response("Failed to fetch posts", {status: 500})
    }
}