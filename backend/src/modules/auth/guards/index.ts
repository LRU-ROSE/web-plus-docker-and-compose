import JwtAuthGuard from './jwt-auth.guard.js';
import LocalAuthGuard from './local-auth.guard.js';

const GUARDS = [LocalAuthGuard, JwtAuthGuard];

export default GUARDS;
