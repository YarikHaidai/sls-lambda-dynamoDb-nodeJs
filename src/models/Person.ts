import {IsNumber, IsOptional, IsString} from 'class-validator';

export class Person {
  @IsOptional()
  public personId?: string | null;

  @IsString()
  public name!: string;

  @IsString()
  public surname!: string;

  @IsNumber()
  public age!: number;

  @IsOptional()
  public createdAt?: string;

  @IsOptional()
  public updatedAt?: string;
}
