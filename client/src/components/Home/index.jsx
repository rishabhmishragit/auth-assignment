import styles from "./styles.module.css";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <div className={styles.container}>
        <p className={styles.home}>Logged In Successfully</p>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
