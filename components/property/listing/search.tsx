"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { BsFilter } from "react-icons-all-files/bs/BsFilter";
import { BsMap } from "react-icons-all-files/bs/BsMap";
import { createSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const SearchSchema = z.object({
  text_search: z.string(),
});

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      text_search: searchParams.has("text_search")
        ? (searchParams.get("text_search") as string)
        : "",
    },
  });

  function onSubmit(data: z.infer<typeof SearchSchema>) {
    const searchParams = createSearchParams(data);

    if (searchParams && searchParams.size) {
      router.replace(window.location.pathname + "?" + searchParams.toString(), {
        scroll: false,
      });
    }
  }

  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-1/3 space-y-8"
        >
          <FormField
            control={form.control}
            name="text_search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Add this div with a relative position */}
                  <div className="relative border rounded-lg">
                    <Input
                      className="py-6 placeholder:text-base"
                      placeholder="Search property"
                      {...field}
                    />
                    {/* Position your button absolutely within the parent div */}
                    <Button
                      type="submit"
                      className="absolute right-0 flex items-center px-3 mr-1 text-base transform -translate-y-1/2 top-1/2"
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button className="py-6 text-base" onClick={() => setOpen(true)}>
        Filters <BsFilter className="w-6 h-6 ml-1" />
      </Button>
      <Button className="py-6 text-base">
        Map <BsMap className="w-6 h-6 ml-1" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
