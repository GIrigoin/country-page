import CountryCards from "../components/CountryCards";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="max-w-7xl w-screen flex justify-center px-0 md:px-6 xl:px-10">
      <div className=" w-full flex flex-col border border-input-bg rounded-xl bg-background py-6 px-8">
        <SearchBar />
        <div className="flex flex-col lg:flex-row">
          <Filter />
          <CountryCards />
        </div>
      </div>
    </div>
  );
};

export default Home;
