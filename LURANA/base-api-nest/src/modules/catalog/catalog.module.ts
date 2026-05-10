import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { SkinType, SkinTypeSchema } from './schemas/skin-type.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsAdminController } from './products.admin.controller';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesAdminController } from './categories.admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: SkinType.name, schema: SkinTypeSchema },
    ]),
  ],
  controllers: [
    ProductsController,
    ProductsAdminController,
    CategoriesController,
    CategoriesAdminController,
  ],
  providers: [ProductsService, CategoriesService],
  exports: [ProductsService, CategoriesService],
})
export class CatalogModule {}