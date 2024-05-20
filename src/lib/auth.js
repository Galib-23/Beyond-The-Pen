import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";


const login = async(credentials) =>{
  try {
    await connectToDb();
    const user = await User.findOne({username: credentials.username});
    if(!user){
      throw new Error("Wrong Credentials");
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if(!isPasswordCorrect){
      throw new Error("wrong credentials!");
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
  } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials){
        try {
          const user = await login(credentials)
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({user, account, profile}){
      if(account.provider === "github"){
        connectToDb();
        try {
          const user = await User.findOne({email: profile.email})
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            })
            await newUser.save();
            console.log("user saved to db!!!")
          }
          
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    }
  }
});
