/* Simple-ish implementation of a scroll spy for NHS Digital's Sticky Nav's section tracking status.
* @author Geoff Hayward
* @author Oliver Rushworth
*
* Attributions
*  - The solution is based on https://codepen.io/zchee/pen/ogzvZZ.
*  - The method getPosition() came from https://stackoverflow.com/a/53351648.
*/
(function() {
  'use strict';
  const level = window.level || 2;


  let sections = {};
  let sectionSelector = '.article-content h1';

  for (let i = 2; i <= level; i++) {
    sectionSelector += ', .article-content h' + i;
  }

  function getPosition(element) {
    let distance = -120;
    while (element) {
      distance += element.offsetTop;
      element = element.offsetParent;
    };
    return distance;
  }

  function calculate() {
    const elements = document.querySelectorAll(sectionSelector);
    sections = Array.from(elements)
      .filter(e => e.id)
      .map(e => ({ id: e.id, pos: getPosition(e) }))
      .sort((a, b) => a.pos - b.pos);
  }

  function markStickyNavElem(elementId) {
    const currentActive = document.querySelector('.active');
    const newActive = document.querySelector('a[href="#' + elementId + '"]');

    if (currentActive === newActive) {
      return;
    };

    if (currentActive) {
      currentActive.setAttribute('class', ' ');
    }

    if (newActive) {
      newActive.setAttribute('class', 'active');
    }
  }

  function getFirstNavElementInView(scrollPosition) {
    let element = sections[0];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].pos <= scrollPosition) {
        element = sections[i];
      }
    }
    return element;
  }

  function marker() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    let newActive = null;

    //if scrolled to the bottom
    if (Math.ceil(scrollPosition + window.innerHeight) >= documentHeight) {
      newActive = sections[sections.length - 1];
    } else {
      newActive = getFirstNavElementInView(scrollPosition);
    }

    if (newActive) {
      markStickyNavElem(newActive.id);
    }
  }
  window.addEventListener('load', function() {
    calculate();
    marker();
  });

  window.addEventListener('resize', function() {
    calculate();
    marker();
  });

  window.addEventListener('scroll', function() {
    marker();
  });
})();
