interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  toUtc(date: Date): string;
  dateNow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBEfore(startDate: Date, endDate: Date): boolean;
}

export { IDateProvider };
