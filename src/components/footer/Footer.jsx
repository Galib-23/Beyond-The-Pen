import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Galib</div>
      <div className={styles.text}>
        Asadullah Al Galib © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;