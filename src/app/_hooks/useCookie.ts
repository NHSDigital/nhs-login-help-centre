// see https://medium.com/@sergeyleschev/react-custom-hook-usecookie-ca8a7a6e89d7
import { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';

var cookies = Cookies.withConverter({
  write: (value: any) => encodeURIComponent(JSON.stringify(value)),
  read: (value: string) => {
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch {
      return null;
    }
  },
});

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
    const cookie = cookies.get(name);
    if (cookie) {
      setValue(cookie);
    } else {
      cookies.set(name, defaultValue, optionsWithDomain(options));
      setValue(defaultValue);
    }
  }, [name, defaultValue, options]);

  const updateCookie = useCallback(
    (newValue: Type) => {
      cookies.set(name, newValue, optionsWithDomain(options));
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
