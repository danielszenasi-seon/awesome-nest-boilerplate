import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../entities/cat.entity';
import { CatsService } from './cats.service';

const maineCoon = 'Maine Coon';
const CatArray = [
  {
    name: 'name #1',
    age: 1,
    breed: maineCoon,
  },
  {
    name: 'name #2',
    age: 2,
    breed: maineCoon,
  },
];

const oneCat = {
  name: 'name #1',
  age: 1,
  breed: maineCoon,
};

describe('CatService', () => {
  let service: CatsService;
  let repository: Repository<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn().mockResolvedValue(CatArray),
            findOneBy: jest.fn().mockResolvedValue(oneCat),
            save: jest.fn().mockResolvedValue(oneCat),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    repository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a cat', () => {
      expect(
        service.create({
          name: 'name #1',
          age: 1,
          breed: maineCoon,
        }),
      ).resolves.toEqual({
        name: 'name #1',
        age: 1,
        breed: maineCoon,
      });
    });
  });

  describe('findAll()', () => {
    it('should return an array of cats', async () => {
      const Cats = await service.findAll();
      expect(Cats).toEqual(CatArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single cat', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne('1')).resolves.toEqual(oneCat);
      expect(repoSpy).toBeCalledWith({ id: '1' });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });
});
