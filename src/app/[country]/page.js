"use client";
import { useEffect, useState } from "react";
import "./page.css";
import { CountryNeighbors } from "../components/CountryNeighbors";

export default function Country({ params }) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flags, setFlags] = useState(null)

  const fetchCountry = async () => {
    setLoading(true);
    let flags = []
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${params.country}`
      );
      const data = await response.json();
      setCountry(data[0]);
      setLoading(false);
      console.log(data[0]);


      if (data[0].borders.length > 0) {
        for(let border of data[0].borders){
          const res_neighbors = await fetch(
            `https://restcountries.com/v3.1/alpha/${border}`
          )
          const data_neighbors = await res_neighbors.json()
          console.log(data_neighbors[0]);
          flags = [...flags, data_neighbors[0]]
        }
        setFlags(flags)
        
      }


    } catch (error) {
      console.log("error: ", error);
      setLoading(false); // Stop loading even in case of error
    }
  };

  const addCommos = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    fetchCountry();
  }, [params]);

  useEffect(() => {
    console.log(flags);
  },   [flags])

  if (loading && !country) {
    return (
      <div className="loading-block">
        <div>
          <img src="./Eclipse@1x-1.0s-200px-200px.svg" alt="Loading spinner" />
        </div>
      </div>
    );
  }

  // Ensure country is not null before rendering
  if (!country) {
    return (
      <div className="loading-block">
        <div>
          <img src="./Eclipse@1x-1.0s-200px-200px.svg" alt="Loading spinner" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bc_box">
        <div className="background">
          <div className="background_logo">
            <img src="./logo.svg" alt="Logo" />
          </div>
        </div>
        <div className="lowerBackground"></div>
      </div>

      <div className="main_page">
        <div className="page_flag">
          {country.flags ? (
            <img src={country.flags.svg} alt={country.flags.alt} />
          ) : (
            <p>No flag available</p>
          )}
        </div>
        <div>
          <div className="page_names">
            <div className="names_common">{country.name.common}</div>
            <div className="names_official">{country.name.official}</div>
          </div>

          <div className="page_boxes">
            <div className={`boxes_box first_box`}>
              <div className="box_text">Population</div>
              <div className="vertical"></div>
              <div className="box_value">{addCommos(country.population)}</div>
            </div>
            <div className={`boxes_box second_box`}>
              <div className="box_text">
                Area(km<sup>2</sup>)
              </div>
              <div className="vertical"></div>
              <div className="box_value">{addCommos(country.area)}</div>
            </div>
          </div>

          <div className="page_parts">
            <div className="parts_part">
              <div className="part_border">
                <div className="part_sub">Capital</div>
                <div className="part_info">{country.capital[0]}</div>
              </div>
            </div>
            <div className="parts_part">
              <div className="part_border">
                <div className="part_sub">Subregion</div>
                <div className="part_info">{country.subregion}</div>
              </div>
            </div>
            <div className="parts_part">
              <div className="part_border">
                <div className="part_sub">Language</div>
                <div className="part_info">
                  {Object.values(country.languages).join(", ")}
                </div>
              </div>
            </div>
            <div className="parts_part">
              <div className="part_border">
                <div className="part_sub">Currencies</div>
                <div className="part_info">
                  {Object.values(country.currencies)[0].name}
                </div>
              </div>
            </div>
            <div className="parts_part">
              <div className="part_border">
                <div className="part_sub">Continents</div>
                <div className="part_info">{country.continents[0]}</div>
              </div>
            </div>
            <div className="parts_part" style={{borderBottom: "1px solid #282B30"}}>
              <div className="part_border">
                <div className="part_sub">Neighbouring Countries</div>
                <div className="part_info">
                  {flags && flags.map((flag => {
                    <CountryNeighbors flag={flag.flags} name={flag.name.common}/>
                  }))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
