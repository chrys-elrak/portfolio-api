import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../models/User';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async createUser(body: createUserDto): Promise<User> | never {
        const user = await this.userModel.findOne({username: body.username});
        if (user) {
            throw new ForbiddenException('username aready exist');
        }
        const newUser = this.userModel.create(body);
        return newUser;
    }

    async getUser(filter: Record<string, string>): Promise<User | null>{
        return await this.userModel.findOne(filter);
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