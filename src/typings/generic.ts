export type Keys<T> = keyof T;
export type Values<T> = T[Keys<T>];
export type LiryNumber = bigint | number;
export type OneOrMany<T> = T | T[];

export type FixedLengthArray<N extends number, ItemType, Acc extends ItemType[] = []> = Acc['length'] extends N
  ? Acc
  : FixedLengthArray<N, ItemType, [...Acc, ItemType]>;
