import { useState } from "react";

export function TagInput({onTagSelect,required,product}) {
  // console.log(product?.tags)
  const [tags, setTags] = useState(product?.tags?product?.tags[0].split(','):[]);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && tagInput) {
      setTags([...tags, tagInput]);
      onTagSelect(tags)
      setTagInput("");
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const filteredTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(filteredTags);
    onTagSelect(filteredTags)
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Tags</label>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-2 py-1 text-sm font-medium text-gray-800 bg-gray-200 rounded-full flex items-center gap-2"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleTagDelete(tag)}
              className="text-gray-600 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            >
              <span className="sr-only">Remove tag</span>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
        <input
          type="text"
          value={tagInput}
          required={required}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-grow rounded-md pl-2 py-1 text-sm"
          placeholder="Type a tag and press Enter"
        />
      </div>
    </div>
  );
}
