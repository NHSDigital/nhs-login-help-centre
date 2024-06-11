import Header from '@/app/_components/header';

export default async function ContactError() {
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container ">
        <main className="nhsuk-main-wrapper " id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h1 className="nhsuk-card__heading">Message sent</h1>
              <div className="nhsuk-inset-text">
                <span className="nhsuk-u-visually-hidden">Information:</span>
                <p className="nhsuk-body">
                  If you need medical help, go to{' '}
                  <a href="https://www.nhs.uk/contact-us/get-medical-help/">111.nhs.uk</a> or call
                  111 or your GP.
                </p>
                <p className="nhsuk-body">Call 999 if it's a life-threatening emergency.</p>
              </div>
              <h2>What happens next</h2>
              <p>The NHS login support team will look into your issue.</p>
              <p>
                We have sent you a confirmation email and will get back to you within{' '}
                <strong>48 hours</strong>.
              </p>
              <details className="nhsuk-details">
                <summary className="nhsuk-details__summary" role="button">
                  <span className="nhsuk-details__summary-text">
                    Not received your confirmation email?
                  </span>
                </summary>
                <div className="nhsuk-details__text">
                  <p>If you did not get your confirmation email, you can:</p>
                  <ul>
                    <li>try checking your spam or junk folder</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
