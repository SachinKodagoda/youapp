import { useState } from "react";

export const useViewToggle = (initialValue = true) => {
  const [isInitialView, setIsInitialView] = useState(initialValue);

  const toggleView = () => {
    setIsInitialView((prev) => !prev);
  };

  return {
    isInitialView,
    toggleView,
  };
};
