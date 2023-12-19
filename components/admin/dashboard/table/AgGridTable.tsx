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
import type { Property } from "@/interface/property";
import { usePropertyListingHook } from "@/hooks/usePropertyListingHook";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

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

const AgGridTable = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { data: properties, isLoading: propertiesIsLoading } =
    usePropertyListingHook({
      page_number:
        parseInt(
          (searchParams.has("page_number") &&
            searchParams.get("page_number")?.toString()) ||
            "1",
        ) || 1,
    });

  const totalPages = useMemo(() => {
    return properties?.totalPages ? properties?.totalPages : 1;
  }, [properties]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [columnDefs, setColumnDefs] = useState<ColDef<Property>[]>([
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

  const gridRef = useRef<AgGridReactType<Property>>(null);

  const getRowId = useMemo(() => {
    return (data: GetRowIdParams<Property>) => data.data.property_id;
  }, []);

  const gridOptions: GridOptions<Property> = {
    getRowId: getRowId,
    editType: "fullRow",
    suppressPaginationPanel: true,
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

  const onNextPageHandler = () => {
    const currentPageNumber = searchParams.has("page_number")
      ? parseInt(searchParams.get("page_number") as string)
      : 1;
    const nextPageNumber = currentPageNumber + 1;

    const totalPages = properties?.totalPages;

    const newSearchParams = new URLSearchParams(window.location.search);

    newSearchParams.set("page_number", nextPageNumber.toString());

    if (currentPageNumber !== totalPages) {
      router.replace(
        `${window.location.pathname}?${newSearchParams.toString()}`,
        {
          scroll: false,
        },
      );
    }
  };

  const onPreviousPageHandler = () => {
    const currentPageNumber = searchParams.has("page_number")
      ? parseInt(searchParams.get("page_number") as string)
      : 1;
    const previousPageNumber =
      currentPageNumber > 1 ? currentPageNumber - 1 : 1;

    const newSearchParams = new URLSearchParams(window.location.search);

    newSearchParams.set("page_number", previousPageNumber.toString());

    router.replace(
      `${window.location.pathname}?${newSearchParams.toString()}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="ag-theme-alpine " style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={!propertiesIsLoading ? properties?.properties : []}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <div
        className={cn(
          "col-span-4 mt-4 flex w-full items-center justify-end gap-4",
        )}
      >
        <div className="text-sm text-neutral-500">
          <p>
            Page {searchParams.get("page_number")?.toString() || "1"} of{" "}
            {propertiesIsLoading ? "Loading..." : properties?.totalPages || 1}
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onPreviousPageHandler}>
            Back
          </Button>
          <Button variant="outline" onClick={onNextPageHandler}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgGridTable;
