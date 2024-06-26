'use client';
import { MarkdownDocument } from '@/lib/api';
import { useState } from 'react';

export default function HeaderWithLinks({ links }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setMenuOpen(false);
    setSearchOpen(!searchOpen);
  };

  const close = (e: { preventDefault: () => void }) => {
    e?.preventDefault();
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="nhsuk-header" role="banner">
      <div className="nhsuk-width-container nhsuk-header__container">
        <div className="nhsuk-header__logo">
          <a
            className="nhsuk-header__link nhsuk-header__link--service nhsuk-header__link--service-short-name"
            href="/"
          >
            <svg
              className="nhsuk-logo nhsuk-logo--white"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
              focusable="false"
              viewBox="0 0 40 16"
            >
              <path fill="#fff" d="M0 0h40v16H0z"></path>
              <path
                fill="#005eb8"
                d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"
              ></path>
              {/* <image src="https://assets.nhs.uk/images/nhs-logo.png" xlink:href=""></image> */}
            </svg>
            <span className="nhsuk-header__service-name">NHS login Help centre</span>
          </a>
        </div>
        <div className="nhsuk-header__content" id="content-header">
          <div className="nhsuk-header__menu">
            <button
              className={'nhsuk-header__menu-toggle' + (menuOpen ? ' is-active' : '')}
              id="toggle-menu"
              onClick={toggleMenu}
              aria-controls="header-navigation"
              aria-label="Open menu"
              aria-expanded="true"
            >
              Menu
            </button>
          </div>
          <div className="nhsuk-header__search">
            <button
              className={'nhsuk-header__search-toggle' + (searchOpen ? ' is-active' : '')}
              id="toggle-search"
              onClick={toggleSearch}
              aria-controls="search"
              aria-label="Open search"
              aria-expanded="false"
            >
              <svg
                className="nhsuk-icon nhsuk-icon__search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
              </svg>
              <span className="nhsuk-u-visually-hidden">Enter search term or reference code</span>
            </button>
            <div
              className={'nhsuk-header__search-wrap' + (searchOpen ? ' js-show' : '')}
              id="wrap-search"
            >
              <form
                className="nhsuk-header__search-form"
                id="search"
                action="/search"
                method="get"
                role="search"
              >
                <label className="nhsuk-u-visually-hidden" htmlFor="search-field">
                  Search the NHS login help centre
                </label>
                <div className="autocomplete-container" id="autocomplete-container">
                  <div className="autocomplete__wrapper">
                    <div
                      style={{
                        border: '0px',
                        clip: 'rect(0px, 0px, 0px, 0px)',
                        height: '1px',
                        marginBottom: '-1px',
                        marginRight: '-1px',
                        overflow: 'hidden',
                        padding: '0px',
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        width: '1px',
                      }}
                    >
                      <div
                        id="search-field__status--A"
                        role="status"
                        aria-atomic="true"
                        aria-live="polite"
                      ></div>
                      <div
                        id="search-field__status--B"
                        role="status"
                        aria-atomic="true"
                        aria-live="polite"
                      ></div>
                    </div>
                    <input
                      aria-expanded="false"
                      aria-owns="search-field__listbox"
                      aria-autocomplete="list"
                      aria-describedby="search-field__assistiveHint"
                      autoComplete="off"
                      className="autocomplete__input autocomplete__input--default"
                      id="search-field"
                      name="q"
                      placeholder="Enter search term or reference code"
                      type="text"
                      role="combobox"
                    />
                    <ul
                      className="autocomplete__menu autocomplete__menu--inline autocomplete__menu--hidden"
                      id="search-field__listbox"
                      role="listbox"
                    ></ul>
                    <span id="search-field__assistiveHint" style={{ display: 'none' }}>
                      When autocomplete results are available use up and down arrows to review and
                      enter to select. Touch device users, explore by touch or with swipe gestures.
                    </span>
                  </div>
                </div>

                <button className="nhsuk-search__submit" type="submit">
                  <svg
                    className="nhsuk-icon nhsuk-icon__search"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path>
                  </svg>
                  <span className="nhsuk-u-visually-hidden">
                    Enter search term or reference code
                  </span>
                </button>
                <button className="nhsuk-search__close" id="close-search" onClick={(e) => close(e)}>
                  <svg
                    className="nhsuk-icon nhsuk-icon__close"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
                  </svg>
                  <span className="nhsuk-u-visually-hidden">Close search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={'nhsuk-header__navigation' + (menuOpen ? ' js-show' : '')}
        id="header-navigation"
        role="navigation"
        aria-label="Primary navigation"
        aria-labelledby="label-navigation"
      >
        <div className="nhsuk-width-container">
          <p className="nhsuk-header__navigation-title">
            <span id="label-navigation">Menu</span>
            <button
              className="nhsuk-header__navigation-close"
              id="close-menu"
              onClick={(e) => close(e)}
            >
              <svg
                className="nhsuk-icon nhsuk-icon__close"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M13.41 12l5.3-5.29a1 1 0 1 0-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 0 0-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.29-5.3 5.29 5.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"></path>
              </svg>
              <span className="nhsuk-u-visually-hidden">Close menu</span>
            </button>
          </p>
          <ul className="nhsuk-header__navigation-list">
            <li className="nhsuk-header__navigation-item nhsuk-header__navigation-item--for-mobile">
              <a className="nhsuk-header__navigation-link" href="/">
                Home
                <svg
                  className="nhsuk-icon nhsuk-icon__chevron-right"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                </svg>
              </a>
            </li>
            {links.map((link) => (
              <li className="nhsuk-header__navigation-item" key={link.slug}>
                <a
                  className="nhsuk-header__navigation-link"
                  href={'/' + link.slug.replace('/index', '')}
                >
                  {link.short_title}
                  <svg
                    className="nhsuk-icon nhsuk-icon__chevron-right"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M15.5 12a1 1 0 0 1-.29.71l-5 5a1 1 0 0 1-1.42-1.42l4.3-4.29-4.3-4.29a1 1 0 0 1 1.42-1.42l5 5a1 1 0 0 1 .29.71z"></path>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

type Props = { links: MarkdownDocument[] };
