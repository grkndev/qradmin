import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateRenewalDate = (lastRenew?: Date) => {
  const renewalDate = lastRenew ? new Date(lastRenew) : new Date();
  const renewalYear = lastRenew
    ? renewalDate.getFullYear() + 1
    : new Date().getFullYear();
  renewalDate.setFullYear(renewalYear);
  return renewalDate;
};
