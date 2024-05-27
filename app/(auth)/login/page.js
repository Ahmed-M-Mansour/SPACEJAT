"use client";
import Input from "@/app/_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { useState } from "react";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useLocalStorage("email", "");
  const [password, setPassword] = useLocalStorage("password", "");
  const [error, setError] = useState("");
  const [users, setUsers] = useLocalStorage("users", []);

  function handleEmailValue(item) {
    setEmail(item);
  }

  function handlePasswordValue(item) {
    setPassword(item);
  }

  function handleLogin(e) {
    e.preventDefault();
    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
      setError("");
      const updatedUser = { ...user, isLoggedIn: true };
      const index = users.findIndex((u) => u.email === email);
      if (index !== -1) {
        const updatedUsers = [...users];
        updatedUsers[index] = updatedUser;
        setUsers(updatedUsers);
      }
      router.push("/");
    } else {
      setError("Incorrect email or password");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 space-y-4 bg-signInBg shadow-custom">
        <h1 className="text-3xl font-medium px-3">Sign in</h1>
        {error && (
          <p className="text-errorColor bg-errorBg mx-3 py-3 rounded-lg  text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            inputName="Email"
            inputType="email"
            inputPlaceholder="Enter your email"
            inputValue={email}
            handleinputValue={handleEmailValue}
            inputStyles={"w-80"}
          />
          <Input
            inputName="Password"
            inputType="password"
            inputPlaceholder="Enter your password"
            inputValue={password}
            handleinputValue={handlePasswordValue}
          />
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="rounded-lg text-white text-sm w-72 h-12 self-center"
              style={{ backgroundColor: "#26B7CD" }}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="w-72 mx-auto flex justify-between items-center">
          <span className="flex-1 border"></span>
          <span className="flex-2 px-2 text-inputPlceholderColor">OR</span>
          <span className="flex-1 border"></span>
        </div>

        <div className="w-72 mx-auto flex justify-center items-center space-x-1">
          <span className="text-brandColor text-sm font-normal">
            Don’t have an account?
          </span>
          <Link href="/register">
            <span className="text-signInSubTitleColor text-sm font-normal decoration-inherit underline">
              Signup
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
