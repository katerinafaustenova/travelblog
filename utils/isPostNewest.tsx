import { differenceInCalendarDays } from "date-fns";

export const isPostNewest = (
  posts: any,
  currentId: string,
  currentDate: any,
  numberOfDays: number = 30
) => {
  const isLastTwoPosts = currentId === posts[0].id || currentId === posts[1].id;
  const isLastMonth =
    differenceInCalendarDays(new Date(), new Date(currentDate)) < numberOfDays;
  return isLastMonth && isLastTwoPosts;
};
