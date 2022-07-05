import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoriesUseCase';

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req.body;

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
      await importCategoryUseCase.execute(file);

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: 'Could not upload file' });
    }
  }
}

export { ImportCategoryController };
