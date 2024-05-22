import LoginForm from "@/components/loginForm/LoginForm";
import styles from "./login.module.css";
import { handleGithubLogin } from "@/lib/action";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
        <form action={handleGithubLogin}>
          <button style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px"
          }} className={styles.github}>Login with Github <FaGithub  style={{
            fontSize: "18px"
          }}/></button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
