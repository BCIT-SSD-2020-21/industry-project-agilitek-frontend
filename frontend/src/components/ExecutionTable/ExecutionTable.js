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

export default function ExecutionTable() {
const history = useHistory()
const { id } = useParams()

const people = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    // More people...
    ]

const [logArray, setLogArray] = useState([])    
const [logFormData, setLogFormData] = useState({
    workflow_id: "", 
    action_name: "",
    time_of_completion: "",
    record_id: "",
    })

useEffect(() => {
    ;(async () => {
        if (id) {
        const res = await getWorkflowLogs(id)
        console.log(res)
        setLogArray(res)
        setLogFormData({
            workflow_id: res.workflow_id, 
            action_name: res.action_name ,
            time_of_completion: res.time_of_completion,
            record_id: res.record_id,
            })
        }   
    })()
    }, [])

    // useEffect(() => {
    //     setLogArray( logArray => [...logArray, logFormData])
    // }, [logFormData])

    useEffect(() => {
        // console.log(logArray)
    }, [logFormData])

    return (
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        WorkFlow Id
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        WorkFlow Name
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Time Executed
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Record Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {logArray.map((logs) => (
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{logs.workflow_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{logs.action_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{logs.time_of_completion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{logs.record_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                        </a> */}
                        </td>
                     </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
  )
}

