import ContactForm from '@/app/_components/contact-form';
import Header from '@/app/_components/header';
import { Suspense } from 'react';

export default async function Contact() {
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" role="main">
          <div className="nhsuk-grid-row">
            <Suspense>
              <ContactForm></ContactForm>
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
