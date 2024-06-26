import Header from '@/app/_components/server/header';
import BackLink from '@/app/_components/contact-back-link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unable to send message',
  description:
    'The NHS login Help centre is where you can find helpful information, guidance, and support for issues with NHS login.',
  other: { pageName: 'contact-us:error' },
};

export default async function ContactError() {
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container ">
        <main className="nhsuk-main-wrapper " id="maincontent" role="main">
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-two-thirds">
              <h2>Unable to send message</h2>
              <p>
                There may be a problem with your internet connection, or a technical problem on our
                side.
              </p>
              <p>
                <BackLink>Please go back and try sending your message again.</BackLink>
              </p>
              <p>The information you entered will still be there.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
