import React from 'react';

export default function DetailInput({mapping, mappingKey}) {
return (
      <>
      {/* Salesforce MetaData field */}
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
            <label
            htmlFor="inputs_type"
            className="block text-sm font-medium text-gray-700"
            >
            Salesforce MetaData : Database Column
            </label>
            <input
            type="text"
            name="inputs_type"
            id="inputs_type"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            value={
            `${mappingKey} : ${mapping}`
            }
            disabled
            />
      </div>
      </div>
      </>
)
}