import { useEffect, useState } from "react";

export default function SearchFilter({ onSearch, onFilter,filterOptions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // onSearch(event.target.value);
  };
  useEffect(()=>{
    filterOption&&
    onFilter(filterOption)
  },[filterOption])

  useEffect(()=>{
    searchQuery&&
    onSearch(searchQuery)
  },[searchQuery])

//   const handleFilter = (event) => {
//     setFilterOption(event.target.value);
//     onFilter(event.target.value);
//   };

  return (
    <div className="flex justify-between px-4 items-center border-b mb-4 pb-2">
      <div className="flex-grow mr-4">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm  border-s-blue-200 border-0 border-solid focus:border-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 14a5 5 0 100-10 5 5 0 000 10zM17.707 16.293a1 1 0 01-1.414 1.414l-4.24-4.24a7 7 0 111.414-1.414l4.24 4.24z"
              />
            </svg>
          </div>
          <input
            id="search"
            type="search"
            className="form-input block w-full p-2 pl-10 sm:text-sm sm:leading-5"
            placeholder="Search products"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div>
        <label htmlFor="filter" className="sr-only">
          Filter
        </label>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
              id="filter"
              aria-haspopup="true"
              aria-expanded="true"
              onClick={() =>
                setFilterOption((option) => (option ? "" : "featured"))
              }
            >
              {filterOption || "Filter"}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              filterOption
                ? "absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
                : "hidden"
            }`}
          >
            <ul
              tabIndex="-1"
              role="menu"
              aria-labelledby="filter"
              aria-activedescendant={
                filterOption === "featured" ? "featured" : null
              }
              className="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
            >
              <li
                onClick={() => {
                  setFilterOption("");
                  onFilter("");
                }}
                className={`${
                  filterOption === ""
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } cursor-default select-none relative py-2 pl-3 pr-9`}
              >
                <span className="block truncate">All products</span>
                {filterOption === "" ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.707 6.293a1 1 0 00-1.414 0L9 14.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
              {
                filterOptions?.length > 0 && filterOptions.map((option)=>{
                    return(
                                      <li
                onClick={() => {
                  setFilterOption(option);
                //   onFilter("featured");
                }}
                className={`${
                  filterOption === option
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                } cursor-default select-none relative py-2 pl-3 pr-9`}
              >
                <span className="block truncate">{option}</span>
                {filterOption === "featured" ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.707 6.293a1 1 0 00-1.414 0L9 14.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
                    )
                })
              }

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
