"use client";
import { useState, useEffect, useRef } from "react";
import { RegionSelect } from "./components/RegionSelect";
import { Status } from "./components/Status";
import { CountriesList } from "./components/CountriesList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Population");
  const [drop, setDrop] = useState(false);
  const [regions, setRegions] = useState([]);
  const [unMember, setUnMember] = useState(false);
  const [independent, setIndependent] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let fetchedCountries = [];

        if (regions.length >= 1) {
          for (let region of regions) {
            const response = await fetch(
              `https://restcountries.com/v3.1/region/${region}`
            );
            const data = await response.json();
            fetchedCountries = [...fetchedCountries, ...data];
          }
        } else {
          const response = await fetch(`https://restcountries.com/v3.1/all`);
          const data = await response.json();
          fetchedCountries = [...fetchedCountries, ...data];
        }

        if (independent) {
          fetchedCountries = fetchedCountries.filter(
            (country) => country.independent
          );
        }

        if (unMember) {
          fetchedCountries = fetchedCountries.filter(
            (country) => country.unMember
          );
        }

        if (search) {
          fetchedCountries = fetchedCountries.filter(
            (country) =>
              country.name.common
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              country.region.toLowerCase().includes(search.toLowerCase()) ||
              (country.subregion &&
                country.subregion.toLowerCase().includes(search.toLowerCase()))
          );
        }

        switch (sort) {
          case "Population":
            fetchedCountries.sort((a, b) => b.population - a.population);
            break;
          case "Area":
            fetchedCountries.sort((a, b) => b.area - a.area);
            break;
          case "Alphabetical Order":
            fetchedCountries.sort((a, b) =>
              a.name.common.localeCompare(b.name.common)
            );
            break;
          default:
            break;
        }

        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [regions, independent, unMember, search, sort]);

  const handleRegionChange = (selectedRegions) => {
    setRegions(selectedRegions);
  };

  const handleUnMember = (membership) => {
    setUnMember(membership);
  };

  const handleIndependent = (dependency) => {
    setIndependent(dependency);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setDrop(false);
  };

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
        <div className="page_header">
          <div className="header_found">
            <p>Found {countries.length} countries</p>
          </div>
          <div className="header_search">
            <img src="./Search.svg" alt="Search" />
            <input
              className="searchBox"
              placeholder="Search by Name, Region, Subregion"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="page_main">
          <div className="main_sub">
            <div className="sub_sort">
              <p>Sort by</p>
              <div className="sort_box" ref={dropdownRef}>
                <div className="box_selected" onClick={() => setDrop(!drop)}>
                  <p>{sort}</p>
                  <div className="box_arrow">
                    <img src="Expand_down.svg" alt="Expand" />
                  </div>
                </div>
                <div
                  className="box_options"
                  style={{ display: drop ? "flex" : "none" }}
                >
                  <button onClick={() => handleSortChange("Population")}>
                    Population
                  </button>
                  <button onClick={() => handleSortChange("Area")}>Area</button>
                  <button
                    onClick={() => handleSortChange("Alphabetical Order")}
                  >
                    Alphabetical Order
                  </button>
                </div>
              </div>
            </div>
            <RegionSelect onRegionChange={handleRegionChange} />
            <Status
              onIndependent={handleIndependent}
              onUnMember={handleUnMember}
            />
          </div>
          <div className="main">
            <div className="main_header">
              <p>Flag</p>
              <p>Name</p>
              <p>Population</p>
              <p>
                Area(km<sup>2</sup>)
              </p>
            </div>

            {loading && (
              <div className="loading-block">
                <div>
                  <img src="./Eclipse@1x-1.0s-200px-200px.svg" />
                </div>
              </div>
            )}

            <div className="main_countries">
              {countries.map((country) => (
                <CountriesList
                  key={country.cca3}
                  name={country.name.common}
                  population={country.population}
                  area={country.area}
                  flag={country.flags.svg}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
