import { IntervalUnit } from "../../generated/prisma/enums";

export const calculateEndDate = (startDate: Date, unit: IntervalUnit, count: number): Date => {
  const endDate = new Date(startDate);
  
  switch (unit) {
    case IntervalUnit.day:
      endDate.setDate(endDate.getDate() + count);
      break;
    case IntervalUnit.week:
      endDate.setDate(endDate.getDate() + (count * 7));
      break;
    case IntervalUnit.month:
      endDate.setMonth(endDate.getMonth() + count);
      break;
    case IntervalUnit.year:
      endDate.setFullYear(endDate.getFullYear() + count);
      break;
  }
  
  return endDate;
};