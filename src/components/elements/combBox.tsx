"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {Label} from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type typeComboboxDemo = {
  className?: string, 
  placeholder?: string, 
  disabled?: boolean,
  rows?: Array<Record<string, string>>
}

function ComboboxDemo({className, placeholder, disabled, rows}: typeComboboxDemo) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${className} justify-between`}
        >
          {placeholder}
          {/* {value
            ? rows.find(row => row.value === value)?.label
            : placeholder} */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`text-wrap px-5 py-0 ${className}`} >
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>Список выбора не задан</CommandEmpty>
            <CommandGroup>
              {rows && rows.map(row => (
                <CommandItem
                  key={row.value}
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
              ))}
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
  urlToGetRows?: string;
  style?: {};
};

export default function CombBox({className, title, placeholder = "-", disabled, rowsToChoose, id, urlToGetRows, style}: typeCombBox){
    const rows = rowsToChoose && rowsToChoose?.map(row => {return {value: row, label: row}});
    //Сделать функционал для  urlToGetRows
    return <div id={id} className="flex flex-col gap-2" style={style}>
        <Label htmlFor="email">{title}</Label>
        <ComboboxDemo className={`w-full ${className}`} placeholder={placeholder} disabled={disabled} rows={rows}/>
      </div>
}