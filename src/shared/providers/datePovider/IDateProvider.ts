interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  toUtc(date: Date): string;
  dateNow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
}

export { IDateProvider };
