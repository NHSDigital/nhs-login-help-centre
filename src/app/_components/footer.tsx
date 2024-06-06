export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="nhsuk-footer" id="nhsuk-footer">
        <div className="nhsuk-width-container">
          <h2 className="nhsuk-u-visually-hidden">Support links</h2>
          <ul className="nhsuk-footer__list">
            <li className="nhsuk-footer__list-item">
              <a
                className="nhsuk-footer__list-item-link"
                href="https://digital.nhs.uk/services/nhs-login"
              >
                NHS login for partners and developers
              </a>
            </li>
            <li className="nhsuk-footer__list-item">
              <a
                className="nhsuk-footer__list-item-link"
                target="_blank"
                href={process.env.ACCESS_FRONTEND_URL + '/terms-and-conditions'}
              >
                Our Policies
              </a>
            </li>
          </ul>
          <p className="nhsuk-footer__copyright">© Crown copyright</p>
        </div>
      </div>
    </footer>
  );
}
