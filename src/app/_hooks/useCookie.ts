// see https://medium.com/@sergeyleschev/react-custom-hook-usecookie-ca8a7a6e89d7
import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function useCookie<Type>({
  name,
  initialValue,
  defaultValue,
  options,
}: {
  name: string;
  initialValue: Type;
  defaultValue: Type;
  options: Cookies.CookieAttributes;
}): [Type, (newValue: Type) => void] {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const cookie = Cookies.get(name);
    if (cookie && unstringified(cookie)) {
      setValue(unstringified(cookie));
    } else {
      Cookies.set(name, stringified(defaultValue), optionsWithDomain(options));
      setValue(defaultValue);
    }
  }, [name, defaultValue, options]);

  const updateCookie = useCallback(
    (newValue: Type) => {
      Cookies.set(name, stringified(newValue), optionsWithDomain(options));
      setValue(newValue);
    },
    [name, options]
  );

  return [value, updateCookie];
}

export type CookiePreferences = { hasSeenBanner: boolean; hasAcceptedOptionalCookies: boolean };
export const cookiePreferencesCookie = {
  name: 'cookiePreference',
  initialValue: { hasSeenBanner: true, hasAcceptedOptionalCookies: false },
  defaultValue: { hasSeenBanner: false, hasAcceptedOptionalCookies: false },
  options: { expires: 365 },
};
export const acceptAllCookies = { hasSeenBanner: true, hasAcceptedOptionalCookies: true };

const optionsWithDomain = (options: Cookies.CookieAttributes) => ({
  ...options,
  domain: window.location.hostname.replace('help', ''),
});

const stringified = (value: any) => encodeURIComponent(JSON.stringify(value));
function unstringified(value: string) {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}
