import * as bcrypt from 'bcrypt';

// make random number
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// has password bcrypt
export const hash = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
