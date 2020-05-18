import React, { useState } from "react";
import {
  ValidationResult,
  getIsEmptyError,
  getIsAlphanumericError,
} from "./validator";

export const SomeForm = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState<ValidationResult>(
    undefined
  );

  const setUsernameWithValidation = (value: string) => {
    setUsername(value);

    const isEmptyError = getIsEmptyError(value, "username");
    setUsernameError(isEmptyError);
    const isAlphanumeric = getIsAlphanumericError(value, "username");
    setUsernameError(isAlphanumeric);
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameError) {
      console.error("validation errors");
      return;
    }

    // eslint-disable-next-line no-console
    console.log("form submitted", { username });
  };

  return (
    <form onSubmit={handleSumbit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsernameWithValidation(e.currentTarget.value)}
      />
      {usernameError && (
        <span style={{ color: "red" }}>{usernameError.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
