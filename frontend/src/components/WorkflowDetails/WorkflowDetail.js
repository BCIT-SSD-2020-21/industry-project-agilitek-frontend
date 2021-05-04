import React, { useState, useEffect } from "react"
import {
  createWorkflow,
  getSalesForceFlow,
  getWorkflow,
  updateWorkflow,
  getDBTables,
  getMetadata,
} from "../../api/network"
import { Switch } from "@headlessui/react"
import { useHistory, useParams } from "react-router-dom"
import ExecutionTable from "../ExecutionTable/ExecutionTable"
import MappingInput from '../WorkflowForm/MappingInput';
import DetailInput from "./DetailInput"

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


const [dbTables, setDbTables] = useState([])
const [workflows, setWorkflows] = useState([])
const [dbColumns, setDBColumns] = useState([])

const [sfMetadata, setSfMetadata] = useState([])
const [mappings, setMappings] = useState([])
const [tempMapping, setTempMapping] = useState({})

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

  // CDM
  useEffect(() => {
    // try{
    ;(async () => {
      // Get all database tables from the database
      const dbTablesRes = await getDBTables()
      setDbTables(dbTablesRes)

      // Get all Salesforce flows from Salesforce Invoke Flow API
      const sfFlowRes = await getSalesForceFlow()
      setWorkflows(sfFlowRes)

      // If there is an id in the url parameters then retrieve all
      // the data for that workflow
      if (id) {
        const res = await getWorkflow(id)
        // console.log(res)
        // console.log(res.mapping)
        setFormData({
          name: res.name,
          desc: res.desc,
          flowUrl: res.flow_url,
          active: res.active,
          table: res.table,
          type: res.type,
          label: res.label,
          column: res.column,
          sObjectType: res.sobjecttype,
          whereClause: res.where_clause,
          runAgain: res.run_again,
          mapping: res.mapping,
        })

        // Fetch and set Salesforce metadata
        if (res.type === "SOBJECT") {
          const metadataRes = await getMetadata(res.sobjecttype)
          setSfMetadata(metadataRes)
        }
        setTempMapping(res.mapping)
      }
    })()
    // } catch(error){
    //   history.push('/404')
    // }
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

const {
  name,
  desc,
  flowUrl,
  table,
  column,
  active,
  type,
  label,
  sObjectType,
  whereClause,
  runAgain,
  mapping,
} = formData

useEffect(() => {
  console.log(mapping)
  for (const key in mapping) {
    console.log(`${key} : ${mapping[key]}`)
  }


  }, [mapping])

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
                    <>
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="inputs_type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salesforce Flow Inputs Type
                          </label>
                          <input
                            type="text"
                            name="inputs_type"
                            id="inputs_type"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={
                              sObjectType
                                ? `${label} (${type} of Type=${sObjectType})`
                                : `${label} (Type=${type})`
                            }
                            disabled
                          />
                        </div>
                        <div>
                        </div>
                      </div>
                      {/* Salesforce MetaData field */}
                      <DetailInput mapping={mapping}></DetailInput>
                      {/* <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="inputs_type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Salesforce MetaData
                          </label>
                          <input
                            type="text"
                            name="inputs_type"
                            id="inputs_type"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={
                              mapping
                            }
                            disabled
                          />

                        </div>
                        <div>
                        </div>
                      </div> */}
                      {/* Mapping dropdown lists */}
                      {sObjectType ? (
                        <div className="mappings">{formData.mapping[0]}</div>
                      ) : null}
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4 mt-5">
                          <label
                            htmlFor="where_clause"
                            className="block text-sm font-medium text-gray-700"
                          >
                            WHERE Clause
                          </label>
                          <input
                            type="text"
                            name="whereClause"
                            id="where_clause"
                            placeholder="Enter WHERE clause..."
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={whereClause}
                            disabled
                          />
                        </div>
                      </div>
                    </>
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
