"use client";
// import { getCookie } from '@/lib/functions/cookies/getCookie';
// import { removeCookie } from '@/lib/functions/cookies/removeCookie';
import { cookies } from "next/headers";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";
import styles from "./Navbar.module.css";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

function Navbar() {
const router = useRouter();
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const [isAdmin, setIsAdmin] = useState<boolean>(false);
const pathname = usePathname();

  function logOut() {
    if (typeof window !== "undefined") {
      // removeCookie('loggedIn');
      localStorage.clear();
      setIsLoggedIn(false);
      if (pathname === "/") {
        router.refresh();
      } else {
        router.push("/");
      }
    }
  }

  async function checkLoggedIn() {
    console.log("trying");
    // if (typeof window !== "undefined") {
    const foundUser = localStorage.getItem("user");
    if (foundUser) {
      setIsLoggedIn(true);
      const parsedUser = await JSON.parse(foundUser);
      if (parsedUser.role !== "user") {
        setIsAdmin(true);
        // setTimeoutActive(false);
      }
    }
    // } else {
    //   setTimeout(checkLoggedIn, 300)
    // }
  }

  useEffect(() => {
    //@ts-ignore
    window.addEventListener("storage", checkLoggedIn());
    //@ts-ignore
    return () => window.removeEventListener("storage", checkLoggedIn());
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>LOGO</div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
        <AiOutlineSearch size="1.5em" />
        </div>
        {/* Buttons */}
        {isLoggedIn && (
          <div className=" space-x-4">
            {isAdmin && (
              <button
                onClick={() =>
                  router.push(pathname.includes("admin") ? "/" : "admin")
                }
                className="border-2 border-white bg-southPeach hover:shadow-md transition-all duration-300 px-4 py-2 rounded  hover:bg-opacity-80"
              >
                {pathname.includes("admin") ? "User" : "Admin"} View
              </button>
            )}
            <button
              onClick={logOut}
              className="border-2 border-white bg-southPeach hover:shadow-md transition-all px-4 py-2 rounded  hover:bg-opacity-80"
            >
              Log Out
            </button>
          </div>
        )}
        <div className={styles.navItems}>
          <CgProfile size="1.5em" className={styles.icon} />
          <IoMdHeartEmpty size="1.5em" className={styles.icon} />
          <AiOutlineShoppingCart size="1.5em" className={styles.icon} />
        </div>
    </nav>
  );

}
export default Navbar;
