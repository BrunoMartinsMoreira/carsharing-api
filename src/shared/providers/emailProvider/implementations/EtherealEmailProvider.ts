import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import { IEmailProvider, ISendMail } from '../IEmailProvider';

@injectable()
class EtherealEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.log(err));
  }

  async sendMail({ to, subject, body }: ISendMail): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Carsharing <noreplay@carsharing.com.br>',
      subject,
      text: body,
      html: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URl: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealEmailProvider };
