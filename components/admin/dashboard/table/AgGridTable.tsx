"use client";
import { AgGridReact } from "ag-grid-react";
import {
  useRef,
  useState,
  useMemo,
  useEffect,
  memo,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { GridOptions } from "ag-grid-community";
import type { GetRowIdParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { formatToPhp } from "@/lib/utils";

interface IPropertyData {
  id: string;
  address: string;
  amenities: string[];
  bathroom: number;
  bedroom: number;
  building_name: string | null;
  city_name: string;
  created_at: string;
  current_price: string;
  description: string;
  floor_area: number;
  images: string[];
  is_active: boolean;
  is_cbd: boolean;
  is_corner_lot: boolean;
  latitude: string;
  lease_end: string | null;
  listing_title: string;
  listing_type_name: string;
  listing_url: string;
  longitude: string;
  lot_area: number;
  parking_lot: number;
  property_id: string;
  property_type_name: string;
  sqm: number;
  studio_type: boolean;
  turnover_status_name: string;
  year_built: string | null;
}

interface NumericEditorProps {
  value: string;
  eventKey: string;
  stopEditing: () => void;
}

interface NumericEditorHandle {
  getValue: () => number | null;
  isCancelBeforeStart: () => boolean;
  isCancelAfterEnd: () => boolean;
}

const dummyData: IPropertyData[] = [
  {
    id: "1",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Pasig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "26582000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Residences at The Galleon | 1BR Condo Unit for Sale in Ortigas CBD, Pasig City | 43K",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "2",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Pasig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "26582000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Maple at Verdant Towers | 1BR Condo Unit for Sale in Ortigas East, Pasig City | 3011",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "3",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Las Piñas",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "10000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Brand New Duplex House and Lot For Sale in BF Resort, Las Piñas",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "House and Lot",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Semi-Furnished",
    year_built: null,
  },
  {
    id: "4",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Taguig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "14000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Fully Furnished 1-Bedroom Unit For Sale at Bellagio 3, Taguig City",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Semi-Furnished",
    year_built: null,
  },
  {
    id: "5",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Dumaguete",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "25000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title: "Apartment for Rent in Daro Dumaguete City",
    listing_type_name: "For Rent",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Townhouse",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "6",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Quezon City",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "6325600.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Vacant Residential Lot for Sale inside Filinvest 2, Quezon City",
    listing_type_name: "For Rent",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Vacant Lot",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Unknown",
    year_built: null,
  },
  {
    id: "7",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Bulacan",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "280000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title: "INDUSTRIAL WAREHOUSE FOR SALE IN STA. MARIA BULACAN",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Warehouse",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Unknown",
    year_built: null,
  },
];

const AgGridTable = () => {
  const [rowData, setRowData] = useState<IPropertyData[]>(dummyData);

  const NumericEditor = memo(
    forwardRef<NumericEditorHandle, NumericEditorProps>((props, ref) => {
      const KEY_BACKSPACE = "Backspace";
      const KEY_F2 = "F2";
      const KEY_ENTER = "Enter";
      const KEY_TAB = "Tab";

      const createInitialState = () => {
        let startValue: string;
        let highlightAllOnFocus = true;
        const eventKey = props.eventKey;

        if (eventKey === KEY_BACKSPACE) {
          // if backspace or delete pressed, we clear the cell
          startValue = "";
        } else if (eventKey && eventKey.length === 1) {
          // if a letter was pressed, we start with the letter
          startValue = eventKey;
          highlightAllOnFocus = false;
        } else {
          // otherwise we start with the current value
          startValue = props.value;
          if (props.eventKey === KEY_F2) {
            highlightAllOnFocus = false;
          }
        }

        return {
          value: startValue,
          highlightAllOnFocus,
        };
      };

      const initialState = createInitialState();
      const [value, setValue] = useState<string>(initialState.value);
      const [highlightAllOnFocus, setHighlightAllOnFocus] = useState<boolean>(
        initialState.highlightAllOnFocus,
      );
      const refInput = useRef<HTMLInputElement>(null);

      // focus on the input
      useEffect(() => {
        // get ref from React component
        const eInput = refInput.current;
        if (eInput) {
          eInput.focus();
          if (highlightAllOnFocus) {
            eInput.select();

            setHighlightAllOnFocus(false);
          } else {
            // when we started editing, we want the caret at the end, not the start.
            // this comes into play in two scenarios:
            //   a) when user hits F2
            //   b) when user hits a printable character
            const length = eInput.value ? eInput.value.length : 0;
            if (length > 0) {
              eInput.setSelectionRange(length, length);
            }
          }
        }
      }, []);

      /* Utility Methods */
      const cancelBeforeStart =
        props.eventKey &&
        props.eventKey.length === 1 &&
        "1234567890".indexOf(props.eventKey) < 0;

      const isLeftOrRight = (event: React.KeyboardEvent<HTMLInputElement>) => {
        return ["ArrowLeft", "ArrowRight"].indexOf(event.key) > -1;
      };

      const isCharNumeric = (charStr: string) => {
        return !!/\d/.test(charStr);
      };

      const isNumericKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charStr = event.key;
        return isCharNumeric(charStr);
      };

      const isBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
        return event.key === KEY_BACKSPACE;
      };

      const finishedEditingPressed = (
        event: React.KeyboardEvent<HTMLInputElement>,
      ) => {
        const key = event.key;
        return key === KEY_ENTER || key === KEY_TAB;
      };

      const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isLeftOrRight(event) || isBackspace(event)) {
          event.stopPropagation();
          return;
        }

        if (!finishedEditingPressed(event) && !isNumericKey(event)) {
          if (event.preventDefault) event.preventDefault();
        }

        if (finishedEditingPressed(event)) {
          props.stopEditing();
        }
      };

      /* Component Editor Lifecycle methods */
      useImperativeHandle(ref, () => {
        // the final value to send to the grid, on completion of editing
        const getValue = () =>
          value === "" || value == null ? null : parseInt(value);

        return {
          getValue,
          // Gets called once before editing starts, to give editor a chance to
          // cancel the editing before it even starts.
          isCancelBeforeStart: () => cancelBeforeStart as boolean,
          // Gets called once when editing is finished (eg if Enter is pressed).
          // If you return true, then the result of the edit will be ignored.
          isCancelAfterEnd: () => {
            // will reject the number if it greater than 1,000,000,000
            // not very practical, but demonstrates the method.
            const finalValue = getValue();

            return (
              finalValue != null && ((finalValue > 1_000_000_000) as boolean)
            );
          },
        };
      });

      return (
        <input
          ref={refInput}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => onKeyDown(event)}
          className="numeric-input"
        />
      );
    }),
  );

  const [columnDefs, setColumnDefs] = useState<ColDef<IPropertyData>[]>([
    {
      field: "listing_title",
      headerName: "Title",
      filter: false,
      sortable: false,
      editable: false,
    },
    {
      field: "property_type_name",
      headerName: "Property type",
      filter: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: [
          "Condominium",
          "Townhouse",
          "Apartment",
          "Warehouse",
          "House & Lot",
          "Vacant Lot",
        ],
      },
    },
    {
      field: "listing_type_name",
      headerName: "Listing type",
      filter: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["For sale", "For rent"],
      },
    },
    {
      field: "turnover_status_name",
      headerName: "Turnover status",
      filter: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Furnished", "Semi-Furnished", "Unknown"],
      },
    },
    {
      field: "city_name",
      headerName: "City",
      filter: false,
      editable: false,
    },
    {
      field: "current_price",
      headerName: "Current price",
      sortable: true,
      filter: false,
      editable: false,
      cellEditor: NumericEditor,
      valueFormatter: (params) => {
        return params?.data?.current_price ? formatToPhp(params.value) : "";
      },
    },
  ]);

  const gridRef = useRef<AgGridReactType<IPropertyData>>(null);

  const getRowId = useMemo(() => {
    return (data: GetRowIdParams<IPropertyData>) => data.data.id;
  }, []);

  const gridOptions: GridOptions<IPropertyData> = {
    rowData: rowData,
    getRowId: getRowId,
    editType: "fullRow",
    pagination: true,
    onRowValueChanged: (event) => {
      if (event.type === "rowValueChanged") {
        console.log(event.data);
      }
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
      <div className="ag-theme-alpine " style={{ width: "100%", height: 500 }}>
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

export default AgGridTable;
