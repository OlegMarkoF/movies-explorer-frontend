import "./Main.css";
import Header from "../Header/Header";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Footer from "../Footer/Footer";
import Portfolio from "../Portfolio/Portfolio";

function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main className="main">
          <Promo/>
          <AboutProject/>
          <Techs/>
          <AboutMe/>
          <Portfolio/>
      </main>
      <Footer/>
    </>
  );
}

export default Main;
