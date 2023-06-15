import React, { useState } from 'react';

const Checkbox = ({ label, name, checked, onChange,required }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name={name}
        // required={required}
        checked={checked}
        value={checked}
        onChange={e=>onChange(e.target.value)}
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};

const ToggleSwitch = ({ label, name, checked,  onChange,required,product }) => {
  // const [checked, setChecked] = useState(product?.isActive||false)
  console.log(checked)
  return (
    <div className="flex items-center">
      <label htmlFor={name} className="mr-4 block text-sm text-gray-900">
        {label}
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          value={checked}
          // required={required}
          onChange={(e)=>{onChange(e.currentTarget.value)}}
          className={`toggle-checkbox absolute block w-6 h-6 rounded-full transition-all ${checked?'bg-[#03750D] translate-x-4':'bg-white translate-x-0'} border-4 appearance-none cursor-pointer`}
        />
        <label
          htmlFor={name}
          className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}
        ></label>
      </div>
    </div>
  );
};

export { Checkbox, ToggleSwitch };
