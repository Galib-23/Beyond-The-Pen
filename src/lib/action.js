"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const testFun = async () => {
  "use server";
  console.log("clicked");
};

export const addPost = async (prevState, formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      img,
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
    console.log("Deleted successfully");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log("Error in Deletion : ", error);
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogOut = async () => {
  await signOut();
};

export const handleRegister = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);
  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }
  try {
    connectToDb();

    const user = await User.findOne({ username });
    if (user) {
      console.log("Username already exists");
      return { error: "Username already exists" };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    return { success: true };
  } catch (error) {
    console.log("Error in creating user: ", error);
    return { error: "Error in creating user. "}
  }
};

export const handleLogin = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
      await signIn("credentials", { username, password });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message;
      }
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
};

export const addUser = async (prevState,formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);
  
  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};