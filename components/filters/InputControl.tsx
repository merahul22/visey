import React from 'react';
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl } from "@/components/ui/form";

type Option = {
  id: string;
  label: string;
};

type InputControlProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  option: Option;
  type: "checkbox" | "radio";
};

export function InputControl<TFieldValues extends FieldValues>({
  field,
  option,
  type
}: InputControlProps<TFieldValues>) {
  switch (type) {
    case "checkbox":
      return (
        <FormControl>
          <Checkbox
            checked={(field.value as string[])?.includes(option.id)}
            onCheckedChange={(checked) => {
              const currentValue = field.value as string[];
              return checked
                ? field.onChange([...currentValue, option.id])
                : field.onChange(currentValue.filter((value) => value !== option.id));
            }}
          />
        </FormControl>
      );

    case "radio":
      return (
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value as string}>
            <RadioGroupItem value={option.id} />
          </RadioGroup>
        </FormControl>
      );

    default:
      return null;
  }
}