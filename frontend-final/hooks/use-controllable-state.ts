import * as React from "react";

interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
}

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>): [T | undefined, (next: T | ((prev: T) => T)) => void] {
  const [uncontrolledProp, setUncontrolledProp] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const handleChange = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      if (isControlled) {
        const setter = next as (prevState: T) => T;
        const val = typeof next === "function" ? setter(prop as T) : next;
        if (val !== prop) {
          onChange(val);
        }
      } else {
        setUncontrolledProp((prev) => {
          const setter = next as (prevState: T) => T;
          const val = typeof next === "function" ? setter(prev as T) : next;
          if (val !== prev) {
            onChange(val);
          }
          return val;
        });
      }
    },
    [isControlled, prop, onChange]
  );

  return [value, handleChange];
}
