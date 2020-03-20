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
  const HEADING_PADDING = 150;

  let sectionSelector = '.article-content h1';

  for (let i = 2; i <= level; i++) {
    sectionSelector += ', .article-content h' + i;
  }

  const section = document.querySelectorAll(sectionSelector);


  function getPosition(element) {
    var distance = HEADING_PADDING * -1;
    do {
      distance += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    return distance;
  }
  function calculate() {
    Array.prototype.forEach.call(section, function(e) {
      if (e.id != '') {
        sections[e.id] = getPosition(e);
      }
    });
  }

  function markStickyNavElem(navElem) {
    if (document.querySelector('.active') != null)
      document.querySelector('.active').setAttribute('class', ' ');
    var newActive = document.querySelector('a[href="#' + navElem + '"]');
    var idElement = document.getElementById(navElem);
    if (
      newActive != null &&
      idElement != null &&
      !idElement.classList.contains('sticky-nav-exclude-active')
    )
      newActive.setAttribute('class', 'active');
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

  function marker() {
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    for (var navElem in sections) {
      if (
        navElem != null &&
        navElem != '' &&
        sections[navElem] <= scrollPosition
      ) {
        markStickyNavElem(navElem);
      }
    }
  }
  $(window).on('load resize scroll', function(e) {
    if (e.type == 'resize' || e.type == 'load') {
      calculate();
    }
    marker();
  });
})();
