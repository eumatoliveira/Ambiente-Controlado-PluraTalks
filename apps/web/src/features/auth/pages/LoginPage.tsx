import { LoginForm } from '../components/LoginForm';
import { AuthShell } from '../components/AuthShell';
import './login.css';

export function LoginPage() {
  return (
    <AuthShell>
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <p className="login-brand">Bem-vindo de volta</p>
          <h1 id="login-title">Login</h1>
          <p className="login-description">
            Acesse sua conta para continuar no seu ambiente Plura Talks.
          </p>
        </header>

        <LoginForm />
        <p className="login-demo-note">Ambiente demonstrativo sem autenticação real.</p>
      </section>
    </AuthShell>
  );
}
