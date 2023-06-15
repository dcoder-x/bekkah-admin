import React, { useEffect, useState } from "react";
import { categories } from "../data/category";


const CategorySelect = ({ OnSelectCategories,OnSelectCategory,subCategories,category, product }) => {
  console.log(product);
  const [selectedCategories, setSelectedCategories] = useState(
    product?.subcategories ? product?.subcategories : []
  );
  const [selectedCategory,setSelectedCategory] = useState(product?.category)


  const handleCategoriesSelect = (category) => {
    if (
      category &&
      !selectedCategories?.includes(category)&&
      !product?.subcategories?.includes(category)
    ) {
      setSelectedCategories([...selectedCategories, category]);

      // console.log(selectedCategories)

      OnSelectCategories && OnSelectCategories(selectedCategories);
    }
  };

  const handleCategorySelect = (category) => {

      setSelectedCategory(category);

      OnSelectCategory && OnSelectCategory(category);

  };

  const handleCategoryRemove = (category) => {
    const newSelectedCategories = selectedCategories.filter(
      (c) => c !== category
    );
    console.log(category===selectedCategories[0],newSelectedCategories)
    setSelectedCategories(newSelectedCategories);
    OnSelectCategories && OnSelectCategories(newSelectedCategories);
  };

  // useEffect(()=>{
  //   OnSelectCategory && OnSelectCategory(selectedCategory);
  //   OnSelectCategories && OnSelectCategories(selectedCategories);
    
  // },[selectedCategories,selectedCategory])
  return (
    <>

<div className="my-4">
      <label className="block text-gray-700 font-bold mb-2">Category</label>
      <select
        name=""
        className="border-1 border-solid border-gray-500 p-1"
        id=""
        required
        value={selectedCategory}
        onChange={(e) => {
          handleCategorySelect(e.currentTarget.value);
        }}
      >
        <optgroup>
          {categories.map((category, i) => {
            return (
              <option key={i} value={category.heading}>
              {category.heading}
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
        required
        onChange={(e) => {
          handleCategoriesSelect(e.currentTarget.value);
        }}
      >
        <optgroup>
          {selectedCategory&&categories?.filter((category)=>category.heading === selectedCategory).map((category, i) => {
            return (
              <>
                {category.sublist.map((subCategory, i) => {
                  return (
                    <option key={i} value={subCategory}>
                     {subCategory}
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
              className="px-2 py-1 rounded-full bg-[#03750D] text-white mr-2 mb-2 flex items-center"
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
      
    </div>
    </>

  );
};

export default CategorySelect;
