"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {Label} from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {gettingData} from "../../utils/api";
import { useQuery } from "react-query";
import {useDepends} from "../../utils/store";

type typeComboboxDemo = {
  id?: string,
  className?: string, 
  placeholder?: string, 
  disabled?: boolean,
  rows: Array<Record<string, string>>,
  valuesOrURLRequestValues?: string,
  dependsOn?: string | boolean,
}

function ComboboxDemo({id, className, placeholder, disabled, rows, dependsOn}: typeComboboxDemo) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  if (dependsOn === "type"){
    const {newTypee} = useDepends();

    React.useEffect(() => {
      value && rows.forEach(row => {
        (row.value === value) && newTypee(row.id, row.value)
       })
    }, [value]);
  }
    
  // const valueRef = React.useRef(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${className} justify-between`}
          // ref={valueRef}
        >
          {value ? rows.find(row => row.value === value)?.label
                 : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`text-wrap px-5 py-0 ${className}`} >
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>Список выбора не задан</CommandEmpty>
            <CommandGroup>
              {rows && rows.map((row, i) => {
                return (<CommandItem
                  key={`${row.value}-${i}`}
                  value={row.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === row.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {row.label}
                </CommandItem>
              )})}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
};

type typeCombBox = {
  className?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  rowsToChoose?: Array<string>;
  id?: string;
  valuesOrURLRequestValues?: Array<string> | string;
  style?: {};
  dependsOn?: string | boolean;
  // tabWithInfo: string;x
};

function getRows(url: string){
  //{isLoading, error, data} 
  const { data} = useQuery(["dataType", url],
                                            () => gettingData(url)
                                            .then(res => res)
                                            .catch((err) => err));
  //@ts-ignore
  return data?.map(row => {return {id: row.id, value: row.type, label: row.display_type}})
}


export default function CombBox({className, title, placeholder = "-", disabled, id, valuesOrURLRequestValues, style, dependsOn}: typeCombBox){

    if(dependsOn === "type"){
      const {typeId} = useDepends();
      if(typeId){
          const url = `/crm/devices/ajax?action=getVendorsByTypeId&type_id=${typeId}`;
          console.log(url);
          // const {data} = useQuery(['dataVendor', url], () => gettingData(url).then(res => res));
          // console.log(data)
        }
        // console.log(typee);
      }
    if(dependsOn === "vendor"){
        const {vendor} = useDepends();
        console.log(vendor);
    }

    const rows = typeof(valuesOrURLRequestValues) === "object" 
                 ? valuesOrURLRequestValues?.map(row => {return {value: row, label: row}})
                 : getRows(valuesOrURLRequestValues!);

    return <div className="flex flex-col gap-2" style={style}>
        <Label htmlFor="email">{title}</Label>
        <ComboboxDemo id={id} className={`w-full ${className}`} placeholder={placeholder} disabled={disabled} rows={rows} dependsOn={dependsOn}/>
      </div>
}