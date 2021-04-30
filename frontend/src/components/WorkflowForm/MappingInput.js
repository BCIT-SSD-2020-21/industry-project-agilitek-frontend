// import React from 'react';

// export default function MappingInput() {
//     return (
//         <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//             <div className="sm:col-span-3">
//                 {/* SELECT DATABASE COLUMNS */}

//                 <label
//                     htmlFor="columns"
//                     className="block text-sm font-medium text-gray-700"
//                 >
//                     Choose Columns
//                 </label>
//                 <select
//                     id="columns"
//                     name="column"
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     onChange={handleChange}
//                 >
//                     <option value="">Choose Columns...</option>
//                     {dbColumns.map((dbColumn, idx) => {
//                         return (
//                             <option
//                                 value={dbColumn.column_name}
//                                 key={idx}
//                                 selected={
//                                     dbColumn.column_name === column
//                                         ? 'selected'
//                                         : ''
//                                 }
//                             >
//                                 {dbColumn.column_name}
//                             </option>
//                         );
//                     })}
//                 </select>
//             </div>
//             <div className="sm:col-span-3">
//                 {/* SELECT DATABASE COLUMNS */}

//                 <label
//                     htmlFor="columns"
//                     className="block text-sm font-medium text-gray-700"
//                 >
//                     Choose Columns
//                 </label>
//                 <select
//                     id="columns"
//                     name="column"
//                     className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     onChange={handleChange}
//                 >
//                     <option value="">Choose Columns...</option>
//                     {dbColumns.map((dbColumn, idx) => {
//                         return (
//                             <option
//                                 value={dbColumn.column_name}
//                                 key={idx}
//                                 selected={
//                                     dbColumn.column_name === column
//                                         ? 'selected'
//                                         : ''
//                                 }
//                             >
//                                 {dbColumn.column_name}
//                             </option>
//                         );
//                     })}
//                 </select>
//             </div>
//         </div>
//     );
// }
