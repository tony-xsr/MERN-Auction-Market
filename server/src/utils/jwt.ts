import jwt, { SignOptions } from 'jsonwebtoken';
export const signJwt = (
  payload: Object,
  keyName: 'JWT_ACCESS_TOKEN_PRIVATE_KEY' | 'JWT_REFRESH_TOKEN_PRIVATE_KEY',
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(
    process.env[keyName]!,
    'base64'
  ).toString('ascii').replace(/\\n/gm, '\n');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'JWT_ACCESS_TOKEN_PUBLIC_KEY' | 'JWT_REFRESH_TOKEN_PUBLIC_KEY'
): T | null => {
  try {

    const publicKey = Buffer.from(
      process.env[keyName]!,
      'base64'
    ).toString('ascii').replace(/\\n/gm, '\n');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
