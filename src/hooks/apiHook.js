import axios from "axios";
import React, { useState, useEffect, useContext, createContext } from "react";

// Dashboard: Get user current workflows
export function getCurrentWorkFlows(id) {
  axios
    .get(
      "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod/myworkflows"
    )
    .then((res) => {
      return res.data;
    });
}
// UseEffect/PageLoad add new workflow: Request for input list of specific Workflow
export function addSalesForceFlow() {
  axios
    .get(
      "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod/salesforceflows"
    )
    .then((res) => {
      return res.data;
    });
}
// onAction/Button: Need a request to send the SQL query as well as well as the workflow &&
//    request to store new workflow in data in database
export function setQuery(name, query, workFlow) {
  axios
    .post(
      "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod/salesforceflows"
      // query,
      // workFlow
    )
    .then((res) => {
      return res.data;
    });

  axios
    .post(
      "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod/myworkflows"
      // name,
      // query,
      // workflow
    )
    .then((res) => {
      return res.data;
    });
}
