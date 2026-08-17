import { ChevronRightIcon } from '@heroicons/react/20/solid';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './app-primitives.css';

export function DemoDataBadge() {
  return <span className="ui-demo-badge">Modo demonstração</span>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  demo = true,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  demo?: boolean;
}) {
  return (
    <header className="ui-page-header">
      <div>
        {eyebrow ? <p className="ui-eyebrow">{eyebrow}</p> : null}
        <div className="ui-title-row">
          <h1>{title}</h1>
          {demo ? <DemoDataBadge /> : null}
        </div>
        <p className="ui-page-description">{description}</p>
      </div>
      {actions ? <div className="ui-page-actions">{actions}</div> : null}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav className="ui-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {index > 0 ? <ChevronRightIcon aria-hidden="true" /> : null}
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`ui-section-card ${className}`.trim()}>{children}</section>;
}

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }) {
  return <span className={`ui-status-badge ui-status-badge--${tone}`}>{children}</span>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="ui-empty-state">
      <strong>{title}</strong>
      <p>{description}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function LoadingSkeleton({ label = 'Carregando conteúdo' }: { label?: string }) {
  return (
    <div className="ui-loading-skeleton" role="status" aria-label={label}>
      <span />
      <span />
      <span />
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="ui-error-state" role="alert">
      <strong>Não foi possível concluir</strong>
      <p>{message}</p>
      {onRetry ? <button type="button" onClick={onRetry}>Tentar novamente</button> : null}
    </div>
  );
}
