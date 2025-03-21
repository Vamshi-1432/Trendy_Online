import React, { useEffect, useState } from "react";
import "../../../styles/styleComponents/SearchBar/SearchResultsContainer/searchResultsContainer.css";
import data from "../../../data/products.json";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../redux/searchSlice";
import { useNavigate } from "react-router";
import { setSelectedItem } from "../../../redux/item-menu-slice/itemMenuSlice";

const SearchResultsContainer = () => {
  const [searchItems, setSearchItems] = useState([]);
  const searchedItems = useSelector((state) => state.search.searchItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof searchedItems === "string" && searchedItems.trim().length > 0) {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchedItems.toLowerCase())
      );
      setSearchItems(filteredData);
      dispatch(setSearchResults(filteredData));
    } else {
      setSearchItems([]);
    }
  }, [searchedItems, dispatch]);

  // const handleItemNavigate = (item) => {};

  const handleSelectedItem = (item) => {
    dispatch(setSelectedItem(item));
    const routes = {
      mobiles: "/mobiles",
      tablets: "/tablets",
      laptops: "/laptops",
      cameras: "/cameras",
    };
    if (routes[item.type]) {
      navigate(routes[item.type]);
    }
  };

  return (
    <div className="search-results-container">
      {searchItems.length > 0 ? (
        searchItems.map((item) => (
          <div
            key={item.id}
            className="search-result-item"
            style={{ cursor: item.type !== "books" ? "pointer" : "default" }}
            onClick={() => handleSelectedItem(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="search-result-image"
            />
            <div className="search-result-title">
              <h6>{item.name}</h6>
              <p>
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </p>
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsContainer;
