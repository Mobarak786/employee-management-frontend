import React from "react";

const EmployeeCard = ({ _id, fullName, password, email, DOB, address }) => {
  return (
    <div
      id={_id}
      className="mx-auto mt-7 w-[80%] h-auto p-2 flex justify-center shadow-lg"
    >
      <div className="w-full flex flex-col items-center">
        <div className="text-lg font-bold text-gray-700 ">{fullName}</div>
        <div className="mt-3 font-thin text-sm font-serif text-blue-800">
          {email}
        </div>
        <div className="mt-5 flex justify-between gap-6">
          <h2 className="text-sm font-mono">Users Password: {password}</h2>
          <h2 className="text-sm font-mono">D.O.B : {DOB}</h2>
        </div>
        <div className="mt-3 bg-gray-300 text-center p-3 rounded-sm">
          <p>{address}</p>
        </div>
        <div className="flex justify-center gap-5 mt-5 mb-5 ">
          <button
            className=" mx-auto bg-green-500 w-[80px] h-8 
             shadow-sm text-white font-sem
             flex items-center justify-center p-2 rounded-md"
          >
            Task
          </button>
          <button
            className="mx-auto bg-red-500 w-[80px] h-8 
             shadow-sm text-white font-sem
             flex items-center justify-center p-2 rounded-md"
          >
            Delete
          </button>
          <button
            className="mx-auto bg-blue-500 w-[80px] h-8 
             shadow-sm text-white font-sem
             flex items-center justify-center p-2 rounded-md"
          >
            Unlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
