import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, {params}) => {
    try {
        await connectToDb();
        const { slug } = params; 
        const post = await Post.findOne({slug});
        if(!post){
            return new Response("Post not found", {status: 404})
        }
        return NextResponse.json(post);
    } catch (error) {
        return new Response("Error in getting single blog", {status: 500});
    }
}

export const DELETE = async (request, { params }) => {
    const { slug } = params;
    try {
      await connectToDb();
  
      await Post.deleteOne({ slug });
      return NextResponse.json("Post deleted");
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete post!");
    }
  };