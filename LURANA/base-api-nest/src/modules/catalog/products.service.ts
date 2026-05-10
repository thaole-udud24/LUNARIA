import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ListProductsDto } from './dto/list-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();
  }

  private generateAutoSKU(name: string): string {
    const nameAcronym = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .split(' ')
      .filter(w => w.length > 0)
      .map(w => w[0])
      .join('')
      .toUpperCase();
    
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `LRN-${nameAcronym}${year}-${random}`;
  }

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const sku = createProductDto.sku || this.generateAutoSKU(createProductDto.name);
    
    const existingProduct = await this.productModel.findOne({ sku }).exec();
    if (existingProduct) {
      throw new BadRequestException('Mã SKU này đã tồn tại trên hệ thống');
    }

    const slug = this.generateSlug(createProductDto.name);
    const variants = createProductDto.variants?.map((v) => ({
      ...v,
      profit: (v.priceSell || 0) - (v.priceImport || 0),
    })) || [];

    const newProduct = new this.productModel({
      ...createProductDto,
      sku,
      slug,
      variants,
    });

    return newProduct.save();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel
      .findOne({ _id: id, isDeleted: false })
      .populate('category', 'name slug')
      .exec();
      
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  async findOnePublic(id: string) {
    const product = await this.productModel
      .findOne({ _id: id, isDeleted: false, isActive: true })
      .select('-variants.priceImport -variants.profit')
      .populate('category', 'name slug')
      .exec();
      
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại hoặc đã bị ẩn');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct || existingProduct.isDeleted) {
      throw new NotFoundException('Sản phẩm không tồn tại hoặc đã bị xóa');
    }

    if (updateProductDto.name && updateProductDto.name !== existingProduct.name) {
      (updateProductDto as any).slug = this.generateSlug(updateProductDto.name);
    }

    if (updateProductDto.variants) {
      updateProductDto.variants = updateProductDto.variants.map((v: any) => ({
        ...v,
        profit: (v.priceSell || 0) - (v.priceImport || 0),
      }));
    }

    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      { $set: updateProductDto },
      { new: true },
    ).exec();

    if (!updatedProduct) throw new NotFoundException('Cập nhật thất bại');
    return updatedProduct;
  }

  async findAll(query: ListProductsDto) {
    const { search, category, skinTypes, minPrice, maxPrice, page = 1, limit = 10 } = query;
    const filters: any = { isDeleted: false, isActive: true };

    if (search) filters.$text = { $search: search };
    if (category) filters.category = new Types.ObjectId(category);
    
    if (skinTypes && skinTypes.length > 0) {
      filters.skinTypes = { $in: skinTypes };
    }

    if (minPrice || maxPrice) {
      filters['variants.priceSell'] = {
        ...(minPrice !== undefined && { $gte: minPrice }),
        ...(maxPrice !== undefined && { $lte: maxPrice }),
      };
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.productModel
        .find(filters)
        .select('-variants.priceImport -variants.profit')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('category', 'name slug')
        .exec(),
      this.productModel.countDocuments(filters),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.productModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại để xóa');
    return { message: 'Đã chuyển sản phẩm vào thùng rác thành công' };
  }

  async toggleStatus(id: string): Promise<ProductDocument> {
    const product = await this.findOne(id);
    product.isActive = !product.isActive;
    return product.save();
  }
}