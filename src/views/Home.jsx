import CountryCards from "../components/CountryCards";
import Filter from "../components/Filter";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <Filter />
        <CountryCards />
      </div>
    </div>
  );
};

export default Home;
