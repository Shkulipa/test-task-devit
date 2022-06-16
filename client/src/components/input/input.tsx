import './input.css';
import cn from "classnames";
import { IInputProps } from "./input.interfaces";

export function Input({ className, value, onChange, ...props }: IInputProps): JSX.Element {  
  return (
    <input className={cn("input", className)} value={value} onChange={onChange} {...props} />
  )
}
