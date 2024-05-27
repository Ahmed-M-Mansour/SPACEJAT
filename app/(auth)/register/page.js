"use client";
import Input from "@/app/_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { useState } from "react";
import Error from "@/app/_components/Error";

function RigesterPage() {
  const router = useRouter();
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {
    name: "",
    email: "",
    password: "",
    products: [],
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  function validateName(name) {
    if (!name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name cannot be empty.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    return true;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid format." }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    return true;
  }

  function validatePassword(password) {
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Must be 8 or more characters.",
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    return true;
  }

  function handleNameValue(item) {
    validateName(item);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      name: item,
    }));
  }

  function handleEmailValue(item) {
    validateEmail(item);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      email: item,
    }));
  }

  function handlePasswordValue(item) {
    validatePassword(item);
    setCurrentUser((prevUser) => ({
      ...prevUser,
      password: item,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isNameValid = validateName(currentUser.name);
    const isEmailValid = validateEmail(currentUser.email);
    const isPasswordValid = validatePassword(currentUser.password);

    if (isNameValid && isEmailValid && isPasswordValid) {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, currentUser];
        return updatedUsers;
      });
      setCurrentUser({ name: "", email: "", password: "", products: [] });
      router.push("/login");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 space-y-4 bg-signInBg shadow-custom">
        <h1 className="text-3xl font-medium px-3">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              inputName="name"
              inputType="text"
              inputPlaceholder="Enter your Name"
              inputValue={currentUser.name}
              handleinputValue={handleNameValue}
              inputStyles={"w-80"}
            />
            {errors.name && <Error error={errors.name} />}
          </div>
          <div>
            <Input
              inputName="email"
              inputType="email"
              inputPlaceholder="Enter your Email"
              inputValue={currentUser.email}
              handleinputValue={handleEmailValue}
              inputStyles={"w-80"}
            />
            {errors.email && <Error error={errors.email} />}
          </div>
          <div>
            <Input
              inputName="password"
              inputType="password"
              inputPlaceholder="Enter your password"
              inputValue={currentUser.password}
              handleinputValue={handlePasswordValue}
              inputStyles={"w-80"}
            />
            {errors.password && <Error error={errors.password} />}
          </div>

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
            Already have an account?
          </span>
          <Link href="/login">
            <span className="text-signInSubTitleColor text-sm font-normal decoration-inherit underline">
              Signin
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RigesterPage;
