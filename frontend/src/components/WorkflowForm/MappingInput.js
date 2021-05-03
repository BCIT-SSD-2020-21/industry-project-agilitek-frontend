import React, { useState, useEffect } from 'react';

export default function MappingInput({
    dbColumns,
    sfMetadata,
    tempMapping,
    setTempMapping,
    mappingKey,
    mappingValue,
    setErrorMessage,
    setSnackbarOpen,
}) {
    const [metadata, setMetaData] = useState('');
    const [column, setColumn] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    // CDM
    useEffect(() => {
        if (mappingKey && mappingValue) {
            setMetaData(mappingKey);
            setColumn(mappingValue);
            setIsAdded(true);
        }
    }, []);

    const handleAddBtnClick = () => {
        // Only let user add mapping when metadata and column are
        // not empty
        if (metadata && column) {
            // Check if the key/value mapping already exists
            if (
                tempMapping.hasOwnProperty(metadata) &&
                tempMapping[metadata] === column
            ) {
                setSnackbarOpen(true);
                setErrorMessage(
                    `${metadata}: ${column} mapping already exists`
                );
            } else {
                setTempMapping((prev) => ({
                    ...prev,
                    [metadata]: column,
                }));
            }
        } else {
            setSnackbarOpen(true);
            setErrorMessage('Please select a metadata and a column');
        }
    };

    const handleDeleteBtnClick = () => {
        if (
            tempMapping.hasOwnProperty(metadata) &&
            tempMapping[metadata] === column
        ) {
            // Delete mapping input component
            const result = Object.keys(tempMapping).reduce((object, key) => {
                if (key !== metadata) {
                    object[key] = tempMapping[key];
                }
                return object;
            }, {});

            setTempMapping(result);
        }
    };

    return (
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-5">
            <div className="sm:col-span-2">
                {/* SELECT DATABASE COLUMNS */}

                <label
                    htmlFor="metadata"
                    className="block text-sm font-medium text-gray-700"
                >
                    Salesforce Metadata
                </label>
                <select
                    id="metadata"
                    name="metadata"
                    value={metadata}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setMetaData(e.target.value)}
                    disabled={isAdded}
                >
                    <option value="">Choose Metadata...</option>
                    {sfMetadata.map((md, idx) => {
                        return (
                            <option value={md.name} key={idx}>
                                {md.label}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="sm:col-span-2">
                {/* SELECT DATABASE COLUMNS */}
                <label
                    htmlFor="columns"
                    className="block text-sm font-medium text-gray-700"
                >
                    Database Column
                </label>
                <select
                    id="columns"
                    name="column"
                    value={column}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setColumn(e.target.value)}
                    disabled={isAdded}
                >
                    <option value="">Choose Column...</option>
                    {dbColumns.map((dbColumn, idx) => {
                        return (
                            <option value={dbColumn.column_name} key={idx}>
                                {dbColumn.column_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="sm:col-span-1 flex">
                {isAdded ? (
                    <button
                        type="button"
                        className="inline-flex items-center self-end px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{
                            backgroundColor: '#ff0021',
                        }}
                        onClick={handleDeleteBtnClick}
                    >
                        DELETE
                    </button>
                ) : (
                    <button
                        type="button"
                        className="inline-flex items-center self-end px-5 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        style={{
                            backgroundColor: '#0891b2',
                        }}
                        onClick={handleAddBtnClick}
                    >
                        ADD
                    </button>
                )}
            </div>
        </div>
    );
}
