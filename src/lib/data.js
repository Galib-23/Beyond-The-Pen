import { Post, User } from "./models";
import { connectToDb } from "./utils"

export const getPosts = async () => {
    try {
        await connectToDb();
        const posts = await Post.find();
        if(!posts){
            throw new Error("Posts not found");
        }
        return posts;
    } catch (error) {
        console.log("Failed to get posts! Error: ", error)
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb();
        const post = await Post.findOne({slug});
        if(!post){
            throw new Error("Post not found");
        }
        return post;
    } catch (error) {
        console.log("error in fetching single post: ", error)
    }
}

export const getUser = async (id) => {
    try {
        connectToDb();
        const user = User.findById(id);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.log("Error in getting user: ", error)
    }
}

export const getUsers = async () => {
    try {
        connectToDb();
        const users = User.find();
        if(!users){
            throw new Error("Users not found");
        }
        return users;
    } catch (error) {
        console.log("Error in getting user: ", error)
    }
}