import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../models/User';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async createUser(body): Promise<User | Error> {
        const user = await this.userModel.find({username: body.username});
        if (user) {
            throw new Error("username alerady exist");
        }
        const newUser  = new this.userModel(body);
        await newUser.save();
        return newUser;
    }

    async updateUser(id: string, update): Promise<void> {
        await this.userModel.findByIdAndUpdate(id, update);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById(id);
    }

    async getUsers(): Promise<User[]> {
        return await this.userModel.find();
    }
    
}