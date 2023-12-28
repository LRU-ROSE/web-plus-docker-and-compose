import { IsString } from 'class-validator';

export default class FindUserDto {
  @IsString()
  query: string;
}
