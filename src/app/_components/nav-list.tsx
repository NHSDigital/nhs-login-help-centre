'use client';
import React, { useEffect, useState } from 'react';

export type NavHeader = {
  id: string;
  title: string;
};

/**
 * @param {number} currentPosition Current Scroll position
 * @param {Array} sectionPositionArray Array of positions of all sections
 * @param {number} startIndex Start index of array
 * @param {number} endIndex End index of array
 * @return {number} Current Active index
 */
const nearestIndex = (
  currentPosition: number,
  sectionPositionArray: Array<HTMLElement>,
  startIndex: number,
  endIndex: number
): number => {
  if (startIndex === endIndex) return startIndex;
  else if (startIndex === endIndex - 1) {
    if (
      Math.abs(sectionPositionArray[startIndex].offsetTop - currentPosition) <
      Math.abs(sectionPositionArray[endIndex].offsetTop - currentPosition)
    )
      return startIndex;
    else return endIndex;
  } else {
    var nextNearest = ~~((startIndex + endIndex) / 2);
    var a = Math.abs(sectionPositionArray[nextNearest].offsetTop - currentPosition);
    var b = Math.abs(sectionPositionArray[nextNearest + 1].offsetTop - currentPosition);
    if (a < b) {
      return nearestIndex(currentPosition, sectionPositionArray, startIndex, nextNearest);
    } else {
      return nearestIndex(currentPosition, sectionPositionArray, nextNearest, endIndex);
    }
  }
};

export default function ArticleNavList({ headers }: { headers: NavHeader[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const handleResizeOrScroll = () => {
      const sectionSelector = headers.map((header) => '#' + header.id).join(',');

      const elements: HTMLElement[] = Array.from(document.querySelectorAll(sectionSelector));
      const sections = elements.filter((e) => e.id).sort((a, b) => a.offsetTop - b.offsetTop);
      var index = nearestIndex(window.scrollY, sections, 0, headers.length - 1);
      setActiveIndex(index);
    };
    window.addEventListener('resize', handleResizeOrScroll);
    window.addEventListener('scroll', handleResizeOrScroll);
    return () => {
      window.removeEventListener('resize', handleResizeOrScroll);
      window.removeEventListener('scroll', handleResizeOrScroll);
    };
  }, [headers]);

  return (
    <nav>
      <ol className="article-section-nav__list">
        {headers.map(({ title, id }, index) => (
          <li key={id}>
            <a
              className={activeIndex === index ? 'active' : ''}
              href={'#' + id}
              aria-label={'Scroll to ' + title}
              title={'Scroll to ' + title}
            >
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
