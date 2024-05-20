import Link from 'next/link'
import React from 'react'
import styles from './loginForm.module.css'

const LoginForm = () => {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  )
}

export default LoginForm