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
        const res = await getWorkflowLogs(27)
        // console.log(res.action_name)
        setFormData({
            workflow_id: res.workflow_id, 
            action_name: res.action_name ,
            time_of_completion: res.time_of_completion,
            record_id: res.record_id,
          })
        }   
        // console.log(formData)  
    })()
    }, [])

    useEffect(() => {
        console.log(formData)
    }, [formData])

    return (
        <></>
    )
}
