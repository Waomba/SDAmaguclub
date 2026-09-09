// Ported from config/constants.php. In the PHP app these were server-side
// path/URL builders; here the API base is the only thing the client needs —
// the rest (upload paths etc.) are resolved by the API and returned as full URLs.
export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const ROLE_MEMBER = 'member';
export const ROLE_ADMIN = 'admin';
export const ROLE_SUPER_ADMIN = 'super_admin';

export const APP_NAME = 'MAGU SDA CLUB';
export const DEFAULT_TIMEZONE = 'Africa/Blantyre'; // Malawi (CAT, UTC+2)
