import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import RESULTS from './RESULTS.json';
import {Columns} from './Columns';
import './table.css'
import Filter from "./Filter";

function BasicTable() {

    const columns = useMemo(()=>Columns,[]);
    const data = useMemo(()=> RESULTS,[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({columns,data}, useGlobalFilter, useSortBy);

    const { globalFilter} = state;

    return(
        <>
            <Filter filter={globalFilter} setFilter={setGlobalFilter}/>
            <hr/>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup)=>(
                <tr {...headerGroup.getHeaderGroupProps()}>

                    {
                        headerGroup.headers.map(column=>(
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '↑': '↓'):''}
                                </span>
                            </th>
                        ))
                    }

                </tr>
            ))}
            </thead>

            <tbody {...getTableBodyProps()}>
            {rows.map((row)=>{
                prepareRow(row)
                return(
                    <tr {...row.getRowProps()}>
                        {
                            row.cells.map(cell=>{
                              return <td {...cell.getCellProps()}>
                                  {cell.render('Cell')}
                              </td>
                            })
                        }
                    </tr>
                )
            })}
            </tbody>
        </table>
        </>
    )
}

export default BasicTable;
