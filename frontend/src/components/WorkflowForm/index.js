import React, { useState, useEffect } from "react"
import { createWorkflow, getSalesForceFlow, setQuery } from "../../api/network"
import { Switch } from "@headlessui/react"

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
  const [options, setOptions] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    flowUrl: "",
    query: "",
    active: true,
  })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await getSalesForceFlow()
      setOptions(res)
    })()
  }, [])

  // Makes a call to db to return query results
  const submit = async () => {
    const res = await createWorkflow()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSwitch = (e) => {
    setEnabled(e.target.checked)
    if (!e.target.checked) {
      setFormData({ ...formData, active: "" })
    }
  }

  const { name, desc, flowUrl, query, active } = formData

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
            {/* <form action="#" method="POST"> */}
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
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Choose Workflow
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={flowUrl}
                    >
                      {options.map((option, idx) => {
                        return <option key={idx}>{option.label}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3 mt-5">
                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-gray-900">
                        Pause Automation{" "}
                      </span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
              </div>

              {/* Dont touch anything below this point */}
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Configuration
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  )
}
