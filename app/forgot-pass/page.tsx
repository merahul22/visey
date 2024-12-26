import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ForgotPasswordForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm ">
        <CardHeader className="flex-col flex gap-4 max-w-100 mx-auto justify-center">
          <CardTitle className="flex flex-col gap-3 mx-auto  text-center">
            Forgot Password
             <p className="text-sm mb-4 text-neutral-500">
            Enter your registered Email or Phone Number to reset your password
          </p></CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mx-auto">
         
          <form>
            <div className="mb-4">
              <Label htmlFor="emailOrPhone" className="text-md text-neutral-500">
                Email/Phone Number
              </Label>
              <Input
                type="text"
                id="emailOrPhone"
                placeholder="Enter your email or phone number"
              />
            </div>
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 rounded-lg">
              Submit
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href="/register" className="text-pink-600 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
