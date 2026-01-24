import classNames from 'classnames';

export const createCn = (styles: CSSModuleClasses): ((...arr: string[]) => ReturnType<typeof classNames>) => {
  return (...arr: string[]) => {
    const classes = arr.map((v) => styles[v]);
    return classNames(...classes);
  };
};
