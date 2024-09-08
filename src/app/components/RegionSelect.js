import { useState } from "react";
import "./RegionSelect.css";

export function RegionSelect({ onRegionChange }) {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const handleClickRegion = (region) => {
    let updatedRegions;
    if (selectedRegions.includes(region)) {
      updatedRegions = selectedRegions.filter((item) => item !== region);
    } else {
      updatedRegions = [...selectedRegions, region];
    }
    setSelectedRegions(updatedRegions);
    onRegionChange(updatedRegions); // ارسال مقدار به والد
  }
  return (
    <div className="sub_region">
      <p>Region</p>
      <div className="region_group">
        {regions.map((region) => (
          <div
            key={region}
            className={`region ${
              selectedRegions.includes(region) ? "selected" : ""
            }`}
            onClick={() => handleClickRegion(region)}
          >
            {region}
          </div>
        ))}
      </div>
    </div>
  );
}
