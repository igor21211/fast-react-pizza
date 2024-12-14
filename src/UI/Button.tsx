import React from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    to?: string
    type: "primary" | "small" | "secondary"
}

const Button = ({children, disabled, to, type} :ButtonProps):JSX.Element => {
  const base = "bg-yellow-400 uppercase text-sm font-semibold text-stone-800 inline-block rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"

  const styles = {
    primary: base + " py-3 px-4 sm:px-6 sm:py-4",
    small: base + " py-2 md:px-5 md:py-2.5 text-xs",
    secondary: "bg-transparent text-sm border-2 border-stone-300 uppercase font-semibold text-stone-800 inline-block rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 focus:text-stone-800 focus:bg-stone-300 focus:ring-offset-2 py-2.5 px-4 sm:px-6 sm:py-3.5"
  };

  if (to) {
    return <Link to={to} className={styles[type]}>{children}</Link>;
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button