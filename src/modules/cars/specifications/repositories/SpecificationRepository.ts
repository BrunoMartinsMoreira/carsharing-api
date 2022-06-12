import { Specification } from '../models/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from './ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(spec => spec.name === name);
    return specification;
  }
}

export { SpecificationRepository };
