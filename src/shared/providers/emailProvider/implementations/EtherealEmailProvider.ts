import fs from 'fs';
import handlebars from 'handlebars';
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

  async sendMail({ to, subject, variables, path }: ISendMail): Promise<void> {
    const emailTemplateFile = fs.readFileSync(path).toString('utf-8');
    const emailTemplateParsed = handlebars.compile(emailTemplateFile);
    const emailTemplateHTML = emailTemplateParsed(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Carsharing <noreplay@carsharing.com.br>',
      subject,
      html: emailTemplateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URl: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealEmailProvider };
