import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
// import { countries } from "countries-list";
import { countryCode } from "../data/CountryCodes";
// import * as country from 'countrycitystatejson'
import { countries, states, cities } from "../data/address";
import { toast } from "react-hot-toast";
import axios from "axios";
import ReactModal from "react-modal";
import { Icon } from "@iconify/react";
import { SellerContext } from "../App";

const AddShippingAddress = () => {
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [countrySelect, setCountryselect] = useState();
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [stateSelect, setStateSelect] = useState();
  const [addresses, setAddresses] = useState();
 const {setLoader} = useContext(SellerContext)

  const [addressModal, setAddressModal] = useState(false);

  //State and town filter logic

  //set empty array for filtered data

  var filteredStatesArr = [];
  var filteredCitiesArr = [];

  function getStates(id) {
    const filterState = states.filter((state) => {
      return state.country_id === id;
    });
    console.log(id, filterState, "something");
    setFilteredStates(filterState);
  }

  function getCities(id) {
    const filter = cities.filter((city) => {
      return city.state_id === id;
    });
    setFilteredCities(filter);
  }

  useEffect(() => {
    if (countrySelect) {
      console.log(countrySelect);
      getStates(countrySelect[0].id);
    }
    if (stateSelect) {
      console.log(stateSelect);
      getCities(stateSelect[0].id);
    }
  }, [countrySelect, stateSelect]);
  // useEffect(()=>{
  //     //calling filter method on data arrays

  // cities.map((city) => {
  //   if (stateSelect) {
  //     if (stateSelect.length>0) {
  //       if (city.state_id == stateSelect[0].id) {
  //         filteredCitiesArr.push(city);
  //         console.log(filteredCitiesArr)

  //       }
  //     }

  //   } else {
  //     filteredCitiesArr.push(city);
  //   }
  // });
  // states.map((state) => {
  //   if (countrySelect) {
  //     if (state.country_id == countrySelect[0].id) {
  //       filteredStatesArr.push(state);

  //     }

  //   } else {
  //     filteredStatesArr.push(state);
  //   }
  // });
  // console.log(filteredStatesArr)
  // setFilteredStates(filteredStates)
  // console.log(filteredStatesArr)
  // },[countrySelect,stateSelect])

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption.value);
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption.value);
  };

  const handleCityChange = (selectedOption) => {
    setCity(selectedOption.value);
  };

  const handleSubmit = (event) => {
    // handle form submission
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    countrySelect && formData.append("countryCode", countrySelect[0].sortname);
    console.log(formData, event.currentTarget);
    const formObject = {};
    for (const [key, value] of formData.entries()) {
      formObject[key] = value;
    }

    console.log(formObject);

    // send login request using axios
    axios
      .post("http://localhost:4000/api/seller/address?action=add", formObject, {
        headers: { "x-auth-token": localStorage.getItem("sellerAuthToken") },
      })
      .then((response) => {
        // handle successful request
        setIsLoading(false);
        getAddresses();
        toast.success(response?.data?.message || "address added ");
      })
      .catch((error) => {
        setIsLoading(false);
        // handle error
        console.log(error);
        toast(
          error?.response?.data?.message ||
            "something went wrong, please try again"
        );
      });
  };


  const getAddresses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/seller/address",
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {setLoader(false);
        setAddresses(response?.data?.address);
        console.log(response.data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "something went Wrong, please try again"
      );
      console.log(error);
    }
  };

  const setPrimaryAddresses = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/seller/address/primary?address=${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {setLoader(false);
        toast.success(response?.data?.message || "Done");
        getAddresses();
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "something went Wrong, please try again"
      );
      console.log(error);
    }
  };

  
  const deleteAddress = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/seller/address?action=delete&address=${id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("sellerAuthToken"),
          },
        }
      );
      if (response) {setLoader(false);
        toast.success(response?.data?.message || "Done");
        getAddresses();
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "something went Wrong, please try again"
      );
      console.log(error);
    }
  };
  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <>
      <div className="flex w-full px-2 lg:px-4 items-start flex-wrap">
        {addresses && addresses?.length > 0 ? (
          addresses.map((address, index) => {
            return (
              <div className="p-2  border mr-4  max-w-[250px]  border-[green] border-solid rounded-sm shadow-sm ">
                <p>{address?.address1}</p>
                {address.isPrimary ? (
                  <span className="flex items-center " key={index}>
                    <Icon
                      icon={"teenyicons:tick-circle-solid"}
                      width={20}
                      className=" text-green-500"
                    />
                    <p className="text-sm">
                    Primary address
                    </p>
                    
                    <button onClick={e=>deleteAddress(address._id)} className="text-white p-1 mx-2  bg-red-500 rounded-sm border-0">
                      Delete
                    </button>
                  </span>
                ) : (
                  <div className="flex items-start">
                    <button onClick={e=>setPrimaryAddresses(address._id)} className="text-white p-1  bg-yellow-500 rounded-sm border-0">
                      Set as Primary
                    </button>
                    <button onClick={e=>deleteAddress(address._id)} className="text-white p-1 mx-2  bg-red-500 rounded-sm border-0">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className="flex flex-col mr-4 h-[200px] w-[200px] p-4 items-center justify-center bg-yellow-300 text-white rounded-lg"
            onClick={() => {
              setAddressModal(true);
            }}
          >
            <span className="text-gray-500">
              You have not added any address yet
            </span>
            <span className="text-gray-500">Add address to start shipping</span>
          </div>
        )}
        <button
          type="button"
          className="flex flex-col items-center min-w-[100px] min-h-[100px] justify-center bg-gray-200 border-dashed border-2 border-gray-400 rounded-lg p-4 hover:bg-gray-300"
          onClick={() => {
            setAddressModal(true);
          }}
        >
          <Icon
            icon={"ic:round-add-home"}
            width={35}
            className="h-10 w-10 text-gray-500"
          />

          <span className="text-gray-500">Add Location</span>
        </button>
      </div>
      <ReactModal isOpen={addressModal}>
        <form onSubmit={handleSubmit} className="px-2 lg:px-4">
          <h1 className="font-bold my-4 text-2xl">Add address</h1>
          <div className="flex flex-col mb-4">
            <label htmlFor="lastName" className="mb-1 font-semibold">
              Firstname
            </label>
            <input
              type="text"
              id="lastName"
              name="firstName"
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="lastName" className="mb-1 font-semibold">
              Lastname
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="addressLine1" className="mb-1 font-semibold">
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              name="address1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="addressLine2" className="mb-1 font-semibold">
              Address Line 2
            </label>
            <input
              type="text"
              id="addressLine2"
              name="address2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="country flex flex-col mb-4">
            <label htmlFor="country">
              Country
              <p style={{ color: "red" }}> *</p>
            </label>
            <select
              name="country"
              id="country"
              required
              className="py-2 px-3 border rounded-md"
              onChange={(e) => {
                // country.filter(country=>{country.name==e.target.value})
                setCountryselect(
                  countries.filter((country) => {
                    return country.name === e.target.value;
                  })
                );
                // validate("country", {
                //   patternError:
                //     "your input does not match field requirements",
                // });
              }}
            >
              <optgroup>
                {countries.map((country) => {
                  return (
                    <option
                      onClick={(e) => getStates(country.id)}
                      value={country.name}
                    >
                      {country.name}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
          <div className="state  flex flex-col mb-4">
            <label htmlFor="state">
              Region/State
              <p style={{ color: "red" }}> *</p>
            </label>
            <select
              name="state"
              id="state"
              required
              className="py-2 px-3 border rounded-md"
              onChange={(e) => {
                setStateSelect(
                  states.filter((state) => {
                    return state.name == e.target.value;
                  })
                );
                // validate("state", { patternError: "invalid character" });
              }}
            >
              <optgroup>
                <option value="">Select country to see available cities</option>

                {filteredStates.map((state) => {
                  return (
                    <option
                      onClick={(e) => getCities(state.id)}
                      value={state.name}
                    >
                      {state.name}
                    </option>
                  );
                })}
              </optgroup>
            </select>
          </div>
          <div className="city  flex flex-col mb-4">
            <label htmlFor="city">
              Town/City
              <p style={{ color: "red" }}> *</p>
            </label>
            <select
              name="city"
              className="py-2 px-3 border rounded-md"
              id="city"
              required
            >
              <optgroup>
                <option value="">Select state to see available cities</option>
                {filteredCities.map((city) => {
                  return <option value={city.name}>{city.name}</option>;
                })}
              </optgroup>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="zipCode" className="mb-1 font-semibold">
              Zip/Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="postalCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="phoneNumber" className="mb-1 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="py-2 px-3 border rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4  ${
              loading ? "bg-gray" : "bg-[#03750D]"
            } text-white font-semibold rounded-md hover:bg-green-600 transition duration-300`}
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setAddressModal(false)}
            className={`py-2 px-4 mx-2
          bg-red-500
         text-white font-semibold rounded-md hover:bg-red-600 transition duration-300`}
          >
            Cancel
          </button>
        </form>
      </ReactModal>
    </>
  );
};

export default AddShippingAddress;
