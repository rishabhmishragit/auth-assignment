import styles from "./styles.module.css";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <div className={styles.home}>Logged In Successfully</div>;
      <button className={styles.white_btn} onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Home;
