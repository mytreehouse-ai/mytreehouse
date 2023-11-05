"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useMemo } from "react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { GridOptions } from "ag-grid-community";
import type { GetRowIdParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface ITableRowData {
  id: number;
  owner: string;
  propertyName: string;
  location: string;
  price: number;
}

const dummyData: ITableRowData[] = [
  {
    id: 1,
    owner: "Jomayel Andrade",
    propertyName: "Condo in Manila",
    location: "Manila",
    price: 1000,
  },
  {
    id: 2,
    owner: "Ryan Rizo",
    propertyName: "House in Quezon City",
    location: "Quezon City",
    price: 2000,
  },
  {
    id: 3,
    owner: "Pera Nte",
    propertyName: "Apartment in Davao City",
    location: "Davao City",
    price: 3000,
  },
  {
    id: 4,
    owner: "Ken Barlow",
    propertyName: "Townhouse in Cebu City",
    location: "Cebu City",
    price: 4000,
  },
  {
    id: 5,
    owner: "Eugene Caps",
    propertyName: "Villa in Zamboanga City",
    location: "Zamboanga City",
    price: 5000,
  },
];

const Table = () => {
  const [rowData, setRowData] = useState<ITableRowData[]>(dummyData);
  const [columnDefs, setColumnDefs] = useState<ColDef<ITableRowData>[]>([
    { field: "id", filter: true },
    { field: "owner", filter: true },
    { field: "propertyName", filter: true },
    { field: "location", filter: true },
    { field: "price", filter: true },
  ]);

  const gridRef = useRef<AgGridReactType<ITableRowData>>(null);

  const getRowId = useMemo(() => {
    return (data: GetRowIdParams<ITableRowData>) => data.data.owner;
  }, []);

  const gridOptions: GridOptions<ITableRowData> = {
    rowData: rowData,
    getRowId: getRowId,
    editType: "fullRow",
    pagination: true,

    // onCellValueChanged: (event) => {
    //   console.log(event);
    // },
    onRowValueChanged: (event) => {
      console.log(event);
    },
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="ag-theme-alpine " style={{ width: 1000, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default Table;
