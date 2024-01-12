import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((data) => setEmployees(data));
  }, []);

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          {employee.name} ({employee.description})
          {employee.children && <EmployeeList employees={employee.children} />}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;