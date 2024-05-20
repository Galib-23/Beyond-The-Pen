"use server";

import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";

export const testFun = async () => {
  "use server";
  console.log("clicked");
};

export const addPost = async (prevState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    console.log("Post added successfully");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log("Error in adding Post: ", error);
  }
};

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("Deleted successfully")
        revalidatePath("/blog");
        revalidatePath("/admin");
    } catch (error) {
        console.log("Error in Deletion : ", error)
    }
}
