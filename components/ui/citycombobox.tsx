"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn, createSearchParams } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useReducer } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { ISelect } from "@/interface/select";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface comboboxProps {
  onCityChange?: (val: string) => void;
}

type Action =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "SET_VALUE"; payload: string };

interface State {
  search: string;
  open: boolean;
  value: string;
}

const initialState: State = {
  search: "",
  open: false,
  value: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_OPEN":
      return { ...state, open: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

async function getCities(data: { city: string }): Promise<ISelect[]> {
  const searchParams = createSearchParams(data);

  let url = "/api/properties/cities";

  if (searchParams?.size) {
    url = url + "?" + searchParams.toString();
  }

  const response = await fetch(url);

  if (!response.ok) throw new Error("Something went wrong querying cities");

  return await response.json();
}

const PLACEHOLDER = "Property city";

export const CityCombobox: React.FC<comboboxProps> = ({ onCityChange }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedSearchTerm = useDebounce(state.search, 300);

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["cities", debouncedSearchTerm],
    queryFn: () => getCities({ city: debouncedSearchTerm }),
  });

  useEffect(() => {
    if (onCityChange) onCityChange(state.value);
  }, [state.value, onCityChange]);

  return (
    <Popover
      open={state.open}
      onOpenChange={(open) => dispatch({ type: "SET_OPEN", payload: open })}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={state.open}
          className={cn(
            "w-full justify-between",
            !state.value && "text-muted-foreground",
          )}
        >
          {state.value && data
            ? data.find((ct) => ct.value === state.value)?.label || PLACEHOLDER
            : PLACEHOLDER}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={state.search}
            onValueChange={(search) =>
              dispatch({ type: "SET_SEARCH", payload: search })
            }
            className="h-9"
            placeholder={PLACEHOLDER}
          />
          {!isFetching && <CommandEmpty>No item found.</CommandEmpty>}
          <CommandGroup className="min-h-10 max-h-40 overflow-y-auto">
            {data?.map((ct) => (
              <CommandItem
                key={ct.value}
                onSelect={(_currentValue) => {
                  dispatch({ type: "SET_VALUE", payload: ct.value });
                  dispatch({ type: "SET_OPEN", payload: false });
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    state.value === ct.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {ct.label}
              </CommandItem>
            ))}
            {isLoading && <p className="p-2 text-center text-xs">Loading...</p>}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
