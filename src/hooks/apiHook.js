import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";

// Dashboard: Get user current workflows
export function getCurrentWorkFlows() {
  axios.get("AWSUSERWORKFLOWS").then((res) => {
    return res.data;
  });
}
// UseEffect/PageLoad add new workflow: Request for input list of specific Workflow
export function addSalesForceFlow() {
  axios.get("AWSWORKFLOWINPUT").then((res) => {
    return res.data;
  });
}
// onAction/Button: Need a request to send the SQL query as well as well as the workflow &&
//    request to store new workflow in data in database
export function setQuery(name, query, workFlow) {
  axios.post("AWSTRIGGERSALESFORCE", query, workFlow).then(() => {});

  axios.post("AWSUSERWORKFLOWS", name, query, workflow).then(() => {});
}
