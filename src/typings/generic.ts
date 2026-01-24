export type Keys<T> = keyof T;
export type Values<T> = T[Keys<T>];
export type LiryNumber = bigint | number;
export type OneOrMany<T> = T | T[];
