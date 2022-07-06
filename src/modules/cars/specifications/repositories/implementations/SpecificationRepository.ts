/* eslint-disable no-use-before-define */
import { getRepository, Repository } from 'typeorm';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationsRepository';

class SpecificationRepository implements ISpecificationRepository {
  private respository: Repository<Specification>;
  constructor() {
    this.respository = getRepository(Specification);
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<void> {
    const specification = await this.respository.create({ name, description });

    await this.respository.save(specification);
  }

  public async findByName(name: string): Promise<Specification | null> {
    const specification = await this.respository.findOne({
      where: {
        name,
      },
    });
    return specification || null;
  }
}

export { SpecificationRepository };
