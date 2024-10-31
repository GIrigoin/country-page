import { useNavigate } from "react-router-dom";

const CountryRow = ({ flags, name, area, region, population }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/country-page/detail/${name.common}`);
  };

  return (
    <tr
      className="hover:cursor-pointer text-main-text text-title font-medium hover:bg-secondary-text active:bg-main-text"
      onClick={handleClick}
    >
      <td>
        <img
          className="w-[50px] rounded py-2 mr-10"
          src={flags.svg}
          alt={flags.alt}
        />
      </td>
      <td className="mr-2">{name.common}</td>
      <td className="mr-2">{population}</td>
      <td className="mr-2">{area}</td>
      <td className="mr-2">{region}</td>
    </tr>
  );
};

export default CountryRow;
