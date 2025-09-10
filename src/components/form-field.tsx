import Loader from "@/components/elements/loader";
import clsx from "clsx";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
  isLoading?: boolean;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, error, isLoading, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="px-2 text-sm text-white/80">{label}</label>}
        <div className="relative w-full">
          <input
            ref={ref}
            className={clsx(
              "select-wrapper h-[51px] w-full rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40",
              error && "border",
              isLoading && "pr-12",
              className,
            )}
            {...props}
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader size={16} />
            </div>
          )}
        </div>
        {error && <span className="px-2 text-xs text-red-400">{error.message}</span>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
