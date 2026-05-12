import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { SkinType, SkinTypeDocument } from './schemas/skin-type.schema';
import { ListProductsDto } from './dto/list-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(SkinType.name) private skinTypeModel: Model<SkinTypeDocument>,
  ) {}

  private generateSlug(name: string): string {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/([^0-9a-z-\s])/g, '').replace(/(\s+)/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
  }

  private generateAutoSKU(categoryCode: string, name: string): string {
    const acronym = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').split(' ').filter(w => w.length > 0).map(w => w[0]).join('').toUpperCase();
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${categoryCode.toUpperCase()}-${acronym}${year}-${random}`;
  }

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const category = await this.categoryModel.findById(dto.category).exec();
    if (!category) throw new NotFoundException('Category not found');

    const sku = this.generateAutoSKU(category.code || 'GEN', dto.name);
    const existingProduct = await this.productModel.findOne({ sku }).exec();
    if (existingProduct) throw new BadRequestException('SKU already exists, please try again');

    const slug = this.generateSlug(dto.name);
    const variants = dto.variants?.map((v) => ({
      ...v,
      profit: (v.priceSell || 0) - (v.priceImport || 0),
    })) || [];

    return new this.productModel({ ...dto, sku, slug, variants }).save();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findOne({ _id: id, isDeleted: false })
      .populate('category', 'name code slug')
      .populate('skinTypes', 'name code').exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findOnePublic(id: string) {
    const product = await this.productModel.findOne({ _id: id, isDeleted: false, isActive: true })
      .select('-variants.priceImport -variants.profit')
      .populate('category', 'name code slug')
      .populate('skinTypes', 'name code').exec();
    if (!product) throw new NotFoundException('Product not found or hidden');
    return product;
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    const existing = await this.productModel.findById(id).exec();
    if (!existing || existing.isDeleted) throw new NotFoundException('Product not found');

    if (dto.name && dto.name !== existing.name) (dto as any).slug = this.generateSlug(dto.name);
    
    if (dto.variants) {
      dto.variants = dto.variants.map((v: any) => ({ 
        ...v, 
        profit: (v.priceSell || 0) - (v.priceImport || 0) 
      }));
    }

    const updated = await this.productModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!updated) throw new NotFoundException('Update failed');
    return updated;
  }

  async findAll(query: ListProductsDto) {
    const { search, category, skinTypes, minPrice, maxPrice, page = 1, limit = 10 } = query;
    const filters: any = { isDeleted: false, isActive: true };

    if (search) filters.$text = { $search: search };
    if (category) filters.category = new Types.ObjectId(category);
    
    if (skinTypes && skinTypes.length > 0) {
      const ids = Array.isArray(skinTypes) ? skinTypes : [skinTypes];
      filters.skinTypes = { $in: ids.map(id => new Types.ObjectId(id)) };
    }

    if (minPrice || maxPrice) {
      filters['variants.priceSell'] = {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.productModel.find(filters)
        .select('-variants.priceImport -variants.profit')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('category', 'name code slug')
        .populate('skinTypes', 'name code').exec(),
      this.productModel.countDocuments(filters),
    ]);
    
    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async remove(id: string) {
    const res = await this.productModel.findByIdAndUpdate(id, { isDeleted: true });
    if (!res) throw new NotFoundException('Product not found');
    return { message: 'Product moved to trash' };
  }

  async toggleStatus(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    product.isActive = !product.isActive;
    return product.save();
  }
}