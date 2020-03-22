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
  const sections = {};
  const level = window.level || 2;
  let sectionSelector = '.article-content h1';

  for (let i = 2; i <= level; i++) {
    sectionSelector += ', .article-content h' + i;
  }

  const section = document.querySelectorAll(sectionSelector);

  function getPosition(element) {
    let distance = -120;
    while (element) {n
      distance += element.offsetTop;
      element = element.offsetParent;
    };
    return distance;
  }

  function calculate() {
    Array.prototype.forEach.call(section, function(e) {
      if (e.id != '') {
        sections[e.id] = getPosition(e);
      }
    });
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

  function getBottomStickyNavElement(sections) {
    //if no sections in sticky nav return immediatelly
    if (sections == null || sections.length == 0) {
      return null;
    }
    //sort sections descending by value / second element

    //create temp array to sort dict by second element
    var sectionsArray = Object.keys(sections).map(function(key) {
      return [key, sections[key]];
    });

    // Sort the array descending based on the second element
    sectionsArray.sort(function(first, second) {
      return second[1] - first[1];
    });

    //return first element after sorting by position / which is bottom
    // element of the the sticky nav
    return sectionsArray[0][0];
  }

  function getFirstNavElementInView(scrollPosition) {
    let element;
    for (let navElem in sections) {
      if (sections[navElem] <= scrollPosition) {
        element = navElem;
      }
    }
    return element;
  }

  function marker() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    const documentHeight = document.documentElement.offsetHeight;
    let newActive = null;

    //if scrolled to the bottom
    if (scrollPosition + window.innerHeight > documentHeight) {
      newActive = getBottomStickyNavElement(sections);
    } else {
      newActive = getFirstNavElementInView(scrollPosition);
    }

    if (newActive) {
      markStickyNavElem(newActive);
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
