import LoginForm from "@/components/loginForm/LoginForm";
import styles from "./login.module.css";
import { handleGithubLogin } from "@/lib/action";

const LoginPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
