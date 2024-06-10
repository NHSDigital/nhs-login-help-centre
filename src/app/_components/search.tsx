'use client';
import Fuse from 'fuse.js';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchResult({ searchData }: Props) {
  const fuse = new Fuse(searchData, { keys: ['content', 'value'] });

  const currentSearchTerm = useSearchParams().get('q') as string;

  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);

  const results = fuse
    .search(currentSearchTerm)
    .map((result) => result.item as { value: string; content: string; id: string; slug: string });

  function handleChange(e: { target: { value: string } }) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="nhsuk-grid-column-three-quarters">
      <h1 id="title">{currentSearchTerm ? 'Search results for ' + currentSearchTerm : 'Search'}</h1>
      <form id="search" action="/search" method="get" role="search">
        <div className="app-search__contents">
          <label className="nhsuk-u-visually-hidden" htmlFor="search-field">
            Search the NHS login help centre again
          </label>
          <input
            className="app-search__input"
            name="q"
            type="search"
            value={searchTerm}
            onChange={handleChange}
            autoComplete="off"
            id="search_input"
            pattern="^[a-zA-Z0-9\s]{3,}$"
            title="At least 3 characters, no symbols"
          />
          <button type="submit" className="app-search__submit">
            <svg
              className="icon icon__search"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
            </svg>
            <span className="nhsuk-u-visually-hidden">Search</span>
          </button>
        </div>
      </form>
      <div id="search_content">
        {results.length ? (
          <>
            <div>
              Found <strong>{results.length}</strong> matching result{results.length > 1 ? 's' : ''}
            </div>
            <ul className="nhsuk-list nhsuk-list--border nhsuk-u-margin-top-3">
              {results.map((result, index) => (
                <li key={index}>
                  <h2 className="nhsuk-u-margin-bottom-1">
                    <a href={`/${result.slug.replace('/index', '')}#${result.id}`}>
                      {result.value}
                    </a>
                  </h2>
                  <p className="nhsuk-body-s nhsuk-u-margin-top-1">
                    {result.content?.substring(0, Math.max(result.content?.indexOf(' ', 120), 120))}
                    &#8230;
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : currentSearchTerm ? (
          <>
            <div className="nhsuk-grid-column-two-thirds">
              <h2>No results found for {currentSearchTerm}</h2>
              <p>Improve your search results by:</p>
              <ul className="nhsuk-list nhsuk-list--bullet">
                <li>double-checking your spelling</li>
                <li>using fewer keywords</li>
                <li>searching a reference number</li>
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

type Props = {
  searchData: any;
};
