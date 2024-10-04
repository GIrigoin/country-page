import logoImg from "../assets/Logo.svg";
import CountryCards from "../components/CountryCards";
import Filter from "../components/Filter";

const Home = () => {
  return (
    <div>
      <img src={logoImg} alt="World Ranks" />
      <div className="flex flex-row">
        <Filter />
        <CountryCards />
      </div>
    </div>
  );
};

export default Home;
