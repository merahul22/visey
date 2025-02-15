import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string | undefined;
  data: { value: string }[];
  placeHolder: string;
  noResultText: string;
  sizeLarge?: number;
  sizeSmall?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function Combobox({
  value,
  data,
  placeHolder,
  noResultText,
  onChange,
  sizeLarge = 540,
  sizeSmall = 320,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="overflow-scroll" asChild>
        <Button
          disabled={disabled}
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg px-4 font-normal"
        >
          {value ? data.find((el) => el.value === value)?.value : placeHolder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`lg:w-[${sizeLarge}px] w-[${sizeSmall}px] p-0`}
      >
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty>{noResultText}</CommandEmpty>
            <CommandGroup>
              {data.map((el) => (
                <CommandItem
                  key={el.value}
                  value={el.value}
                  onSelect={() => {
                    onChange(el.value);
                    setOpen(false);
                  }}
                >
                  {el.value}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === el.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
