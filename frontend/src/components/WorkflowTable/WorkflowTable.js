import React, { useEffect, useState } from "react"
import WorkflowItem from "../WorkflowItem/WorkflowItem"
import { useHistory } from "react-router-dom"
import { getAllWorkflows } from "../../api/network"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
}

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const WorkflowTable = () => {
  const history = useHistory()
  const classes = useStyles()

  const [workflows, setWorkflows] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch User Data
  useEffect(() => {
    ;(async () => {
      const res = await getAllWorkflows()
      setWorkflows(res)
      setTimeout(() => setLoading(false), 1000)
    })()
  }, [])

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <h2 className="mb-4">Loading...</h2>
          <CircularProgress />
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Workflows
          </h2>

          {/* Activity list (smallest breakpoint only) */}
          <div className="shadow sm:hidden">
            <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
              {workflows.map((workflow) => (
                <li key={workflow.id}>
                  <WorkflowItem workflow={workflow} />
                </li>
              ))}
            </ul>

            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
              aria-label="Pagination"
            >
              <div className="flex-1 flex justify-between">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Next
                </a>
              </div>
            </nav>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Workflow
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Frequency
                        </th>
                        <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workflows.map((workflow) => (
                        <tr key={workflow.id} className="bg-white">
                          <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              {/* <a
                              href={workflows.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            > */}
                              <p className="text-gray-500 truncate group-hover:text-gray-900">
                                {workflow.name}
                              </p>
                              {/* </a> */}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              {workflow.Frequency}
                            </span>
                            {workflow.currency}
                          </td>
                          <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                            <span
                              className={classNames(
                                statusStyles[workflow.status],
                                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                              )}
                            >
                              {workflow.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <button
                              type="button"
                              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                              onClick={() => history.push("/create")}
                            >
                              Configure
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">10</span> of{" "}
                        <span className="font-medium">20</span> results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WorkflowTable
