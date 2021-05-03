import React, { useState, useEffect } from 'react';
import {
    createWorkflow,
    getSalesForceFlow,
    getWorkflow,
    getWorkflowLogs,
    setQuery,
    updateWorkflow,
    getDBTables,
    getDBColumns,
    deleteWorkflow,
    getWorkflowInputs,
    getMetadata,
} from '../../api/network';
import { Switch } from '@headlessui/react';
import { useHistory, useParams } from 'react-router-dom';
import MappingInput from './MappingInput';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Modal from '../Modal/Modal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function UserForm() {
    const history = useHistory();
    const { id } = useParams();
    const [workflows, setWorkflows] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        flowUrl: '',
        table: '',
        column: '',
        label: '',
        type: '',
        sObjectType: '',
        whereClause: '',
        mapping: {},
        active: true,
        runAgain: true,
    });
    const [dbTables, setDbTables] = useState([]);
    const [dbColumns, setDBColumns] = useState([]);
    const [sfMetadata, setSfMetadata] = useState([]);
    const [processsing, setProcessing] = useState(false);
    const [mappings, setMappings] = useState([]);
    const [alertMessage, setAlertMessage] = useState({
        type: '',
        message: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [tempMapping, setTempMapping] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    // CDM
    useEffect(() => {
        (async () => {
            // Get all database tables from the database
            const dbTablesRes = await getDBTables();
            setDbTables(dbTablesRes);

            // Get all Salesforce flows from Salesforce Invoke Flow API
            const sfFlowRes = await getSalesForceFlow();
            setWorkflows(sfFlowRes);

            // If there is an id in the url parameters then retrieve all
            // the data for that workflow
            if (id) {
                const res = await getWorkflow(id);

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
                });

                // Fetch and set Salesforce metadata
                if (res.type === 'SOBJECT') {
                    const metadataRes = await getMetadata(res.sobjecttype);
                    setSfMetadata(metadataRes);
                }

                setTempMapping(res.mapping);
            }
        })();
    }, []);

    // CDU - Update when table selection changed
    useEffect(() => {
        (async () => {
            setTempMapping({});

            const dbColumnsRes = await getDBColumns(formData.table);
            setDBColumns(dbColumnsRes);
        })();
    }, [formData.table]);

    // CDU - Update when new mapping is added
    useEffect(() => {
        const temp = [];

        for (const mappingKey in tempMapping) {
            temp.push(
                <MappingInput
                    key={`${mappingKey}:${tempMapping[mappingKey]}`}
                    sfMetadata={sfMetadata}
                    dbColumns={dbColumns}
                    tempMapping={tempMapping}
                    setTempMapping={setTempMapping}
                    mappingKey={mappingKey}
                    mappingValue={tempMapping[mappingKey]}
                    setSnackbarOpen={setSnackbarOpen}
                    setAlertMessage={setAlertMessage}
                />
            );
        }

        setMappings([
            ...temp,
            <MappingInput
                key={':'}
                sfMetadata={sfMetadata}
                dbColumns={dbColumns}
                tempMapping={tempMapping}
                setTempMapping={setTempMapping}
                mappingKey=""
                mappingValue=""
                setSnackbarOpen={setSnackbarOpen}
                setAlertMessage={setAlertMessage}
            />,
        ]);
    }, [tempMapping]);

    // CDU - Reset mapping inputs whenever the workflow changes
    useEffect(() => {
        setMappings([
            <MappingInput
                key={':'}
                sfMetadata={sfMetadata}
                dbColumns={dbColumns}
                tempMapping={tempMapping}
                setTempMapping={setTempMapping}
                mappingKey=""
                mappingValue=""
                setSnackbarOpen={setSnackbarOpen}
                setAlertMessage={setAlertMessage}
            />,
        ]);
    }, [sfMetadata, dbColumns]);

    // Form validation
    const validateForm = () => {
        if (!formData.name) {
            handleAlertMessage({
                type: 'error',
                message: 'Workflow name cannot be empty',
            });

            setProcessing(false);

            return false;
        } else if (!formData.table) {
            handleAlertMessage({
                type: 'error',
                message: 'Please choose a database table',
            });

            setProcessing(false);

            return false;
        } else if (!formData.flowUrl) {
            handleAlertMessage({
                type: 'error',
                message: 'Please choose a Salesforce flow',
            });

            setProcessing(false);

            return false;
        } else if (formData.type !== 'SOBJECT' && !formData.column) {
            handleAlertMessage({
                type: 'error',
                message: 'Please choose a database column',
            });

            setProcessing(false);

            return false;
        } else if (
            formData.type === 'SOBJECT' &&
            Object.keys(tempMapping).length === 0
        ) {
            handleAlertMessage({
                type: 'error',
                message: 'Please set at least one mapping',
            });

            setProcessing(false);

            return false;
        }

        return true;
    };

    // Makes a call to db to return query results
    const submit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Check if id url parameter exists
            // TRUE: Update the workflow
            // FALSE: Create a new workflow
            if (id) {
                await updateWorkflow(id, { ...formData, mapping: tempMapping });
            } else {
                await createWorkflow({ ...formData, mapping: tempMapping });
            }

            history.push('/');
        }
    };

    // Handle alert message snackbar close event
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    // Handle form data change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value || '' });
    };

    // Handle workflow dropdown list change
    const handleWorkflowChange = async (e) => {
        // Set mappings to an empty array first
        setMappings([]);
        // Also set tempMapping to an empty object
        setTempMapping({});

        if (e.target.value) {
            const sfInputsRes = await getWorkflowInputs(e.target.value);

            setFormData({
                ...formData,
                type: sfInputsRes.type,
                label: sfInputsRes.label,
                sObjectType: sfInputsRes.sObjectType,
                column: '',
                flowUrl: e.target.value,
            });

            // Fetch and set Salesforce metadata
            if (sfInputsRes.type === 'SOBJECT') {
                const metadataRes = await getMetadata(sfInputsRes.sObjectType);
                setSfMetadata(metadataRes);
            }
        } else {
            setFormData({
                ...formData,
                type: '',
                label: '',
                sObjectType: '',
                column: '',
                flowUrl: '',
            });
        }
    };

    // Handle alert message change
    const handleAlertMessage = ({ type, message }) => {
        setSnackbarOpen(true);
        setAlertMessage({
            type,
            message,
        });
    };

    const handleSwitchForRunAgain = (e) => {
        setFormData({ ...formData, runAgain: e });

        handleAlertMessage({
            type: 'success',
            message: e
                ? 'Run once for each contact turn ON'
                : 'Run once for each contact turn OFF',
        });
    };

    const handleAutomationSwitch = (e) => {
        setFormData({ ...formData, active: e });

        handleAlertMessage({
            type: 'success',
            message: e ? 'Automation turn ON' : 'Automation turn OFF',
        });
    };

    const handleDelete = async () => {
        await deleteWorkflow(id);
        history.push('/');
    };

    const closeModal = () => {
        setModalOpen(false);
    };

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
    } = formData;

    return (
        <div className="m-8">
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    {/* <div className="border-t border-gray-200" /> */}
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
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name of the Workflow*
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter name..."
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        {/* SELECT DATABASAE TABLES */}
                                        <div className="col-span-6 sm:col-span-3 mt-5">
                                            <label
                                                htmlFor="tables"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Database Table*
                                            </label>
                                            <select
                                                id="tables"
                                                name="table"
                                                value={table}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Choose table...
                                                </option>
                                                {dbTables.map(
                                                    (dbTable, idx) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    dbTable.table_name
                                                                }
                                                                key={idx}
                                                            >
                                                                {
                                                                    dbTable.table_name
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        {/* SELECT SALESFORCE FLOWS */}
                                        <div className="col-span-6 sm:col-span-3 mt-5">
                                            <label
                                                htmlFor="flowUrl"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Salesforce Flow*
                                            </label>
                                            <select
                                                id="flowUrl"
                                                name="flowUrl"
                                                value={flowUrl}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={(e) => {
                                                    handleWorkflowChange(e);
                                                    handleChange(e);
                                                }}
                                            >
                                                <option value="">
                                                    Choose flow...
                                                </option>
                                                {workflows.map(
                                                    (workflow, idx) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    workflow.url
                                                                }
                                                                key={idx}
                                                            >
                                                                {workflow.label}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    {/* Show additional input or selection boxes only if table and workflow are selected */}
                                    {table && flowUrl ? (
                                        <>
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="inputs_type"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Salesforce Flow Inputs
                                                        Type
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
                                                {/* If not sObject type then show the column selection list*/}
                                                {!sObjectType ||
                                                sObjectType === 'undefined' ? (
                                                    <div className="sm:col-span-3">
                                                        {/* SELECT DATABASE COLUMNS */}

                                                        <label
                                                            htmlFor="columns"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Database Column*
                                                        </label>
                                                        <select
                                                            id="columns"
                                                            name="column"
                                                            value={column}
                                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            onChange={
                                                                handleChange
                                                            }
                                                        >
                                                            <option value="">
                                                                Choose Column...
                                                            </option>
                                                            {dbColumns.map(
                                                                (
                                                                    dbColumn,
                                                                    idx
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                dbColumn.column_name
                                                                            }
                                                                            key={
                                                                                idx
                                                                            }
                                                                        >
                                                                            {
                                                                                dbColumn.column_name
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                ) : null}
                                            </div>
                                            {/* Mapping dropdown lists */}
                                            {sObjectType &&
                                            sObjectType !== 'undefined' ? (
                                                <div className="mappings">
                                                    {mappings}
                                                </div>
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
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                    <div className="col-span-6 sm:col-span-3 mt-5">
                                        <Switch.Group
                                            as="div"
                                            className="flex items-center"
                                        >
                                            <Switch
                                                checked={active}
                                                onChange={
                                                    handleAutomationSwitch
                                                }
                                                className={classNames(
                                                    active
                                                        ? 'bg-indigo-600'
                                                        : 'bg-gray-200',
                                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span className="sr-only">
                                                    Use setting
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        active
                                                            ? 'translate-x-5'
                                                            : 'translate-x-0',
                                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                    )}
                                                />
                                            </Switch>
                                            <Switch.Label
                                                as="span"
                                                className="ml-3"
                                            >
                                                <span className="text-sm font-medium text-gray-900">
                                                    {active
                                                        ? 'Automation active'
                                                        : 'Automation paused'}
                                                </span>
                                            </Switch.Label>
                                        </Switch.Group>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 mt-5">
                                        <Switch.Group
                                            as="div"
                                            className="flex items-center"
                                        >
                                            <Switch
                                                checked={runAgain}
                                                onChange={
                                                    handleSwitchForRunAgain
                                                }
                                                className={classNames(
                                                    runAgain
                                                        ? 'bg-indigo-600'
                                                        : 'bg-gray-200',
                                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span className="sr-only">
                                                    Use setting
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        runAgain
                                                            ? 'translate-x-5'
                                                            : 'translate-x-0',
                                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                    )}
                                                />
                                            </Switch>
                                            <Switch.Label
                                                as="span"
                                                className="ml-3"
                                            >
                                                <span className="text-sm font-medium text-gray-900">
                                                    {runAgain
                                                        ? 'Runs for same contacts repeatedly'
                                                        : 'Only runs once for each contact'}
                                                </span>
                                            </Switch.Label>
                                        </Switch.Group>
                                    </div>
                                </div>
                                {/* Dont touch anything below this point */}
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => history.push('/')}
                                        className="mx-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                    >
                                        Cancel
                                    </button>
                                    {/* Only show delete button only when there is a URL id parameter */}
                                    {id && (
                                        <button
                                            type="button"
                                            onClick={() => setModalOpen(true)}
                                            style={{
                                                backgroundColor:
                                                    processsing && 'grey',
                                            }}
                                            className="mr-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                        >
                                            Delete Configuration
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        onClick={disableButton}
                                        style={{
                                            backgroundColor:
                                                processsing && 'grey',
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                    >
                                        {processsing
                                            ? 'Saving...'
                                            : 'Save Configuration'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={alertMessage.type}
                >
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <Modal
                deleteWorkflow={handleDelete}
                modalOpen={modalOpen}
                modalClose={closeModal}
            />
        </div>
    );
}
