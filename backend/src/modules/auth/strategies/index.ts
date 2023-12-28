import JwtStrategy from './jwt.strategy.js';
import LocalStrategy from './local.strategy.js';

export const STRATEGIES = [LocalStrategy, JwtStrategy];
