import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'tsyringe';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

@injectable()
class DayJsProvider implements IDateProvider {
  compareIfBEfore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUtc = this.toUtc(startDate);
    const endDateUtc = this.toUtc(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'hours');
  }

  toUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const startDateUtc = this.toUtc(startDate);
    const endDateUtc = this.toUtc(endDate);

    return dayjs(endDateUtc).diff(startDateUtc, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}

export { DayJsProvider };
