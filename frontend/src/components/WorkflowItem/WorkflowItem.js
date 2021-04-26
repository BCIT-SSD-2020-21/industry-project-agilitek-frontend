import React from "react"
import { CashIcon, ChevronRightIcon } from "@heroicons/react/solid"

const WorkflowItem = ({ workflow }) => {
  return (
    <a
      href={workflow.href}
      className="block px-4 py-4 bg-white hover:bg-gray-50"
    >
      <span className="flex items-center space-x-4">
        <span className="flex-1 flex space-x-2 truncate">
          <CashIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span className="flex flex-col text-gray-500 text-sm truncate">
            <span className="truncate">{workflow.name}</span>
            <span>
              <span className="text-gray-900 font-medium">
                {workflow.Frequency}
              </span>
            </span>
            {/* <time dateTime={workflows.datetime}>{workflows.date}</time> */}
          </span>
        </span>
        <ChevronRightIcon
          className="flex-shrink-0 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </a>
  )
}

export default WorkflowItem
