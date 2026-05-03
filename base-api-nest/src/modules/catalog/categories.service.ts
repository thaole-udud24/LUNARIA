import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private categoryModel: Model<CategoryDocument>) {}

  async findAll() {
    return this.categoryModel.find({ isDeleted: false }).exec();
  }

  async create(name: string) {
    const slug = name.toLowerCase().replace(/ /g, '-'); // Đơn giản hóa tạo slug
    const category = new this.categoryModel({ name, slug });
    return category.save();
  }

  async update(id: string, name: string) {
    const slug = name.toLowerCase().replace(/ /g, '-');
    return this.categoryModel.findByIdAndUpdate(id, { name, slug }, { new: true });
  }

  async delete(id: string) {
    return this.categoryModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}