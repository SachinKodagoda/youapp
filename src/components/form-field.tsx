import clsx from "clsx";
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  label?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="px-2 text-sm text-white/80">{label}</label>}
        <input
          ref={ref}
          className={clsx(
            "select-wrapper h-[51px] rounded-lg bg-white/10 px-5 text-sm outline-none placeholder:text-white/40",
            error && "border border-red-500",
            className,
          )}
          {...props}
        />
        {error && <span className="px-2 text-xs text-red-400">{error.message}</span>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
