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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:country" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
