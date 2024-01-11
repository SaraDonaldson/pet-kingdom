"use client"; 
import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface Props {
  clickFunction: () => void;
  label: string;
  link?: string;
  customClassNames?: string;
}

const Button: React.FC<Props> = ({
  clickFunction,
  label,
  link,
  customClassNames,
}) => {
  const buttonClass = customClassNames
    ? `${styles.button} ${customClassNames}`
    : styles.button;

  if (link) {
    return (
      <Link href={link} className={buttonClass}>
        {label}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={clickFunction}>
      {label}
    </button>
  );
};

export default Button;
