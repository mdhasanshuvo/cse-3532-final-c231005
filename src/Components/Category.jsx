import React, { useEffect, useState } from "react";
import camera from "../assets/icon.png";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [details, setDetails] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); 

  // Fetch categories and details when page loads
  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        if (data.data.length > 0) {
          setActiveCategory(data.data[0].category_id);
          handleCategory(data.data[0].category_id);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch category-specific data
  const handleCategory = (id) => {
    setActiveCategory(id);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
      });
  };

  return (
    <div>
      {/* Buttons for categories */}
      <div className="flex gap-4 justify-center my-6">
        {categories.map((category) => (
          <button
            onClick={() => handleCategory(category.category_id)}
            key={category.category_id}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeCategory === category.category_id
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Display cards for category details*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {details.length === 0 && (
          <div className="flex flex-col items-center justify-center col-span-full mt-16">
            <img src={camera} alt="No Content" className="w-48 h-48 mb-4" />
            <h2 className="text-4xl font-bold text-gray-700">
              Oops!! Sorry, There is no content here
            </h2>
          </div>
        )}
        {details.map((detail) => (
            <div
              key={detail.title}
              className="card bg-gray-100 shadow-lg p-4 rounded-lg"
            >
              <img
                src={detail.thumbnail}
                alt={detail.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{detail.title}</h3>
              <div className="flex items-center mt-2">
                <img
                  src={detail.authors[0].profile_picture}
                  alt={detail.authors[0].profile_name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <p className="text-sm font-medium">
                  {detail.authors[0].profile_name}{" "}
                  {detail.authors[0].verified && (
                    <span className="text-blue-500 ml-1">✔</span>
                  )}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {detail.others.views} views
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
