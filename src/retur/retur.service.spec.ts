import { Test, TestingModule } from '@nestjs/testing';
import { ReturService } from './retur.service';

describe('ReturService', () => {
  let service: ReturService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturService],
    }).compile();

    service = module.get<ReturService>(ReturService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
