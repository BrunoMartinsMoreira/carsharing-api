import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserToken } from '../../infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class MockUsersTokenRepository implements IUsersTokensRepository {
  tokens: UserToken[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.tokens.push(token);

    return token;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const token = this.tokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );

    return token;
  }

  async deleteById(id: string): Promise<void> {
    const token = this.tokens.find(tk => tk.id === id);
    this.tokens.splice(this.tokens.indexOf(token));
  }

  async findByRefreshToken(token: string): Promise<UserToken> {
    const data = this.tokens.find(tk => tk.refresh_token === token);

    return data;
  }
}

export { MockUsersTokenRepository };
