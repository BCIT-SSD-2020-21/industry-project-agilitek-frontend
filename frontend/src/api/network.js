import axios from "axios"
import React, { useState, useEffect, useContext, createContext } from "react"

const url = "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod"

// Dashboard: Get all user workflows
export async function getAllWorkflows() {
  try {
    const res = await axios.get(`${url}/myworkflows`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// Create a Workflow
export async function createWorkflow(data) {
  try {
    const res = await axios.post(`${url}/myworkflows`, data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}
// Dashboard: Get user workflow by id
export async function getWorkflow(id) {
  try {
    const res = await axios.get(`${url}/myworkflows/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// Update Workflow
export async function updateWorkflow(id, data) {
  try {
    const res = await axios.put(`${url}/myworkflows/${id}`, data)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// Delete a Workflow
export async function deleteWorkflow(id) {
  try {
    const res = await axios.delete(`${url}/myworkflows/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// UseEffect/PageLoad add new workflow: Request for input list of specific Workflow
export async function getSalesForceFlow() {
  try {
    const res = await axios.get(`${url}/salesforceflows`)
    return res.data.actions
  } catch (err) {
    console.log(err)
  }
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
      return res.data
    })

  axios
    .post(
      "https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod/myworkflows"
      // name,
      // query,
      // workflow
    )
    .then((res) => {
      return res.data
    })
}

//Get workflow logs
export async function getWorkflowLogs(id) {
  try {
    const res = await axios.get(`${url}/myworkflows/logs/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}


