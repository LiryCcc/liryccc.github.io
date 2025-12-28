import type { ReactNode } from 'react';

interface OnlyChilrenProps {
  children: ReactNode;
}

type OnlyChildrenFC = (props: OnlyChilrenProps) => ReactNode;

export type { OnlyChildrenFC, OnlyChilrenProps };
