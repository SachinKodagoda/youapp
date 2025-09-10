import { clsx } from "clsx";
import { FieldError } from "react-hook-form";

/**
 * Get input class names based on error state
 */
export const getInputClassName = (
  baseClassName: string,
  error?: FieldError,
  errorClassName = "border border-red-500",
): string => {
  return clsx(baseClassName, error && errorClassName);
};

/**
 * Format form error message for display
 */
export const formatErrorMessage = (error?: FieldError): string | undefined => {
  return error?.message;
};

/**
 * Check if field has error
 */
export const hasError = (error?: FieldError): boolean => {
  return !!error;
};
