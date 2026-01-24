import { GOMOKU_POINT_STATUS } from '@/constants/gomoku';
import { isBetween } from '@/utils/check';
import { z } from 'zod/v4';

export const gomokuPointPropsSchema = z
  .object({
    minIndex: z.number().positive().int(),
    maxIndex: z.number().positive().int(),
    x: z.number().positive().int(),
    y: z.number().positive().int(),
    status: z.enum(Object.values(GOMOKU_POINT_STATUS))
  })
  .refine(
    (data) => {
      const { minIndex, maxIndex, x, y } = data;
      // 先判断 minIndex <= maxIndex，再用 isBetween 校验 x/y
      return minIndex <= maxIndex && isBetween({ min: minIndex, max: maxIndex, num: [x, y] });
    },
    {
      // 自定义错误提示（可选，便于调试）
      message: 'minIndex 不能大于 maxIndex，且 x/y 必须在 [minIndex, maxIndex] 区间内',
      // 指定错误归属的路径（可选）
      path: ['rangeValidation']
    }
  );

export type GomokuPointProps = z.infer<typeof gomokuPointPropsSchema>;

export const checkGomokuPointPropsValid = (props: GomokuPointProps): boolean => {
  return gomokuPointPropsSchema.safeParse(props).success;
};
