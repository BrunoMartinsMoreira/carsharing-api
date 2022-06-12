import { Request, Response } from 'express';
import { SpecificationRepository } from '../repositories/SpecificationRepository';
import { CreateSpecificationService } from '../services/CreateSpecificationService';

class SpecificationsController {
  private createSpecsService;
  constructor() {
    const specificationRepository = new SpecificationRepository();
    this.createSpecsService = new CreateSpecificationService(
      specificationRepository,
    );
  }

  create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      this.createSpecsService.execute({ name, description });
      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { SpecificationsController };
