import EyeClosed from "@/assets/images/eye-closed.svg";
import EyeOpened from "@/assets/images/eye-opened.svg";
import clsx from "clsx";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ className, error, label, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1">
        {label && <label className="px-2 text-sm text-white/80">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={clsx(
              "select-wrapper h-[51px] w-full rounded-lg bg-white/10 px-5 pr-12 text-sm outline-none placeholder:text-white/40",
              error && "border border-red-500",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              src={showPassword ? EyeOpened : EyeClosed}
              width={20}
              height={17}
              alt={showPassword ? "Hide password" : "Show password"}
              className="cursor-pointer"
            />
          </button>
        </div>
        {error && <span className="px-2 text-xs text-red-400">{error.message}</span>}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
