import { ApiProperty } from '@nestjs/swagger';
import { Cat } from '../entities/cat.entity';

export class CatDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ description: 'The name of the Cat' })
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  breed: string;

  constructor(cat: Cat) {
    this.id = cat.id;
    this.name = cat.name;
    this.age = cat.age;
    this.breed = cat.breed;
  }
}
