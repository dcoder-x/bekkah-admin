import React from 'react';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Garden' },
  { id: 4, name: 'Health & Beauty' },
  { id: 5, name: 'Toys & Games' },
];

const CategorySelect = () => {
  return (
    <div className="mt-4">
      <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
        Categories
      </label>
      <select
        id="categories"
        name="categories"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        multiple
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
