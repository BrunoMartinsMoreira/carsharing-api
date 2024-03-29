import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import { IEmailProvider, ISendMail } from '../IEmailProvider';

@injectable()
export class AwsSesEmailProvider implements IEmailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({ to, subject, variables, path }: ISendMail): Promise<void> {
    const emailTemplateFile = fs.readFileSync(path).toString('utf-8');
    const emailTemplateParsed = handlebars.compile(emailTemplateFile);
    const emailTemplateHTML = emailTemplateParsed(variables);

    await this.client.sendMail({
      to,
      from: 'Carsharing <noreplay@carsharing.com.br>',
      subject,
      html: emailTemplateHTML,
    });
  }
}
