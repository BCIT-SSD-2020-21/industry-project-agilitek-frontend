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

export default function UserForm() {
  const history = useHistory()
  const { id } = useParams()

  const [options, setOptions] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    flowUrl: "",
    query: "",
    active: true,
    runAgain: true,
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
          runAgain: res.run_again,
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

  const handleSwitchForRunAgain = (e) => {
    setFormData({ ...formData, runAgain: e })
  }

  const disableButton = () => {
    setProcessing(true)
  }

  const { name, desc, flowUrl, query, active, runAgain } = formData

  return (
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
                  <div className="grid grid-cols-6 gap-6">
                    {/* SELECT SALESFORCE FLOWS */}
                    <div className="col-span-6 sm:col-span-3 mt-5">
                      <label
                        htmlFor="flowUrl"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Choose Workflow
                      </label>
                      <select
                        id="flowUrl"
                        name="flowUrl"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={flowUrl}
                        onChange={handleChange}
                      >
                        <option>Choose Workflow...</option>
                        {options.map((option, idx) => {
                          return (
                            <option value={option.url} key={idx}>
                              {option.label}
                            </option>
                          )
                        })}
                      </select>
                    </div>
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
                  <div className="col-span-6 sm:col-span-3 mt-5">
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={runAgain}
                        onChange={handleSwitchForRunAgain}
                        className={classNames(
                          runAgain ? "bg-indigo-600" : "bg-gray-200",
                          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span className="sr-only">Use setting</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            runAgain ? "translate-x-5" : "translate-x-0",
                            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                      <Switch.Label as="span" className="ml-3">
                        <span className="text-sm font-medium text-gray-900">
                          {runAgain
                            ? "Runs for same contacts repeatedly"
                            : "Only runs once for each contact"}
                        </span>
                      </Switch.Label>
                    </Switch.Group>
                  </div>
                </div>

                {/* Dont touch anything below this point */}
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                    type="submit"
                    onClick={disableButton}
                    style={{ backgroundColor: processsing && "grey" }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                  Delete Configuration
                  </button>
                  <button
                    type="submit"
                    onClick={() => history.push("/")}
                    className="mx-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={disableButton}
                    style={{ backgroundColor: processsing && "grey" }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    {processsing ? "Saving..." : "Save Configuration"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
