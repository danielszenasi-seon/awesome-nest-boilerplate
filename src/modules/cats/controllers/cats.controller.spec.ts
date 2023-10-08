import { Test, TestingModule } from '@nestjs/testing';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { CatsController } from './cats.controller';
import { CatsService } from '../services/cats.service';

const maineCoon = 'Maine Coon';
const createCatDto: CreateCatDto = {
  name: 'name #1',
  age: 1,
  breed: maineCoon,
};

describe('CatsController', () => {
  let catsController: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: CatsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((cat: CreateCatDto) =>
                Promise.resolve({ id: '1', ...cat }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                id: '1',
                name: 'name #1',
                age: 1,
                breed: maineCoon,
              },
              {
                id: '2',
                name: 'name #2',
                age: 2,
                breed: maineCoon,
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'name #1',
                age: 1,
                breed: maineCoon,
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
    catsService = app.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a cat', () => {
      catsController.create(createCatDto);
      expect(catsController.create(createCatDto)).resolves.toEqual({
        id: '1',
        ...createCatDto,
      });
      expect(catsService.create).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('findAll()', () => {
    it('should find all cats ', () => {
      catsController.findAll();
      expect(catsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a cat', () => {
      expect(catsController.findOne('1')).resolves.toEqual({
        name: 'name #1',
        age: 1,
        breed: maineCoon,
        id: '1',
      });
      expect(catsService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the cat', () => {
      catsController.remove('2');
      expect(catsService.remove).toHaveBeenCalled();
    });
  });
});
