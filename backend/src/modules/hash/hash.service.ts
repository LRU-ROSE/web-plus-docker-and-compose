import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export default class HashService {
  async getHash(password: string): Promise<string> {
    return hash(password, await genSalt(10));
  }

  compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
