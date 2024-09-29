"use client";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    username: "",
  });
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous messages
    setErrorMessage("");

    try {
      const response = await axios.post("/api/auth/signup", user);
      setSuccessMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      const message = error.response?.data?.error || "Signup failed. Please try again.";
      setErrorMessage(message);
      console.log("Signup failed", message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-20">
      {successMessage && (
        <div className="mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4" role="alert">
          <span className="font-bold">Success</span> {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4" role="alert">
          <span className="font-bold">Danger</span> {errorMessage}
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  value={user.fname}
                  onChange={(e) => setUser({ ...user, fname: e.target.value })}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  value={user.lname}
                  onChange={(e) => setUser({ ...user, lname: e.target.value })}
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">UserName</Label>
              <Input
                id="username"
                type="text"
                placeholder="User Name"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}