import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageDocument } from 'src/common/models/Image';
import {Image} from '../../common/models/Image';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>) {}

    async createImage(files: Express.Multer.File[]): Promise<ImageDocument[]> {
        const images = await this.imageModel.insertMany(files.map(file => ({
            name: file.filename,
            url: `${process.env.HOST}:${process.env.PORT}/public/${file.filename}`,
            meta: file,
        })));
        return images;
    }
}
