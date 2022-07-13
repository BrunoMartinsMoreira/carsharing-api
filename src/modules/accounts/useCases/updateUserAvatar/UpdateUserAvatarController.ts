import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const avatar_file = req.file ? req.file.filename : '';

      const updateUserAvatarUseCase = container.resolve(
        UpdateUserAvatarUseCase,
      );
      await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export { UpdateUserAvatarController };
