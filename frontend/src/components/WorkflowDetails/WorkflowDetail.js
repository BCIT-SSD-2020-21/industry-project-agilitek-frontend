import React from 'react'

export default function WorkflowDetail() {

useEffect(() => {
    ;(async () => {
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
