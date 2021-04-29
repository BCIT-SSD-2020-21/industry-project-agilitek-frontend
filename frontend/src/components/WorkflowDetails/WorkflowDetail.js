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

useEffect(() => {
    ;(async () => {
        const res = await getWorkflowLogs(27)
        console.log(res)
    })()
    }, [])



    return (
        <></>
    )
}
