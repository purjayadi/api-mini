import { Test, TestingModule } from '@nestjs/testing';
import { ReturController } from './retur.controller';
import { ReturService } from './retur.service';

describe('ReturController', () => {
  let controller: ReturController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturController],
      providers: [ReturService],
    }).compile();

    controller = module.get<ReturController>(ReturController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
