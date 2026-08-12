import { LoginForm } from '../components/LoginForm';
import './login.css';

export function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-header">
          <p className="login-brand">PluraTalks</p>
          <h1 id="login-title">Login</h1>
          <p className="login-description">
            Acesse sua conta para continuar.
          </p>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
