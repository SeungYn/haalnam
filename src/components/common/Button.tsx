import { ButtonHTMLAttributes } from 'react';

type Prop = ButtonHTMLAttributes<HTMLButtonElement> & {
  className: string;
};

export function Button({ className, ...props }: Prop) {
  return <button className={className} {...props} />;
}
