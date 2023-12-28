import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

export default class UpdateWishlistDto {
  @IsString()
  @Length(1, 250)
  @IsOptional()
  name: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  image: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  itemsId: number[];

  @IsString()
  @MaxLength(1500)
  @IsOptional()
  description: string;
}
