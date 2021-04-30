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
const [processsing, setProcessing] = useState(false)

useEffect(() => {
  ;(async () => {
    const res = await getSalesForceFlow()
    setOptions(res)
  })()
}, [])

useEffect(() => {
  ;(async () => {
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

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSwitch = (e) => {
  setFormData({ ...formData, active: e })
}

const disableButton = () => {
  setProcessing(true)
}

const { name, desc, flowUrl, query, active } = formData

    return (
      !name ? (
        <div>Status Code 404</div>
      ) : (



        <div className="m-8">
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              {/* <div className="border-t border-gray-200" /> */}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">

                      </div>
                      <div className="col-span-6 sm:col-span-3 mt-5">
                        <Switch.Group as="div" className="flex items-center">
                          <Switch
                            checked={active}
                            onChange={handleSwitch}
                            className={classNames(
                              active ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                active ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                          <Switch.Label as="span" className="ml-3">
                            <span className="text-sm font-medium text-gray-900">
                              {active ? "Automation active" : "Automation paused"}
                            </span>
                          </Switch.Label>
                        </Switch.Group>
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              {/* <div className="border-t border-gray-200" /> */}
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
    )
}
