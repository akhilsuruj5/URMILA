import React, { useState, useCallback } from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = ({ onFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const changeHandler = useCallback((filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType.toLowerCase()]: value
      };
      onFilter(newFilters);
      return newFilters;
    });
  }, [onFilter]);

  const resetFilters = useCallback(() => {
    setSelectedFilters({});
    onFilter({});
  }, [onFilter]);

  return (
    <div className='w-full bg-white p-6 rounded-lg shadow-md'>
      <div className="flex justify-between items-center mb-4">
        <h2 className='font-bold text-xl text-gray-800'>Filter Jobs</h2>
        <button
          onClick={resetFilters}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
      <hr className='mb-4' />
      {filterData.map((data, index) => (
        <div key={index} className="mb-6">
          <h3 className='font-semibold text-lg mb-2 text-gray-700'>{data.filterType}</h3>
          <div className="space-y-2">
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className='flex items-center space-x-2'>
                  <input
                    type="radio"
                    id={itemId}
                    name={data.filterType}
                    value={item}
                    checked={selectedFilters[data.filterType.toLowerCase()] === item}
                    onChange={() => changeHandler(data.filterType, item)}
                    className="form-radio h-4 w-4 text-green-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor={itemId} className="text-gray-600 text-sm">{item}</label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;

