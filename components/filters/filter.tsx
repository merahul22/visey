"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";

import { homePageFilterSection } from "./filterOptions";
import { homePageFilterSchema } from "./filterSchemas";
import { InputControl } from "./InputControl";

export function Filter() {
  const form = useForm<z.infer<typeof homePageFilterSchema>>({
    resolver: zodResolver(homePageFilterSchema),
    defaultValues: {
      categories: [],
      ratings: "",
      promotions: [],
      locations: [],
    },
  });

  function onSubmit(data: z.infer<typeof homePageFilterSchema>) {
    console.log({ data });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-72 mx-auto border rounded-xl p-4"
      >
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <Separator />

        <Accordion
          type="multiple"
          defaultValue={homePageFilterSection.map((f) => f.name)}
          className="-space-y-3"
        >
          {homePageFilterSection.map((section) => (
            <AccordionItem key={section.name} value={section.name}>
              <AccordionTrigger className="text-neutrals-700">
                {section.label}
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name={section.name}
                  render={() => (
                    <FormItem className="space-y-2">
                      {section.options.map((option) => (
                        <FormField
                          key={option.id}
                          control={form.control}
                          name={section.name}
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <InputControl
                                  key={option.id}
                                  field={field}
                                  option={option}
                                  type={section.type}
                                />
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-end ml-auto gap-x-2">
          <Button variant="outline" size="sm" className="mt-4" type="submit">
            Reset
          </Button>
          <Button size="sm" className="mt-4" type="submit">
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}
