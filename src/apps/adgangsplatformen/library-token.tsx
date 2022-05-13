import React, { ChangeEvent, useCallback, useState } from "react";
import { useQueryClient } from "react-query";
import { setToken, TOKEN_LIBRARY_KEY } from "../../core/token";

const LibraryToken: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [shouldShowSuccessMessage, showSuccessMessage] = useState(false);
  const queryClient = useQueryClient();

  const setInputValueHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value: token }
      } = event;
      setInputValue(token);
    },
    [setInputValue]
  );
  const setLibraryTokenHandler = useCallback(() => {
    window.sessionStorage.setItem(TOKEN_LIBRARY_KEY, inputValue);
    setToken(TOKEN_LIBRARY_KEY, inputValue);
    showSuccessMessage(true);
    queryClient.clear();
  }, [queryClient, inputValue]);

  return (
    <>
      <input value={inputValue} onChange={setInputValueHandler} size={80} />
      <button type="submit" onClick={setLibraryTokenHandler}>
        Save
      </button>
      {shouldShowSuccessMessage && <p>The token was saved</p>}
    </>
  );
};

export default LibraryToken;
