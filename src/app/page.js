"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Population");
  const [drop, setDrop] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown element

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDrop(false); // Hide the dropdown if click is outside
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setDrop(false); // Hide the dropdown after selection
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
            <p>Found 234 countries</p>
          </div>
          <div className="header_search">
            <img src="./Search.svg" alt="Search" />
            <input
              className="searchBox"
              placeholder="Search by Name, Region, Subregion"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Handle input change
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
                <div className="box_options" style={{ display: drop ? "flex" : "none" }}>
                  <button onClick={() => handleSortChange("Population")}>Population</button>
                  <button onClick={() => handleSortChange("Area")}>Area</button>
                  <button onClick={() => handleSortChange("Alphabetical Order")}>Alphabetical Order</button>
                </div>
              </div>
            </div>
          </div>
          <div className="main"></div>
        </div>
      </div>
    </>
  );
}
