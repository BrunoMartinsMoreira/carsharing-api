import { SpecificationRepository } from '../../repositories/SpecificationRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specsRepository = SpecificationRepository.getInstace();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specsRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
