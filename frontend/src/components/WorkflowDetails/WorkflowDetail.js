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


export default function WorkflowDetail() {
const history = useHistory()
const { id } = useParams()

const [formData, setFormData] = useState({
    workflow_id: "", 
    action_name: "",
    time_of_completion: "",
    record_id: "",
    })


useEffect(() => {
    ;(async () => {
        const id = 27;
        if (id) {
        const res = await getWorkflowLogs(id)
        console.log(res)
        setFormData({
            name: res.name,
            desc: res.desc,
            flowUrl: res.flow_url,
            query: res.sql_query,
            active: res.active,
          })
        }   
        console.log(formData)  
    })()
    }, [])

    return (
        <></>
    )
}
