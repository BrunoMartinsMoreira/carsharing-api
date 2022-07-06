interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_licence: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
