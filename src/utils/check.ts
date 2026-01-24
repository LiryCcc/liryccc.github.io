import type { LiryNumber, OneOrMany } from '@/typings/generic';

export type IsBetweenProps<T extends LiryNumber> = {
  min: T;
  max: T;
  num: OneOrMany<T>;
};

/**
 * 判断num是否介于min和max之间，允许等于，不会要求min小于等于max
 */
export const isBetween = <T extends LiryNumber>({ min, max, num }: IsBetweenProps<T>): boolean => {
  const arr = Array.isArray(num) ? num : [num];
  if (arr.some(Number.isNaN)) {
    return false;
  } else if (arr.some((v) => v < min)) {
    return false;
  } else if (arr.some((v) => v > max)) {
    return false;
  } else {
    return true;
  }
};
