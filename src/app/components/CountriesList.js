import "./CountriesList.css";

export const CountriesList = ({ name, population, area, flag }) => {
  return (
    <div className="countries_country">
      <div className="country_img">
        <img src={flag} />
      </div>
      <div className="country_name">
        <p>{name}</p>
      </div>
      <div className="country_population">
        <p>{population}</p>
      </div>
      <div className="country_area">
        <p>{area}</p>
      </div>
    </div>
  );
};
