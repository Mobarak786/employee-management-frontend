import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem("user");

    User && navigate("/managersdashboard");
  }, []);

  const [empform, setEmpform] = useState({ empid: "", empPassword: "" });
  const [managerform, setManagerform] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);

  const EmployeehandleSubmit = (e) => {
    e.preventdefault();
  };

  const emhandle = (e) => {
    setEmpform({ ...empform, [e.target.name]: e.target.value });
  };

  const managerHandle = (e) => {
    setManagerform({ ...managerform, [e.target.name]: e.target.value });
  };
  const ManagerHandleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3001/api/managers/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(managerform),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        navigate("/managersdashboard");
      } else {
        alert("write valid credentials ");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className="max-w[400px] min-h-[600px] bg-slate-200 shadow-xl
  rounded-md flex items-center justify-center flex-col m-5"
    >
      <button
        className="font-semibold text-xl w-[300px] h-[50px]
      rounded-md bg-red-500 hover:bg-red-600 text-white"
        onClick={() => {
          setShow(!show);
        }}
      >
        Managers Login
      </button>
      <form
        className={show ? "block" : "hidden"}
        onSubmit={ManagerHandleSubmit}
      >
        <div className="flex flex-col mt-2 ">
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-2 rounded-md"
            type="text"
            placeholder="Enter userid"
            name="email"
            value={managerform.email}
            onChange={managerHandle}
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
        text-md p-3 mt-2 rounded-md"
            type="password"
            placeholder="Enter password"
            name="password"
            value={managerform.password}
            onChange={managerHandle}
          />
          <button
            className="mt-10 font-semibold text-xl w-[300px] h-[50px]
      rounded-md bg-green-900 hover:bg-green-600 text-white"
          >
            Login
          </button>
        </div>
      </form>
      <button
        className=" mt-5 font-semibold text-xl w-[300px] h-[50px]
      rounded-md bg-green-500 hover:bg-green-600 text-white"
        onClick={() => {
          setShowEmployee(!showEmployee);
        }}
      >
        Employees Login
      </button>
      <form
        className={showEmployee ? "block" : "hidden"}
        onSubmit={EmployeehandleSubmit}
      >
        <div className="flex flex-col mt-2 ">
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
             text-md p-3 mt-2 rounded-md"
            type="text"
            placeholder="Enter userid"
            name="empid"
            value={empform.empid}
            onChange={emhandle}
          />
          <input
            className="border-gray-500 hover:ring-1 ring-blue-500
        text-md p-3 mt-2 rounded-md"
            type="password"
            placeholder="Enter password"
            name="empPassword"
            value={empform.empPassword}
            onChange={emhandle}
          />
          <button
            className="mt-10 font-semibold text-xl w-[300px] h-[50px]
      rounded-md bg-pink-500 hover:bg-pink-600 text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
