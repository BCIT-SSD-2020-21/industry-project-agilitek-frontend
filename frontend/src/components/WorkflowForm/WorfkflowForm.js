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
    getWorkflowInputs,
} from '../../api/network';
import { Switch } from '@headlessui/react';
import { useHistory, useParams } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const people = [
    {
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        role: 'Admin',
        email: 'jane.cooper@example.com',
    },
    // More people...
];

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
        active: true,
    });
    const [dbTables, setDbTables] = useState([]);
    const [dbColumns, setDBColumns] = useState([]);
    const [processsing, setProcessing] = useState(false);

    useEffect(() => {
        (async () => {
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
                    query: res.sql_query,
                    active: res.active,
                });
            }

            // Get all database tables from the database
            const dbTablesRes = await getDBTables();
            setDbTables(dbTablesRes);
        })();
    }, []);

    // Makes a call to db to return query results
    const submit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateWorkflow(id, formData);
        } else {
            await createWorkflow(formData);
        }
        history.push('/');
    };

    // Handle form data change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle table dropdown list change
    const handleDBTableChange = async (e) => {
        const dbColumnsRes = await getDBColumns(e.target.value);
        setDBColumns(dbColumnsRes);

        handleChange(e);
    };

    // Handle workflow dropdown list change
    const handleWorkflowChange = async (e) => {
        if (e.target.value) {
            const workflowRes = await getWorkflowInputs(e.target.value);

            setFormData({
                ...formData,
                type: workflowRes.type,
                label: workflowRes.label,
                sObjectType: workflowRes.sObjectType,
                flowUrl: e.target.value,
            });
        } else {
            setFormData({
                ...formData,
                type: '',
                label: '',
                sObjectType: '',
                flowUrl: '',
            });
        }
    };

    const handleSwitch = (e) => {
        setFormData({ ...formData, active: e });
    };

    const disableButton = () => {
        setProcessing(true);
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
                                                Name of the Workflow
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
                                                Choose Table
                                            </label>
                                            <select
                                                id="tables"
                                                name="table"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={handleDBTableChange}
                                            >
                                                <option value="">
                                                    Choose Table...
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
                                                Choose Workflow
                                            </label>
                                            <select
                                                id="flowUrl"
                                                name="flowUrl"
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={handleWorkflowChange}
                                            >
                                                <option value="">
                                                    Choose Workflow...
                                                </option>
                                                {workflows.map(
                                                    (option, idx) => {
                                                        return (
                                                            <option
                                                                value={
                                                                    option.url
                                                                }
                                                                key={idx}
                                                            >
                                                                {option.label}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    {table && type && label ? (
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
                                                <div className="sm:col-span-3">
                                                    {/* SELECT DATABASE COLUMNS */}

                                                    <label
                                                        htmlFor="columns"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Choose Columns
                                                    </label>
                                                    <select
                                                        id="columns"
                                                        name="column"
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">
                                                            Choose Columns...
                                                        </option>
                                                        {dbColumns.map(
                                                            (dbColumn, idx) => {
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
                                            </div>
                                            <div className="grid grid-cols-6 gap-6 ">
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
                                                onChange={handleSwitch}
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
                                </div>

                                {/* Dont touch anything below this point */}
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        onClick={disableButton}
                                        style={{
                                            backgroundColor:
                                                processsing && 'grey',
                                        }}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        </div>
    );
}
