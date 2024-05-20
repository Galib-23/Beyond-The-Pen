"use client"
import React, { useEffect, useState } from 'react'
import styles from "./blog.module.css";
import PostCard from '@/components/postCart/postCard';



const Blog = () => {

  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    const getBlogPosts = async () => {
      const res = await fetch("/api/blog", {next: {revalidate: 3600}});
      const data = await res.json();
      setPosts(data);
    }
    getBlogPosts()
  }, [])
  
  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default Blog
