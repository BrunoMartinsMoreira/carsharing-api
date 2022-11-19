import { IUserResponseDto } from '../dtos/IUserResponseDto';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDto({
    id,
    email,
    name,
    avatar_url,
    driver_licence,
  }: User): IUserResponseDto {
    const avatarUrl = `${process.env.S3_BUCKET_URL}/avatars/${avatar_url}`;

    return {
      id,
      email,
      name,
      avatar_url: avatarUrl,
      driver_licence,
    };
  }
}
