"use client";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

const Login = () => {
  const form = useForm();

  const onSubmit = () => {
    console.log("submitted");
  };

  return (
    <Card className="mx-auto w-fit shadow-none">
      <CardContent className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-emerald-500">MyTreehouse</h1>
            <h2 className="mt-4 text-sm font-semibold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <Form {...form}>
            <form
              name="loginForm"
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-6 rounded-md shadow-sm"
            >
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(e) => field.onChange(e)}
                            />
                            <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Remember me
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-emerald-500 hover:text-emerald-600"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-center text-sm leading-6 ">
            Not a member?{" "}
            <a href="#" className="font-semibold underline">
              Click here to create an account
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Login;
