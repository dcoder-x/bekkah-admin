import React, { useState } from "react";
import { categories } from "../data/category";


const CategorySelect = ({ OnSelectCategories,OnSelectCategory, product }) => {
  console.log(product?.category);
  const [selectedCategories, setSelectedCategories] = useState(
    product?.category ? product.category[0].split(",") : []
  );
  const [selectedCategory,setSelectedCategory] = useState()

  const handleCategoriesSelect = (category) => {
    if (
      category &&
      !selectedCategories?.includes(category) &&
      !product?.category?.includes(category)
    ) {
      setSelectedCategories([...selectedCategories, category]);

      OnSelectCategories && OnSelectCategories(selectedCategories);
    }
  };

  const handleCategorySelect = (category) => {

      setSelectedCategory(category);

      OnSelectCategory && OnSelectCategory(selectedCategory);

  };

  const handleCategoryRemove = (category) => {
    const newSelectedCategories = selectedCategories.filter(
      (c) => c !== category
    );
    setSelectedCategories(newSelectedCategories);
  };

  return (
    <>

<div className="my-4">
      <label className="block text-gray-700 font-bold mb-2">Category</label>
      <select
        name=""
        className="border-1 border-solid border-gray-500 p-1"
        id=""
        onChange={(e) => {
          handleCategorySelect(e.currentTarget.value);
        }}
      >
        <optgroup>
          {categories.map((category, i) => {
            return (
              <option key={i} value={category.title}>
              {category.title}
            </option>
            );
          })}
        </optgroup>
      </select>
    </div>
        <div className="my-4">
      <label className="block text-gray-700 font-bold mb-2">Subcategories</label>
      <select
        name=""
        id=""
        onChange={(e) => {
          handleCategoriesSelect(e.currentTarget.value);
        }}
      >
        <optgroup>
          {selectedCategory&&categories?.filter((category)=>category.title == selectedCategory).map((category, i) => {
            return (
              <>
                {category.subCategory.map((subCategory, i) => {
                  console.log(category.title)
                  return (
                    <option key={i} value={subCategory.name}>
                     {subCategory.name}
                    </option>
                  );
                })}
              </>
            );
          })}
        </optgroup>
      </select>
      {selectedCategories?.length > 0 && (
        <div className="flex flex-wrap my-2">
          {selectedCategories?.map((category, i) => (
            <div
              key={i}
              className="px-2 py-1 rounded-full bg-blue-500 text-white mr-2 mb-2 flex items-center"
            >
              <span>{category}</span>
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
      {/* {product.category.length > 0 && (
        <div className="flex flex-wrap my-2">
          {product.category.map((category, i) => (
            <div
              key={i}
              className="px-2 py-1 rounded-full bg-blue-500 text-white mr-2 mb-2 flex items-center"
            >
              <span>{category}</span>
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
      )} */}
    </div>
    </>

  );
};

export default CategorySelect;
