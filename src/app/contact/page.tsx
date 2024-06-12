import ContactForm from '@/app/_components/contact-form';
import Header from '@/app/_components/header';
import { Suspense } from 'react';
import clientsJson from '@/_data/clients.json';
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';

const clients = clientsJson.clients;
type ClientsList = typeof clients;

export const metadata: Metadata = {
  title: 'Contact us',
  description:
    'The NHS login Help centre is where you can find helpful information, guidance, and support for issues with NHS login.',
  other: { pageName: 'contact-us' },
};

export default async function Contact() {
  const contactLinks = (
    await Promise.all(
      getAllArticles()
        .filter((f) => f.type === 'article')
        .map((file) => markdownToHtml(file.markdownContent).then((article) => article.contactLinks))
    )
  ).flat();

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
              <ContactForm clients={clientsArray} contactLinks={contactLinks}></ContactForm>
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}
