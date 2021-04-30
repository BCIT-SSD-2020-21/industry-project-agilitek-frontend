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
        <div className="m-8">
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-2">
            </div>
          </div>
    
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-full">
                <form onSubmit={submit}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6 ">
                        <div className="col-span-6 sm:col-span-4 mt-5">
                          <label
                            htmlFor="email_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name of the Workflow
                          </label>
                          <input
                            disabled
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name.."
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={name}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6 ">
                        <div className="col-span-6 sm:col-span-4 mt-5">
                          <label
                            htmlFor="email_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            SQL Query
                          </label>
                          <input
                            disabled
                            type="text"
                            name="query"
                            id="query"
                            placeholder="SQL Query"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={query}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6 ">
                        <div className="col-span-6 sm:col-span-4 mt-5">
                          <label
                            htmlFor="email_address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Automation Status
                          </label>
                          <input
                            disabled
                            type="text"
                            name="query"
                            id="query"
                            placeholder="SQL Query"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={active}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">

                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
            </div>
          </div>
          

        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-full">
                <ExecutionTable/>
                </div>
            </div>
        </div>

        </div>
    )
}
