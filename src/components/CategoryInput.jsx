import { useState } from 'react';

export function CategoryInput({OnSelectCategories}) {
  const [categories, setCategories] = useState([]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="text"]');
    const newCategory = input.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      OnSelectCategories(categories)
      input.value = '';
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  return (
    <div className="py-2">
      <label htmlFor="category-input" className="block text-sm font-medium text-gray-700">
        Product Categories
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <form onSubmit={handleAddCategory} className="flex-1">
          <input
            type="text"
            name="category"
            id="category-input"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
            placeholder="Add a category"
          />
        </form>
        <button
          type="button"
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
      {categories.length > 0 && (
        <div className="mt-2 flex flex-wrap">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center"
            >
              {category}
              <button
                type="button"
                onClick={() => handleRemoveCategory(category)}
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Remove category</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 10l3.646-3.646a.5.5 0 00-.708-.708L9.586 9.293 5.939 5.646a.5.5 0 00-.708.708L8.293 10l-3.062 3.062a.5.5 0 10.708.708L9 10.707l3.646 3.647a.5.5 0 00.708-.708L10.707 10z"
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
}
