import { PartialType } from '@nestjs/swagger';

import CreateUserDto from './create-users.dto.js';

export default class UpdateUsersDto extends PartialType(CreateUserDto) {}
