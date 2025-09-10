import { RegisterFormData } from "@/types/schema";
import { useCallback } from "react";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { useDebounce } from "./use-debounce";

export function useAvailabilityCheck(
  clearErrors: UseFormClearErrors<RegisterFormData>,
  setError: UseFormSetError<RegisterFormData>,
) {
  const checkAvailability = useCallback(
    async (field: "email" | "username", value: string) => {
      if (!value || value.length < 3) return;

      try {
        const response = await fetch("/api/check-availability", {
          body: JSON.stringify({ [field]: value }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const data = await response.json();

        if (data.success && !data.available) {
          setError(field, { message: data.message, type: "manual" });
        } else if (data.success && data.available) {
          clearErrors(field);
        }
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error("Availability check error:", error);
      }
    },
    [clearErrors, setError],
  );

  const debouncedCheckAvailability = useDebounce(checkAvailability, 500);

  return { checkAvailability, debouncedCheckAvailability };
}
