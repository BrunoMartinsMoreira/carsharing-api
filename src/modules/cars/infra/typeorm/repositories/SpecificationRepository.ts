/* eslint-disable no-use-before-define */
import { getRepository, Repository } from 'typeorm';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationRepository implements ISpecificationRepository {
  private respository: Repository<Specification>;
  constructor() {
    this.respository = getRepository(Specification);
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.respository.create({ name, description });

    await this.respository.save(specification);

    return specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.respository.findOne({
      where: {
        name,
      },
    });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.respository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationRepository };
