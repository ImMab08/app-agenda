import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className = "", children, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 focus:ring-slate-500",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
