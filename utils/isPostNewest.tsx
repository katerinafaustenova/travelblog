import { differenceInCalendarDays } from "date-fns";

export const isPostNewest = (
  firstPostId: string,
  currentId: string,
  currentDate: any,
  numberOfDays: number = 30
) => {
  return (
    differenceInCalendarDays(new Date(), new Date(currentDate)) <
      numberOfDays && currentId === firstPostId
  );
};
