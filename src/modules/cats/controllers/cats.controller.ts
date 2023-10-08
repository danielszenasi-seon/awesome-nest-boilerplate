import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { CatsService } from '../services/cats.service';
import { CatDto } from '../dtos/cat.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateCatDto): Promise<CatDto> {
    const cat = await this.catsService.create(createUserDto);
    return new CatDto(cat);
  }

  @Get()
  async findAll(): Promise<CatDto[]> {
    const cats = await this.catsService.findAll();
    return cats.map((cat) => new CatDto(cat));
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The found record',
    type: CatDto,
  })
  async findOne(@Param('id') id: string): Promise<CatDto> {
    const cat = await this.catsService.findOne(id);
    return new CatDto(cat);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }
}
