import { IsOptional, IsString } from 'class-validator';

export class UpdateInfor {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  filename?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
