import { Link } from 'react-router-dom';

import { AuthShell } from '../components/AuthShell';
import './login.css';

export function ForgotPasswordPage() {
  return (
    <AuthShell>
      <section className="login-card" aria-labelledby="recovery-title">
        <header className="login-header">
          <p className="login-brand">Acesso seguro</p>
          <h1 id="recovery-title">Recuperar senha</h1>
          <p className="login-description">
            Esta funcionalidade ainda não está disponível.
          </p>
        </header>

        <p className="recovery-explanation">
          Nenhuma solicitação será enviada enquanto o serviço de recuperação
          não estiver conectado.
        </p>

        <Link className="login-secondary-action" to="/">
          Voltar ao login
        </Link>
      </section>
    </AuthShell>
  );
}
