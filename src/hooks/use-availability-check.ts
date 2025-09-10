import { RegisterFormData } from "@/types/schema";
import { useCallback, useState } from "react";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { useDebounce } from "./use-debounce";

export function useAvailabilityCheck(
  clearErrors: UseFormClearErrors<RegisterFormData>,
  setError: UseFormSetError<RegisterFormData>,
) {
  const [loadingStates, setLoadingStates] = useState<{
    email: boolean;
    username: boolean;
  }>({
    email: false,
    username: false,
  });
  const checkAvailability = useCallback(
    async (field: "email" | "username", value: string) => {
      if (!value || value.length < 3) {
        setLoadingStates((prev) => ({ ...prev, [field]: false }));
        return;
      }

      setLoadingStates((prev) => ({ ...prev, [field]: true }));

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
      } catch {
        // handle errors if needed
      } finally {
        setLoadingStates((prev) => ({ ...prev, [field]: false }));
      }
    },
    [clearErrors, setError],
  );

  const debouncedCheckAvailability = useDebounce(checkAvailability, 500);

  return {
    checkAvailability,
    debouncedCheckAvailability,
    loadingStates,
  };
}
