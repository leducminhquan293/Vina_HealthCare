import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsIn } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user', // Thêm role mặc định nếu cần
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  age: number;

  @IsArray({ message: 'Role phải là một mảng' })
  @IsIn(['admin', 'staff', 'user'], { each: true, message: 'Mỗi role phải là admin, staff hoặc user' })
  roles: string[];

  _id: any;

}

export const UserSchema = SchemaFactory.createForClass(User);