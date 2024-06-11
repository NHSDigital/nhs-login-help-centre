import ContactForm from '@/app/_components/contact-form';
import Header from '@/app/_components/header';
import { Suspense } from 'react';
import clientsJson from '@/_data/clients.json';

const clients = clientsJson.clients;
type ClientsList = typeof clients;

export default async function Contact() {
  const clientsArray = Object.keys(clients).map((zendeskId) => ({
    zendeskId,
    displayName: clients[zendeskId as keyof ClientsList],
  }));
  return (
    <>
      <Header></Header>
      <div className="nhsuk-width-container">
        <main className="nhsuk-main-wrapper" role="main">
          <div className="nhsuk-grid-row">
            <Suspense>
              <ContactForm clients={clientsArray}></ContactForm>
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
