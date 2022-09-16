interface ISendMail {
  to: string;
  subject: string;
  body: string;
}

interface IEmailProvider {
  sendMail({ to, subject, body }: ISendMail): Promise<void>;
}

export { IEmailProvider, ISendMail };
