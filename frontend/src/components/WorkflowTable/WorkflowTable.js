import React, { useEffect, useState } from "react";
import WorkflowItem from "../WorkflowItem/WorkflowItem";
import { useHistory, Link } from "react-router-dom";
import { getAllWorkflows } from "../../api/network";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const statusStyles = {
  true: "bg-green-100 text-green-800",
  false: "bg-red-100 text-red-800",
  failed: "bg-gray-100 text-gray-800",
};

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const WorkflowTable = (search) => {
  const history = useHistory();
  const classes = useStyles();

  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [resData, setResData] = useState([]);

  const fetchWorkflows = async () => {
    (async () => {
      const res = await getAllWorkflows();
      setResData(res);
      const data = res.slice(offset, offset + limit);
      setWorkflows(data);
      setTimeout(() => setLoading(false), 1000);
    })();
  };

  const handlePrevClicked = async () => {
    setOffset(Math.max(0, offset - 5));
  };

  const handleNextClicked = async () => {
    if (resData.length > offset + limit) {
      setOffset(offset + 5);
    }
  };

  // fetch User Data
  useEffect(() => {
    fetchWorkflows();
  }, []);

  useEffect(() => {
    fetchWorkflows();
  }, [offset]);

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
              {workflows
                .filter((e) => {
                  if (search.value.search == "") {
                    return e;
                  } else if (e.name.includes(search.value.search)) {
                    console.log(search.value.search);
                    console.log(e);
                    return e;
                  }
                })
                .map((e) => {
                  <li key={e.id}>
                    <WorkflowItem workflow={e} />
                  </li>;
                })}
            </ul>

            <nav
              className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
              aria-label="Pagination"
            >
              <div className="flex-1 flex justify-between">
                <a
                  onClick={handlePrevClicked}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                >
                  Previous
                </a>
                <a
                  onClick={handleNextClicked}
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
                      {workflows
                        .filter((workflow) => {
                          if (search.value.search == "") {
                            return workflow;
                          } else if (
                            workflow.name.includes(search.value.search)
                          ) {
                            console.log(search.value.search);
                            console.log(workflow);
                            return workflow;
                          }
                        })
                        .map((workflow) => (
                          <tr key={workflow.id} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                {/* <a
                              href={workflows.href}
                              className="group inline-flex space-x-2 truncate text-sm"
                            > */}
                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  <Link
                                    className="text-blue-500 truncate hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    to={`/details/${workflow.id}`}
                                  >
                                    {workflow.name}
                                  </Link>
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span
                                className={classNames(
                                  statusStyles[workflow.active],
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                )}
                              >
                                {workflow.active ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                onClick={() =>
                                  history.push(`/configure/${workflow.id}`)
                                }
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
                        Showing{" "}
                        <span className="font-medium">{offset + 1}</span> to{" "}
                        <span className="font-medium">{offset + limit}</span> of{" "}
                        <span className="font-medium">{resData.length}</span>{" "}
                        results
                      </p>
                    </div>
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <a
                        onClick={handlePrevClicked}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Previous
                      </a>
                      <a
                        onClick={handleNextClicked}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
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
  );
};

export default WorkflowTable;
