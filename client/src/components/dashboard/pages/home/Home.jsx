import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="item">

        <h1>Welcome to admin panel</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
