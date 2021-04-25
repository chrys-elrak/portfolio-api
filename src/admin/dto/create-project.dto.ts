import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @Optional()
  subtitle?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  at: Date;
  
  @IsNotEmpty()
  @IsString()
  url: string;
}
