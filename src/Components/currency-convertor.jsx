import React, { use, useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./dropDown";


const CurrencyConvertor = () => {
    const[amount, setAmount] = useState([]);
    const[currency, setCurrency] = useState([]);
    const[fromCurrency, setFromCurrency] = useState("USD");
    const[toCurrency, setToCurrency] = useState("INR");
    const[convertedAmount, setConvertedAmount] = useState(null);
   

    const fetchCurrencies = async() => {
        try{
            const res = await fetch("https://api.frankfurter.dev/v1/currencies");
            const data = await res.json();

            setCurrency(Object.keys(data));
        }
        catch(error){
            console.error("Error fetching currencies:", error);
        }
    }

    useEffect( () => {
        fetchCurrencies();
    }, [])

    console.log(currency)

    const currencyConvertor = async() => {
        if(!amount) return;
        
        try{
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();

            setConvertedAmount(data.rates[toCurrency]);
        }
        catch(error){
            console.error("Error fetching currencies:", error);
        }
    }


    
    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 animate-fadeIn">
    
    <div className="w-full max-w-xl p-8 rounded-2xl backdrop-blur-lg bg-white/70 shadow-2xl border border-white/40 transition-all duration-500 hover:scale-[1.01]">

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide animate-slideDown">
        💱 Currency Converter
      </h1>

      {/* Dropdowns */}
      <div className="space-y-4">
        <CurrencyDropdown
          currencies={currency}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />

        <CurrencyDropdown
          currencies={currency}
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>

      {/* Amount */}
      <div className="mt-6">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Amount
        </label>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          type="number"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 shadow-sm"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={currencyConvertor}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-indigo-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Convert
        </button>
      </div>

      {/* Result */}
      {convertedAmount && (
        <div className="mt-6 text-center animate-fadeInUp">
          <p className="text-lg text-gray-600">
            Converted Amount:
          </p>
          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {convertedAmount} {toCurrency}
          </h2>
        </div>
      )}
    </div>
  </div>
);

}

export default CurrencyConvertor;
