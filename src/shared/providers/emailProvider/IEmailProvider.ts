interface ISendMail {
  to: string;
  subject: string;
  variables: {
    name: string;
    link: string;
  };
  path: string;
}

interface IEmailProvider {
  sendMail({ to, subject, variables, path }: ISendMail): Promise<void>;
}

export { IEmailProvider, ISendMail };
