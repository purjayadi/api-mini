import * as bcrypt from 'bcrypt';

// make random number
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// has password bcrypt
export const hash = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export function paginateResponse(
  data: any,
  page: number,
  limit: number,
  error: string[],
  status: number,
  optional?: any,
) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / limit);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;
  return {
    status: status,
    error: error,
    data: [...result],
    meta: {
      totalItems: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    },
    optional: optional,
  };
}
