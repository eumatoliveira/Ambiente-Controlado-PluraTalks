import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  loginSchema,
  type LoginFormValues,
} from '../schemas/loginSchema';
import { EmailField } from './EmailField';
import { PasswordField } from './PasswordField';

type LoginFormProps = {
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
};

export function LoginForm({ onSubmit = () => undefined }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const hasValidationErrors = Boolean(errors.email || errors.password);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {hasValidationErrors ? (
        <div className="login-notification" role="alert">
          <strong>Revise os campos indicados.</strong>
          <span>Preencha os dados obrigatórios para continuar.</span>
        </div>
      ) : null}

      <EmailField error={errors.email?.message} {...register('email')} />
      <PasswordField
        error={errors.password?.message}
        {...register('password')}
      />

      <Link className="login-recovery" to="/esqueci-minha-senha">
        Esqueci minha senha
      </Link>

      <button className="login-submit" type="submit">
        Entrar
      </button>
    </form>
  );
}
