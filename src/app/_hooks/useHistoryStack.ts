import { useState, useEffect, useCallback } from 'react';

const HISTORY_STACK_KEY = 'history-stack';

export type HistoryEntry = {
  title: string;
  url: string;
};

export default function useHistoryStack(
  initialValue?: HistoryEntry[]
): [() => HistoryEntry | void] {
  const [value, setValue] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const currentPage = getCurrentPage();
    if (initialValue) {
      setStack([...initialValue, currentPage]);
      return;
    }
    const stringValue = localStorage.getItem(HISTORY_STACK_KEY);
    if (!stringValue) {
      setStack([currentPage]);
      return;
    }
    let stack = JSON.parse(stringValue);
    if (!stack || !isValidStack(stack)) {
      stack = [];
    }
    if (hasGoneBack(stack, currentPage)) {
      setStack(stack.slice(0, -1));
    } else if (isNotAlreadyInStack(stack, currentPage)) {
      setStack([...stack, currentPage]);
    } else {
      setStack(stack);
    }
  }, []);

  const setStack = useCallback((newValue: HistoryEntry[]) => {
    localStorage.setItem(HISTORY_STACK_KEY, JSON.stringify(newValue));
    setValue(newValue);
  }, []);

  const getBackLink = useCallback(() => {
    return value.findLast((link) => link.url !== getCurrentPage().url);
  }, [value]);

  return [getBackLink];
}

function isValidStack(stack: HistoryEntry[]) {
  try {
    return stack.every((entry) => entry.title && entry.url);
  } catch {
    return false;
  }
}

function isNotAlreadyInStack(stack: HistoryEntry[], currentPage: { url: string }) {
  const [lastEntry] = stack.slice(-1);
  return !lastEntry || lastEntry.url !== currentPage.url;
}

function hasGoneBack(stack: HistoryEntry[], currentPage: { url: string }) {
  const [secondLastEntry] = stack.slice(-2, -1);
  return secondLastEntry && secondLastEntry.url === currentPage.url;
}

function getCurrentPage(): HistoryEntry {
  return {
    title: document.title,
    url: window.location.href,
  };
}
