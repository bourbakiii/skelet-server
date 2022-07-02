export const parseBearer = (token = '') => {
    return token.substring('Bearer '.length, token.length) || null;
}

