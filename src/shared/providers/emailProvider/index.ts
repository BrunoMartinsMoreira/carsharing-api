import { container } from 'tsyringe';
import { IEmailProvider } from './IEmailProvider';
import { EtherealEmailProvider } from './implementations/EtherealEmailProvider';

container.registerInstance<IEmailProvider>(
  'EtherealEmailProvider',
  new EtherealEmailProvider(),
);