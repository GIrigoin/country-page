import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAllCountries,
  setDisplayedCountries,
  sortCountries,
  changeFilter,
} from "./redux/countriesSlice";
import { getAllCountries } from "./utils/fetchData";
import logoImg from "./assets/Logo.svg";
import Home from "./views/Home";
import Detail from "./views/Detail";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const countries = await getAllCountries();
        dispatch(setAllCountries(countries));
        dispatch(setDisplayedCountries(countries));
        dispatch(sortCountries("population"));
        // dispatch(changeFilter({ Oceania: true, independent: true }));
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div className=" bg-app-bg bg-[length:1280px_300px]  bg-no-repeat bg-top bg-background min-h-screen flex flex-col items-center py-20 overflow-x-hidden">
      <img className="mt-10 mb-24" src={logoImg} alt="World Ranks" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:country" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
