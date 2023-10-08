import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
  ) {}

  create(createUserDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createUserDto.name;
    cat.age = createUserDto.age;
    cat.breed = createUserDto.breed;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: string): Promise<Cat> {
    return this.catsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
