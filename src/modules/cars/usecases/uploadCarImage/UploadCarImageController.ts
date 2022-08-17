import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const images = req.files as IFiles[];
    const { car_id } = req.params;

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_names = images.map(img => img.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_names,
    });

    return res.status(201).send();
  }
}

export { UploadCarImageController };
