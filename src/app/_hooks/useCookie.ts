// see https://medium.com/@sergeyleschev/react-custom-hook-usecookie-ca8a7a6e89d7
import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useCookie<Type>(
  name: string,
  initialValue: Type,
  defaultValue: Type,
  options: Cookies.CookieAttributes
): [Type, (newValue: Type) => void] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      setValue(JSON.parse(cookie));
    } else {
      Cookies.set(name, JSON.stringify(defaultValue), options);
    }
  }, [name, defaultValue, options]);

  const updateCookie = useCallback(
    (newValue: Type) => {
      Cookies.set(name, JSON.stringify(newValue), options);
      setValue(newValue);
    },
    [name, options]
  );

  return [value, updateCookie];
}
