"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import arrow from "@/public/angle-down.png";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";
import { useState } from "react";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useLocalStorage("users", []);
  const router = useRouter();

  const loggedInUser = users.find((user) => user.isLoggedIn);
  const userName = loggedInUser ? loggedInUser.name : "";

  const handleArrowClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    const updatedUsers = users.map((user) =>
      user.isLoggedIn ? { ...user, isLoggedIn: false } : user
    );
    setUsers(updatedUsers);
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center p-6 border-b-2">
      <div className="flex items-center cursor-pointer">
        <Image src={logo} alt="Logo" />
        <h2 className="text-2xl font-semibold px-3 rubik text-brandColor">
          SPACEJAT
        </h2>
      </div>
      <div className="flex items-center">
        <span className="text-base px-3 text-brandColor">Hello {userName}</span>
        <Image
          src={arrow}
          alt="Arrow"
          className="cursor-pointer"
          onClick={handleArrowClick}
        />
      </div>
      {isModalOpen && (
        <div className="absolute top-16 right-5 bg-white shadow-lg rounded-md w-34 h-10 px-8 py-2">
          <span className="text-sm cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        </div>
      )}{" "}
    </header>
  );
}

export default Header;
