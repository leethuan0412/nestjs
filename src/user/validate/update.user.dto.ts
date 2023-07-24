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

export class ChangePassword {
  @IsString()
  old_password?: string;

  @IsString()
  new_password?: string;

  @IsString()
  confirmPassword?: string;
}
