import './../../styles/variables.css';
import './button.css';
import cn from "classnames";
import { IButtonProps } from "./button.interfaces";

export function Button({ className, children, ...props }: IButtonProps): JSX.Element {
  return (
    <button className={cn("button", className)} {...props}>
      {children}
    </button>
  )
}
