import React, { useState, useEffect } from "react"
import {
  createWorkflow,
  getSalesForceFlow,
  getWorkflow,
  getWorkflowLogs,
  setQuery,
  updateWorkflow,
} from "../../api/network"
import { Switch } from "@headlessui/react"
import { useHistory, useParams } from "react-router-dom"
import ExecutionTable from "../ExecutionTable/ExecutionTable"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
const people = [
{
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
},
// More people...
]

export default function WorkflowDetail() {
const history = useHistory()
const { id } = useParams()

const [options, setOptions] = useState([])
const [formData, setFormData] = useState({
  name: "",
  desc: "",
  flowUrl: "",
  query: "",
  active: true,
})

useEffect(() => {
  ;(async () => {
    const res = await getSalesForceFlow()
    setOptions(res)
  })()
}, [])

useEffect(() => {
  ;(async () => {
    try {
      if (id) {
        const res = await getWorkflow(id)    
        setFormData({
          name: res.name,
          desc: res.desc,
          flowUrl: res.flow_url,
          query: res.sql_query,
          active: res.active,
        })
      }  
    } catch (error) {
      history.push('/404')
    }
  })()
}, [])

// Makes a call to db to return query results
const submit = async (e) => {
  e.preventDefault()
  if (id) {
    await updateWorkflow(id, formData)
  } else {
    await createWorkflow(formData)
  }
  history.push("/")
}

const { name, desc, flowUrl, query, active } = formData

    return (
        <div className="ml-8">Error Status Code: 404</div>
    )
}
