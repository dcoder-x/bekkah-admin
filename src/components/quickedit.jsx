<div className="mb-4">
<label className="block text-gray-700 font-bold mb-2">
  Product specifications
</label>
{productSpecifications.map((specification, index) => (
  <div className="flex mb-2" key={index}>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="specification name"
      value={specification.name}
      onChange={(event) =>
        handleSpecificationChange(index, "name", event.target.value)
      }
      required
    />
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
      type="text"
      placeholder="specification value"
      value={specification.value}
      onChange={(event) =>
        handleSpecificationChange(index, "value", event.target.value)
      }
      required
    />
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
      type="number"
      placeholder="specification quantity"
      value={specification.quantity}
      onChange={(event) =>
        handleSpecificationChange(index, "quantity", event.target.value)
      }
      required
    />
    {index === productSpecifications.length - 1 && (
      <button
        type="button"
        className="ml-2"
        onClick={handleSpecificationAdd}
      >
        <PlusCircleIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
      </button>
    )}
    {index !== productSpecifications.length - 1 && (
      <button
        type="button"
        className="ml-2"
        onClick={() => handleSpecificationRemove(index)}
      >
        <svg
          className="h-5 w-5 text-red-500 hover:text-red-700"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.293-9.707a1 1 0 00-1.414-1.414L10 8.586l-1.879-1.88a1 1 0 00-1.414 1.414L8.586 10l-1.88 1.879a1 1 0 001.414 1.414L10 11.414l1.879 1.88a1 1 0 001.414-1.414L11.414 10l1.879-1.879z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    )}
  </div>
))}
</div>

const [productSpecifications, setProductSpecifications] = useState([
    { name: "", value: "", quantity: "" },
  ]);
  //specification handlers
  const handleSpecificationChange = (index, field, value) => {
    const newspecifications = [...productSpecifications];
    newspecifications[index][field] = value;
    console.log(newspecifications);
    setProductsSecifications(newspecifications);
    console.log(productSpecifications);
  };

  const handleSpecificationAdd = () => {
    const newspecifications = [...productSpecifications];
    newspecifications.push({ name: "", value: "", quantity: "" });
    setProductSpecifications(newspecifications);
  };

  const handleSpecificationRemove = (index) => {
    const newspecifications = [...productSpecifications];
    newspecifications.splice(index, 1);
    setProductSpecifications(newspecifications);
  };
 data.append("specifications", JSON.stringify(productSpecifications));