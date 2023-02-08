import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useNavigate } from "react-router-dom";
const RenderCards = ({ data, title }) => {
  if (data.length > 0) {
    return data.map((employee) => (
      <EmployeeCard key={employee._id} {...employee} />
    ));
  }
  return (
    <h2 className="mt-5 font-bold text-xl uppercase text-[#6449ff] ">
      {title}
    </h2>
  );
};
const ManagersDashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(false);
  const [searchText, setSearchText] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [hideemp, setHideemp] = useState(true);
  const [hidetask, setHidetask] = useState(true);
  const [empData, setEmpData] = useState({
    Fullname: "",
    Email: "",
    Password: "",
    Address: "",
    DOB: "",
  });

  const [tusk, setTusk] = useState({
    tuskHeading: "",
    deadline: "",
    tuskDetails: "",
    employees_id: "",
  });

  const handleClick = () => {
    localStorage.clear("user");
    navigate("/");
  };
  const handlechange = (e) => {
    setTusk({ ...tusk, [e.target.name]: e.target.value });
    console.log(tusk);
  };
  const emphandle = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };

  const empSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:3001/api/create-employee",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(empData),
        }
      );
      await response.json();
    } catch (error) {
      alert(error);
    }
  };
  const tuskSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3001/api/create-task", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tusk),
      });
      await response.json();
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items.data) {
      setName(items.data);
    }
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/create-employee",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (response.ok) {
          const results = await response.json();
          setAllPosts(results.data.reverse());
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchAllPosts();
  }, [empSubmit]);

  return (
    <div className="w-full h-full bg-white ">
      <div className="bg-gray-100 w-full h-[100px] shadow-sm flex justify-between p-5">
        <h2 className="text-xl flex items-center font-bold">
          Managers DashBoard
        </h2>

        <div className="w-auto flex items-center justify-between md:w-[300px]">
          <button
            className=" bg-red-500 rounded-md w-[80px] h-8
           text-white font-semibold mr-3 hover:ring-2"
            onClick={handleClick}
          >
            Logout
          </button>
          <div className="flex items-center ">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center
           bg-green-500  text-white  mr-1"
            >
              {name[0]}
            </div>
            <h2 className="font-semibold">{name}</h2>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 p-3 h-auto flex gap-2">
        <button
          onClick={() => {
            setHideemp(!hideemp);
          }}
          className="bg-green-500 w-auto h-10 
        rounded-md shadow-sm text-white font-sem
        flex items-center justify-center p-2 ring-1 border-blue-600 hover:rounded-2xl"
        >
          Add Employee
        </button>

        <button
          onClick={() => {
            setHidetask(!hidetask);
          }}
          className="bg-red-600 w-auto h-10 
        rounded-md shadow-sm text-white font-sem
        flex items-center justify-center p-2 ring-1 border-blue-600 hover:rounded-2xl"
        >
          Add Task
        </button>
      </div>
      <form onSubmit={empSubmit}>
        <div
          className={
            hideemp
              ? "hidden"
              : "w-[70%] bg-slate-300 rounded-xl  mx-auto mt-3 p-3 flex flex-col  sm:flex-row sm:w-full sm:gap-2"
          }
        >
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
            text-md p-3 mt-3 rounded-md"
            type="text"
            name="Fullname"
            placeholder="Enter Fullname"
            required
            value={empData.Fullname}
            onChange={emphandle}
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-3  rounded-md"
            type="email"
            name="Email"
            placeholder="Enter Email"
            required
            value={empData.Email}
            onChange={emphandle}
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-3  rounded-md"
            type="password"
            name="Password"
            placeholder="Enter Password"
            required
            value={empData.Password}
            onChange={emphandle}
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-3  rounded-md"
            type="text"
            name="Address"
            placeholder="Enter Address"
            required
            value={empData.Address}
            onChange={emphandle}
          />

          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-3  rounded-md"
            type="date"
            name="DOB"
            required
            value={empData.DOB}
            onChange={emphandle}
          />

          <button
            className="mx-auto m-3 bg-red-500 w-[80px] h-10 
           shadow-sm text-white font-sem
           flex items-center justify-center p-2 rounded-2xl"
          >
            ADD
          </button>
        </div>
      </form>
      <form onSubmit={tuskSubmit}>
        <div
          className={
            hidetask
              ? "hidden"
              : "w-full h-auto bg-slate-300 rounded-xl  mx-auto mt-3 p-3 flex flex-col sm:w-[70%]"
          }
        >
          <input
            className=" text-xl border-gray-500 hover:ring-1 ring-blue-500
          text-md p-3 mt-3  rounded-md"
            type="text"
            name="name1"
            placeholder="Write the heading "
            value={tusk.tuskHeading}
            onChange={handlechange}
            required
          />

          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
          text-md p-3 mt-3  rounded-md"
            type="date"
            name="name2"
            placeholder="Due date"
            value={tusk.deadline}
            onChange={handlechange}
            required
          />

          <textarea
            className="font-serif border-gray-500 hover:ring-1 ring-blue-500
          text-md p-3 mt-3  rounded-md"
            type="text"
            name="name3"
            placeholder="Write your text"
            value={tusk.tuskDetails}
            onChange={handlechange}
            required
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
          text-md p-3 mt-3  rounded-md"
            type="text"
            name="name4"
            placeholder="Employee Id"
            value={tusk.employees_id}
            onChange={handlechange}
            required
          />
          <button
            className="mx-auto m-3 bg-green-500 w-[80px] h-10 
           shadow-sm text-white font-sem
           flex items-center justify-center p-2 rounded-2xl"
          >
            Submit
          </button>
        </div>
      </form>

      {searchText && (
        <h2 className="font-medium text-[#666e75] text-xl mb-3">
          Showing results of:
          <span className="text-[#222328]">{searchText}</span>
        </h2>
      )}
      <div className="overflow-scroll">
        {searchText ? (
          <RenderCards data={searchResults} title="No search result found" />
        ) : (
          <RenderCards data={allPosts} title="No posts found" />
        )}
      </div>
    </div>
  );
};

export default ManagersDashboard;
