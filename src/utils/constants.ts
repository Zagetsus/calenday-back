import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

/**
 * Autenticação
 */
export const JWT_SECRET = process.env.JWT_SECRET;
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Level Permissions
 */
export const SALON = 1;
export const MANAGER = 2;
export const EMPLOYEE = 3;
export const CUSTOMER = 4;
