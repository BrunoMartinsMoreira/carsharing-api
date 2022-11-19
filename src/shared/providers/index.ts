import { container } from 'tsyringe';
import { IDateProvider } from './datePovider/IDateProvider';
import { DayJsProvider } from './datePovider/implementations/DayjsProvider';
import { IEmailProvider } from './emailProvider/IEmailProvider';
import { EtherealEmailProvider } from './emailProvider/implementations/EtherealEmailProvider';
import { AwsS3StorageProvider } from './StorageProvider/implementations/AwsS3StorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DayjsProvider', DayJsProvider);

container.registerInstance<IEmailProvider>(
  'EtherealEmailProvider',
  new EtherealEmailProvider(),
);

container.registerSingleton<IStorageProvider>(
  'LocalStorageProvider',
  LocalStorageProvider,
);

container.registerSingleton<IStorageProvider>(
  'AwsS3StorageProvider',
  AwsS3StorageProvider,
);
