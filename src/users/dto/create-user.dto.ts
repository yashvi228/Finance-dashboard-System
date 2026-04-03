import { IsEmail, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsIn(['viewer', 'analyst', 'admin'])
  role?: string = 'viewer';

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string = 'active';
}