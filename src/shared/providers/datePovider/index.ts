import { container } from 'tsyringe';
import { IDateProvider } from './IDateProvider';
import { DayJsProvider } from './implementations/DayjsProvider';

container.registerSingleton<IDateProvider>('DayjsProvider', DayJsProvider);
