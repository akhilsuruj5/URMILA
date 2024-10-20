// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-6 '>
    <div className="loader ">
      <style>
        {`
          .loader {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
    </div>
    {/* <span className='text-xl'>
    Loading ...
    </span> */}
    </div>
  );
};

export default Loader;
