import React, { useState } from "react";

const categories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Clothing" },
  { id: 3, name: "Home & Garden" },
  { id: 4, name: "Health & Beauty" },
  { id: 5, name: "Toys & Games" },
];

const CategorySelect = ({ OnSelectCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (category) => {
    if (category && !selectedCategories.includes(category)) {
        console.log('added')
      setSelectedCategories([...selectedCategories, category]);

      OnSelectCategories&& OnSelectCategories(selectedCategories);
    }
  };

  const handleCategoryRemove = (category) => {
    const newSelectedCategories = selectedCategories.filter(
      (c) => c.id !== category.id
    );
    setSelectedCategories(newSelectedCategories);
  };

  return (
    <div className="my-4">
      <label className="block text-gray-700 font-bold mb-2">Categories</label>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <div
            key={category.id}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 mr-2 mb-2 flex items-center"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              value={category.name}
              onChange={() => handleCategorySelect(category)}
            />
            <span className="ml-2">{category.name}</span>
          </div>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap my-2">
          {selectedCategories.map((category) => (
            <div
              key={category.id}
              className="px-2 py-1 rounded-full bg-blue-500 text-white mr-2 mb-2 flex items-center"
            >
              <span>{category.name}</span>
              <button 
                type="button"
                className="ml-2"
                onClick={() => handleCategoryRemove(category)}
              >
                <svg
                  className="h-4 w-4 text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.414 10l4.293-4.293a1 1 0 1 0-1.414-1.414L10 8.586 5.707 4.293a1 1 0 0 0-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 0 0 1.414 1.414L10 11.414l4.293 4.293a1 1 0 0 0 1.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
