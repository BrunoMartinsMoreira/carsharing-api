import { Specification } from '../../infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationsRepository';

class MockSpecificationsRepository implements ISpecificationRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(s => s.name === name);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(spec =>
      ids.includes(spec.id),
    );

    return specifications;
  }
}

export { MockSpecificationsRepository };
