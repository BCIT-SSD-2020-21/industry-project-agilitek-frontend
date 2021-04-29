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
    name: "",
    desc: "",
    flowUrl: "",
    query: "",
    active: true,
    })



useEffect(() => {
    ;(async () => {
        const id = 27;
        if (id) {
        const res = await getWorkflowLogs(id)
        console.log(res)
        }     
    })()
    }, [])



    return (
        <></>
    )
}
