import { useNavigate } from "react-router-dom";

const CountryRow = ({ flags, name, area, region, population }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${name.common}`);
  };

  return (
    <tr className="hover:cursor-pointer" onClick={handleClick}>
      <td>
        <img className="w-[50px] rounded" src={flags.svg} alt={flags.alt} />
      </td>
      <td>{name.common}</td>
      <td>{population}</td>
      <td>{area}</td>
      <td>{region}</td>
    </tr>
  );
};

export default CountryRow;
