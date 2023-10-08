import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { Cat } from '../entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepository: Repository<Cat>,
    @InjectPinoLogger(CatsService.name)
    private readonly logger: PinoLogger,
  ) {}

  create(createUserDto: CreateCatDto): Promise<Cat> {
    this.logger.debug('foo %s %o', 'bar', { baz: 'qux' });
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
