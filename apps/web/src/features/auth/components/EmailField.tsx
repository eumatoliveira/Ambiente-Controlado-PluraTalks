import { forwardRef, type ComponentPropsWithoutRef } from 'react';

type EmailFieldProps = {
  error?: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  'id' | 'type' | 'autoComplete' | 'placeholder'
>;

export const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  function EmailField({ error, ...inputProps }, ref) {
  return (
    <div className="login-field">
      <label htmlFor="email">E-mail</label>
      <input
        {...inputProps}
        ref={ref}
        id="email"
        type="email"
        autoComplete="email"
        placeholder="voce@empresa.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error ? (
        <p className="field-error" id="email-error">
          {error}
        </p>
      ) : null}
    </div>
  );
  },
);
