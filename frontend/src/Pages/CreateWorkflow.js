import React from "react";
import CreateWorkHeader from "../components/Navbar/createWorkHeader";
import UserForm from "../components/WorkflowForm";

export default function CreateWorkflow() {
  return (
    <div>
      <CreateWorkHeader>
        <UserForm />
      </CreateWorkHeader>
    </div>
  );
}
