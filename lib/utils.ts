import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToPaisa(amount: number) {
  return Math.round(amount * 100);
}

export function convertAmountFromPaisa(amount: number) {
  return amount / 100;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function calcPercentangeChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export function fillMissingDates(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return [];
  }
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const transactionsByDate = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });
  return transactionsByDate;
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);
  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }
  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      period.to,
      "LLL dd, y"
    )}`;
  }
  return format(period.from, "LLL dd, y");
}

export function formatPercentageChange(
  value: number,
  options: {
    addPrefix?: boolean;
  } = {
    addPrefix: true,
  }
) {
  const result = new Intl.NumberFormat("en-IN", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value / 100);
  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }
  return result;
}
