import { Controller, Get } from '@nestjs/common';
import { SkinTypesService } from './skin-types.service';

@Controller('skin-types')
export class SkinTypesController {
  constructor(private readonly skinTypesService: SkinTypesService) {}

  @Get()
  findAll() {
    // API công khai để khách hàng lấy danh sách loại da (cho bộ lọc search)
    return this.skinTypesService.findAll();
  }
}