import React, { useState, useEffect } from 'react';
import { getSalesForceFlow, getWorkflow } from '../../api/network';
import { useHistory, useParams } from 'react-router-dom';
import ExecutionTable from '../ExecutionTable/ExecutionTable';
import DetailInput from './DetailInput';

export default function WorkflowDetail() {
    const history = useHistory();
    const { id } = useParams();

    const [, setOptions] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        flowUrl: '',
        query: '',
        column: '',
        label: '',
        type: '',
        sObjectType: '',
        whereClause: '',
        mapping: {},
        active: true,
        runAgain: true,
    });

    useEffect(() => {
        (async () => {
            const res = await getSalesForceFlow();
            setOptions(res);
        })();
    }, []);

    // CDM
    useEffect(() => {
        // try{
        (async () => {
            try {
                const res = await getWorkflow(id);
                setFormData({
                    name: res.name,
                    desc: res.description,
                    flowUrl: res.flow_url,
                    active: res.active,
                    table: res.table,
                    type: res.type,
                    label: res.label,
                    column: res.column,
                    sObjectType: res.sobject_type,
                    whereClause: res.where_clause,
                    runAgain: res.run_again,
                    mapping: res.mapping,
                });
            } catch (err) {
                history.push('/404');
            }
        })();
    }, [history, id]);

    const {
        name,
        active,
        type,
        label,
        sObjectType,
        whereClause,
        runAgain,
        column,
        mapping,
    } = formData;

    return (
        <div className="m-8">
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-2"></div>
            </div>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-full">
                        <form>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-7 sm:col-span-4 mt-5">
                                            <label
                                                htmlFor="email_address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name of the Workflow
                                            </label>
                                            <input
                                                disabled
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Name.."
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={name}
                                            />
                                        </div>
                                    </div>
                                    <>
                                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label
                                                    htmlFor="inputs_type"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Salesforce Flow Inputs Type
                                                </label>
                                                <input
                                                    type="text"
                                                    name="inputs_type"
                                                    id="inputs_type"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={
                                                        sObjectType &&
                                                        sObjectType !==
                                                            'undefined'
                                                            ? `${label} (${type} of Type=${sObjectType})`
                                                            : `${label} (Type=${type})`
                                                    }
                                                    disabled
                                                />
                                            </div>
                                            <div></div>
                                        </div>
                                        {/* Salesforce MetaData field */}
                                        {/* {detailInputs}   */}
                                        {type == 'SOBJECT' ?
                                         (mapping
                                            ? Object.keys(
                                                  mapping
                                              ).map((key, i) => (
                                                  <DetailInput
                                                      key={i}
                                                      mapping={mapping[key]}
                                                      mappingKey={key}
                                                  />
                                              ))
                                            : null
                                         ) : (
                                            <>
                                            {/* Salesforce MetaData field */}
                                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label
                                                        htmlFor="inputs_type"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Database Column
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="inputs_type"
                                                        id="inputs_type"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        value={column}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </>
                                         )
                                        }
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
                                                    placeholder=""
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    value={whereClause}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-4 mt-5">
                                            <label
                                                htmlFor="email_address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Automation Status
                                            </label>
                                            <input
                                                disabled
                                                type="text"
                                                name="query"
                                                id="query"
                                                placeholder="SQL Query"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={active}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6 ">
                                        <div className="col-span-6 sm:col-span-4 mt-5">
                                            <label
                                                htmlFor="email_address"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Run for Same Contacts Repeatedly
                                            </label>
                                            <input
                                                disabled
                                                type="text"
                                                name="query"
                                                id="query"
                                                placeholder="SQL Query"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                value={runAgain}
                                            />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="button"
                                                    className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                                                    onClick={() =>
                                                        history.push(
                                                            `/configure/${id}`
                                                        )
                                                    }
                                                >
                                                    Go to Configuration
                                                </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5"></div>
            </div>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-full">
                        <ExecutionTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
