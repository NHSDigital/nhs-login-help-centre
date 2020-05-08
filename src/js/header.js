(function() {
  const toggleMenuButton = document.getElementById('toggle-menu');
  const closeMenuButton = document.getElementById('close-menu');
  const menuElement = document.getElementById('header-navigation');

  const toggleSearchButton = document.getElementById('toggle-search');
  const closeSearchButton = document.getElementById('close-search');
  const searchElement = document.getElementById('wrap-search');

  toggleMenuButton.addEventListener('click', () => {
    menuElement.classList.toggle('js-show');
    toggleMenuButton.classList.toggle('is-active');
    searchElement.classList.remove('js-show');
    toggleSearchButton.classList.remove('is-active');
  });

  closeMenuButton.addEventListener('click', () => {
    menuElement.classList.remove('js-show');
    toggleMenuButton.classList.remove('is-active');
  });

  toggleSearchButton.addEventListener('click', () => {
    searchElement.classList.toggle('js-show');
    toggleSearchButton.classList.toggle('is-active');
    menuElement.classList.remove('js-show');
    toggleMenuButton.classList.remove('is-active');
  });

  closeSearchButton.addEventListener('click', e => {
    e.preventDefault();
    searchElement.classList.remove('js-show');
    toggleSearchButton.classList.remove('is-active');
  });
})();
