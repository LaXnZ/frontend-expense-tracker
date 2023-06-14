import "./HomeStyles.css";
import Navbar from "./Navbar";
import image from "../images/1.png";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="section-container">
          <div className="columns image">
            {/* <img src={image} alt="My Image" /> */}
          </div>
          <div className="columns content">
            <div className="content-container">
              <h2>Saverly</h2>
              <p>
                Welcome to Saverly, the ultimate expenses tracking website that
                helps you take control of your finances like never before! With
                Saverly, you can easily manage your expenses, keep track of your
                spending habits, and make smarter financial decisions. Our
                user-friendly interface and intuitive features make it easy for
                anyone to use, regardless of their financial expertise.
              </p>
              <p>
                Say goodbye to the hassle of manual expense tracking and hello
                to Saverly's automated expense tracking system. Our website
                provides you with a simple and efficient way to keep track of
                your expenses and monitor your budget. Plus, with our detailed
                reports and charts, you can easily analyze your spending habits
                and identify areas where you can save money.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
