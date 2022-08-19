interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  toUtc(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
