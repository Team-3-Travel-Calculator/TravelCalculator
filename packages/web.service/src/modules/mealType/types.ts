export enum MealTypes {
  Lunch = 1,
  Dinner = 2,
}

export type MealTypeTime = {
  readonly type: MealTypes;
  readonly spentTime: string;
};
