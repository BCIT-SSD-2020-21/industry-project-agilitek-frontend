import axios from 'axios';
const url = 'https://jzqdyrxgy2.execute-api.us-east-1.amazonaws.com/prod';

//////////////////////////////////// WORKFLOW ////////////////////////////////////
// Dashboard: Get all user workflows
export async function getAllWorkflows() {
  try {
    const res = await axios.get(`${url}/myworkflows`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Create a Workflow
export async function createWorkflow(data) {
  try {
    const res = await axios.post(`${url}/myworkflows`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
// Dashboard: Get user workflow by id
export async function getWorkflow(id) {
  try {
    const res = await axios.get(`${url}/myworkflows/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Update Workflow
export async function updateWorkflow(id, data) {
  try {
    const res = await axios.put(`${url}/myworkflows/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Delete a Workflow
export async function deleteWorkflow(id) {
  try {
    const res = await axios.delete(`${url}/myworkflows/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//Get workflow logs
export async function getWorkflowLogs(id) {
  try {
    const res = await axios.get(`${url}/myworkflows/logs/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//////////////////////////////////// Salesforce ////////////////////////////////////

// UseEffect/PageLoad add new workflow: Request for input list of specific flow
export async function getSalesForceFlow() {
  try {
    const res = await axios.get(`${url}/salesforceflows`);
    return res.data.actions;
  } catch (err) {
    console.log(err);
  }
}

// Get flow inputs
export async function getWorkflowInputs(flowUrl) {
  try {
    const res = await axios.get(
      `${url}/salesforceflows/flow?flowUrl=${flowUrl}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// Get Salesforce sObject type metadata
export async function getMetadata(sObjectType) {
  try {
    const res = await axios.get(
      `${url}/salesforceflows/metadata?sObjectType=${sObjectType}`
    );

    return res.data.metadata;
  } catch (err) {
    console.log(err);
  }
}

//////////////////////////////////// Database ////////////////////////////////////

// Get database tables
export async function getDBTables() {
  try {
    const res = await axios.get(`${url}/database`);

    return JSON.parse(res.data.body);
  } catch (err) {
    console.log(err);
  }
}

// Get database columns by table_name
export async function getDBColumns(table_name) {
  try {
    const res = await axios.get(`${url}/database/${table_name}/columns`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getDBColumns(table_name) {
  try {
    const res = await axios.get(`${url}/database/${table_name}/pk_column`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
