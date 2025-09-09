import { differenceInYears } from "date-fns";

export const calculateAge = (birthday: string) => {
  return differenceInYears(new Date(), new Date(birthday));
};
