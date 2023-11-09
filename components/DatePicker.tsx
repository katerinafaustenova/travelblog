import { useState } from "react";

export function DatePicker() {
  const [value, setValue] = useState("");

  console.log(value);
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
