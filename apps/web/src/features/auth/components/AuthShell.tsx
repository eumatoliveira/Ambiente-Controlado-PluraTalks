import type { ReactNode } from 'react';

import { BrandLockup } from '../../../components/brand/BrandLockup';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="login-page">
      <aside className="login-visual" aria-label="Plura Talks">
        <div className="login-visual-copy">
          <BrandLockup tone="white" className="login-visual-logo" />
          <p className="login-visual-eyebrow">Conexões que transformam</p>
          <h2>Escuta que aproxima pessoas e organizações.</h2>
          <p>
            Um ambiente acolhedor para acompanhar experiências, fortalecer vínculos
            e construir relações de trabalho mais humanas.
          </p>
        </div>
        <div className="login-illustration-frame" aria-hidden="true">
          <img src="/brand/plura-connection-illustration.png" alt="" />
        </div>
      </aside>

      <div className="login-access-panel">{children}</div>
    </main>
  );
}
