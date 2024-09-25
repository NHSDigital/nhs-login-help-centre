'use client';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { PersonalDetailsForm } from './personal-details-form';
import { ProblemDetailsForm } from './problem-details-form';

export type ContactFormValues = {
  client?: string;
  email?: string;
  contactEmail?: string;
  'message-detail'?: string;
  name?: string;
  nhsNumberLastDigits?: string;
  phoneNumber?: string;
  problem?: string;
  subProblem?: string;
  visit?: string;
};

export type ErrorDescription = { description: string; code: string };

const formIdsForErrorSummary: ContactFormValues = {
  visit: 'visitNHS',
  problem: 'dupeAccount',
};

export default function ContactForm({ clients, contactLinks }: Props) {
  const [showOtherClients, setShowOtherClients] = useState(false);
  const [showOtherIssues, setShowOtherIssues] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormValues>({});
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const problemRadioRef = useRef<HTMLDivElement>(null);
  const errorParam = useSearchParams().get('error') as string;
  const descParam = useSearchParams().get('desc') as string;
  const [isContinue, setContinue] = useState(false);
  const [personalFormDetails, setPersonalFormDetails] = useState<ContactFormValues>({});

  return (
    <>
      <h1 className="nhsuk-app-contact-panel__heading">Contact NHS login support</h1>
      {errors && Object.keys(errors).length ? (
        <div
          className={
            'nhsuk-error-summary' +
            (errors && Object.keys(errors).length ? '' : ' nhsuk-error-summary--hidden')
          }
          aria-labelledby="error-summary-title"
          role="alert"
          ref={errorSummaryRef}
          tabIndex={-1}
        >
          <h2 className="nhsuk-error-summary__title">There is a problem</h2>
          <div className="nhsuk-error-summary__body">
            <ul className="nhsuk-list nhsuk-error-summary__list">
              {Object.keys(errors).map(e => (
                <li key={e}>
                  <a href={'#' + (formIdsForErrorSummary[e as keyof ContactFormValues] || e)}>
                    {errors[e as keyof ContactFormValues]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!isContinue ? (
        <PersonalDetailsForm
          errors={errors}
          handleSetContinue={setContinue}
          setErrors={setErrors}
          setPersonalFormDetails={setPersonalFormDetails}
          errorSummaryRef={errorSummaryRef}
        />
      ) : (
        <ProblemDetailsForm
          errors={errors}
          setErrors={setErrors}
          errorSummaryRef={errorSummaryRef}
          setShowOtherClients={setShowOtherClients}
          setShowOtherIssues={setShowOtherIssues}
          setSubmitted={setSubmitted}
          problemRadioRef={problemRadioRef}
          contactLinks={contactLinks}
          errorParam={errorParam}
          descParam={descParam}
          personalFormDetails={personalFormDetails}
          showOtherClients={showOtherClients}
          showOtherIssues={showOtherIssues}
          isSubmitted={isSubmitted}
          clients={clients}
        />
      )}
    </>
  );
}

type Props = {
  clients: { zendeskId: string; displayName: string }[];
  contactLinks: ErrorDescription[];
};

export function formGroupCssClasses(errors: ContactFormValues, fieldName: keyof ContactFormValues) {
  if (!!errors[fieldName]) {
    return 'nhsuk-form-group nhsuk-form-group--error';
  }
  return 'nhsuk-form-group';
}
