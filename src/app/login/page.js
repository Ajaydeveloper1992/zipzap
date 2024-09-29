"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description = "A simple login form with email and password. The submit button says 'Sign in'.";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    identifier: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      setSuccessMessage(""); // Clear previous messages
      setErrorMessage("");
      
      const response = await axios.post("/api/auth/login", user);
      setSuccessMessage("Login successful! Redirecting...");
      toast({ description: "Login successful! Redirecting..." });
      router.push("/admin");
    } catch (error) {
      console.log("Login failed", error);
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      setErrorMessage(`Login failed: ${errorMessage}`);
      toast({ description: `Login failed: ${errorMessage}` });
    } finally {
      setLoading(false);
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
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email or username below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="identifier">Email or Username</Label>
          <Input
            id="identifier"
            type="text"
            value={user.identifier}
            onChange={(e) => setUser({ ...user, identifier: e.target.value })}
            placeholder="Email or Username"
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
            placeholder="Password"
            required
          />
        </div>
        <div className="grid gap-2">
          <Button onClick={onLogin} className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm">
          You have no account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          You forgot your password?{" "}
          <Link href="/login/forgotpassword" className="text-blue-600 hover:underline">
            Forgot Password
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}