import { getHomePageLinks } from '@/lib/api';

export default function Home() {
  const hubs = getHomePageLinks();
  return (
    <div>
      <header className="nhsuk-header" role="banner">
        <div className="nhsuk-width-container nhsuk-header__container">
          <div className="nhsuk-header__logo">
            <a className="nhsuk-header__link nhsuk-header__link--service nhsuk-header__link--service-short-name">
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
        </div>
      </header>
      <section className="nhsuk-hero">
        <div className="nhsuk-width-container nhsuk-hero--border">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-hero__wrapper">
              <center>
                <h1 className="nhsuk-u-margin-bottom-3">How can we help you?</h1>
                <p></p>
                <div className="nhsuk-hub__search">
                  <center>
                    <div
                      className="nhsuk-header__search-wrap nhsuk-hub__search-wrap"
                      id="wrap-search"
                    >
                      <form
                        className="nhsuk-header__search-form nhsuk-hub__search-form"
                        id="search"
                        action="/search"
                        method="get"
                        role="search"
                      >
                        <label className="nhsuk-u-visually-hidden" htmlFor="search-field">
                          Enter search term or reference code
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
                              className="autocomplete__input autocomplete__input--default nhsuk-hub__search-input"
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
                              When autocomplete results are available use up and down arrows to
                              review and enter to select. Touch device users, explore by touch or
                              with swipe gestures.
                            </span>
                          </div>
                        </div>

                        <button
                          className="nhsuk-search__submit nhsuk-hub__search-submit"
                          type="submit"
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
                          <span className="nhsuk-u-visually-hidden">
                            Enter search term or reference code
                          </span>
                        </button>
                      </form>
                    </div>
                  </center>
                </div>
              </center>
            </div>
          </div>
        </div>
      </section>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
              <div className="nhsuk-grid-row nhsuk-panel-group nhsuk-u-margin-bottom-0">
                {hubs.map((hub) => (
                  <div
                    className="nhsuk-grid-column-one-half nhsuk-panel-group__item nhsuk-u-margin-0"
                    key={hub.slug}
                  >
                    <div className="nhsuk-promo nhsuk-u-margin-bottom-5">
                      <a
                        className="nhsuk-promo__link-wrapper"
                        href={'/' + hub.slug?.replace('/index', '')}
                      >
                        <div className="nhsuk-promo__content">
                          <h2 className="nhsuk-promo__heading">{hub.title}</h2>
                          <p className="nhsuk-promo__description">{hub.subtitle}</p>
                          <svg
                            className="nhsuk-icon nhsuk-icon nhsuk-icon__chevron-right-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="27"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <circle cx="13.333" cy="13.333" r="13.333" fill="#005eb8" />
                            <g
                              data-name="Group 1"
                              fill="none"
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="2.667"
                            >
                              <path d="M15.438 13l-3.771 3.771" />
                              <path data-name="Path" d="M11.667 9.229L15.438 13" />
                            </g>
                          </svg>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
