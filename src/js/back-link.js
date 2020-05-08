(function() {
  const HISTORY_STACK_KEY = 'history-stack';
  const RETURN_LINK_KEY = 'return-link';

  const currentPage = {
    title: document.title,
    url: window.location.href,
  };

  function isValidStack(stack) {
    try {
      return stack.every(entry => entry.title && entry.url);
    } catch {
      return false;
    }
  }

  function getHistoryStack() {
    try {
      const stack = JSON.parse(localStorage.getItem(HISTORY_STACK_KEY));
      return isValidStack(stack) ? stack : [];
    } catch {
      return [];
    }
  }

  function setHistoryStack(stack) {
    const validStack = isValidStack(stack);

    if (validStack) {
      localStorage.setItem(HISTORY_STACK_KEY, JSON.stringify(stack));
    } else {
      console.error('Invalid stack:', stack);
    }
  }

  function pushToHistoryStack(entry) {
    const stack = getHistoryStack();
    const [lastEntry] = stack.slice(-1);

    if (!lastEntry || lastEntry.url !== entry.url) {
      setHistoryStack(stack.concat(entry));
    }
  }

  function renderBackLink() {
    const [backLink] = getHistoryStack().slice(-2, -1);
    const backLinkElement = document.querySelector('.nhsuk-breadcrumb__backlink');

    if (backLink && backLinkElement) {
      backLinkElement.setAttribute('href', backLink.url);
      backLinkElement.innerText = `Back to ${backLink.title}`;
    }
  }

  window.addEventListener('load', () => {
    const returnLink = getParam(RETURN_LINK_KEY);
    const stack = getHistoryStack();
    const [secondToLastPage = {}] = stack.slice(-2, -1);

    if (secondToLastPage.url === currentPage.url) {
      setHistoryStack(stack.slice(0, -2));
    }

    if (returnLink) {
      setHistoryStack([{ title: 'Back to App', url: returnLink }]);
    }

    pushToHistoryStack(currentPage);
    renderBackLink();
  });
})();
