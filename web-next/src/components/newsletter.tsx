'use client';
import { useId } from 'react';
export function NewsletterForm() {
  const id = useId();
  return (
    <form
      aria-label="Newsletter signup pending"
      className="newsletter-form"
      title="Subscriptions opening soon — newsletter integration is pending"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="newsletter-fields">
        <div className="newsletter-email">
          <label htmlFor={id} className="sr-only">
            Email address — subscriptions opening soon
          </label>
          <input
            id={id}
            type="email"
            disabled
            placeholder="Email address"
            aria-describedby={id + '-status'}
            className="newsletter-input"
          />
        </div>
        <button type="button" disabled className="newsletter-submit">
          SIGN UP →
        </button>
      </div>
      <p id={id + '-status'} className="sr-only">
        Subscriptions opening soon. Signup is disabled; no email addresses are
        collected.
      </p>
    </form>
  );
}
