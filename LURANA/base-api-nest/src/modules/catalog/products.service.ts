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

  /**
   * Tạo sản phẩm mới
   */
  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const existingProduct = await this.productModel.findOne({ sku: createProductDto.sku }).exec();
    if (existingProduct) {
      throw new BadRequestException('Mã SKU này đã tồn tại trên hệ thống');
    }

    // Tạo slug SEO-friendly
    const slug = createProductDto.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now();

    const variants = createProductDto.variants?.map((v) => ({
      ...v,
      profit: (v.priceSell || 0) - (v.priceImport || 0),
    })) || [];

    const newProduct = new this.productModel({
      ...createProductDto,
      slug,
      variants,
    });

    return newProduct.save();
  }

  /**
   * Xem chi tiết đầy đủ (Cho Admin - Thấy giá nhập)
   */
  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel
      .findOne({ _id: id, isDeleted: false })
      .populate('category', 'name slug')
      .exec();
      
    if (!product) throw new NotFoundException('Không tìm thấy sản phẩm');
    return product;
  }

  /**
   * Xem chi tiết công khai (Cho Khách - Ẩn giá nhập)
   */
  async findOnePublic(id: string) {
    const product = await this.productModel
      .findOne({ _id: id, isDeleted: false, isActive: true })
      .select('-variants.priceImport') // Ẩn trường nhạy cảm
      .populate('category', 'name slug')
      .exec();
      
    if (!product) throw new NotFoundException('Sản phẩm không tồn tại hoặc đã bị ẩn');
    return product;
  }

  /**
   * Cập nhật thông tin sản phẩm
   */
  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
    const existingProduct = await this.productModel.findById(id).exec();
    if (!existingProduct || existingProduct.isDeleted) {
      throw new NotFoundException('Sản phẩm không tồn tại hoặc đã bị xóa');
    }

    if (updateProductDto.name && updateProductDto.name !== existingProduct.name) {
      // Logic tạo slug tương tự như khi create
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

  /**
   * Lấy danh sách sản phẩm (Client)
   */
  async findAll(query: ListProductsDto) {
    const { search, category, skinTypes, minPrice, maxPrice, page = 1, limit = 10 } = query;
    const filters: any = { isDeleted: false, isActive: true };

    if (search) filters.$text = { $search: search };
    if (category) filters.category = new Types.ObjectId(category);
    
    // Nếu skinTypes là mảng string đơn giản, dùng $in trực tiếp
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
        .select('-variants.priceImport') // Ẩn giá nhập ở danh sách luôn cho chắc
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('category', 'name slug')
        .exec(),
      this.productModel.countDocuments(filters),
    ]);

    return { data, total, page, lastPage: Math.ceil(total / limit) };
  }

  /**
   * Xóa mềm sản phẩm (Đổi tên từ softDelete -> remove)
   */
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