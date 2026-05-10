import { IsNotEmpty, IsString, IsArray, IsNumber, IsOptional, IsBoolean, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductVariantDto {
  @IsNotEmpty() @IsString()
  variantName!: string;

  @IsNotEmpty() @IsNumber() @Min(0)
  priceImport!: number;

  @IsNotEmpty() @IsNumber() @Min(0)
  priceSell!: number;

  @IsNotEmpty() @IsNumber() @Min(0)
  stockQty!: number;

  @IsOptional() @IsNumber() @Min(0)
  stockAlert: number = 0;

  @IsNotEmpty() @IsNumber() @Min(0)
  weight!: number;
}

export class CreateProductDto {
  @IsNotEmpty() @IsString()
  name!: string;

  @IsNotEmpty() @IsString()
  sku!: string;

  @IsNotEmpty() @IsString()
  category!: string; // ID của Category

  @IsOptional() @IsArray() @IsString({ each: true })
  skinTypes: string[] = [];

  @IsNotEmpty() @IsString()
  mainImage!: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  galleryImages: string[] = [];

  @IsOptional() @IsString()
  description: string = '';

  @IsOptional() @IsString()
  detailInfo: string = '';

  @IsOptional() @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants: ProductVariantDto[] = [];

  @IsOptional() @IsBoolean()
  isActive: boolean = true;
}