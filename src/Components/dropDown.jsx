import React from "react";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = "",
}) => {
  return (
    <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
      
      {/* Label */}
      <label
        htmlFor={title}
        className="text-gray-700 font-semibold tracking-wide"
      >
        {title}
      </label>

      {/* Dropdown */}
      <select
        id={title}
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="ml-4 w-32 px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {currencies &&
          currencies.map((curr) => (
            <option value={curr} key={curr}>
              {curr}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
