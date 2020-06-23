import { useState } from "react";

export function UseForm(initialState: any) {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target;
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  return [values, handleInputChange];
}
