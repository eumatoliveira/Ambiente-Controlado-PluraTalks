import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
} from 'react';

import { ShowPasswordButton } from './ShowPasswordButton';

type PasswordFieldProps = {
  error?: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  'id' | 'type' | 'autoComplete' | 'placeholder'
>;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ error, ...inputProps }, ref) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function handleTogglePasswordVisibility() {
      setIsPasswordVisible((currentVisibility) => !currentVisibility);
    }

    return (
      <div className="login-field">
        <label htmlFor="password">Senha</label>
        <div className="password-control">
          <input
            {...inputProps}
            ref={ref}
            id="password"
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Digite sua senha"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'password-error' : undefined}
          />
          <ShowPasswordButton
            isPasswordVisible={isPasswordVisible}
            onToggle={handleTogglePasswordVisibility}
          />
        </div>
        {error ? (
          <p className="field-error" id="password-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
