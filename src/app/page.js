'use client'
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

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
            <img src="./Search.svg"/>
            <input 
              className="searchBox"
              placeholder="Search by Name, Region, Subregion"
            />
          </div>
        </div>
      </div>
    </>
  );
}
