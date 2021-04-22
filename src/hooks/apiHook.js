import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";

//create context
const apiContext = createContext();

export const useContext = () => {
  return useContext(apiContext);
};

export const getProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Dashboard: Get user current workflows
  // UseEffect add new workflow: Request for input list of specific Workflow
  // Button: Need a request to send the SQL query as well as well as the workflow &&
  //    request to store new workflow in data in database

  function getId(id) {
    axios.get("");
  }

  const value = {
    signup,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
