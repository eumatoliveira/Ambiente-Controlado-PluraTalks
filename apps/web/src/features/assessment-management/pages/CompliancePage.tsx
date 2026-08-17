import { StatusBadge } from '../../../components/ui/AppPrimitives';
import { AnalyticsPageShell } from '../components/AnalyticsPageShell';

const controls = [
  ['Anonimato analítico', 'Coortes abaixo de cinco respostas são ocultadas.'],
  ['Separação de finalidade', 'Mensagens identificadas não são misturadas a respostas anônimas.'],
  ['Dados demonstrativos', 'O frontend utiliza somente pessoas e conteúdos fictícios.'],
  ['Credenciais', 'A simulação de senha limpa os campos e não persiste valores.'],
  ['Exportação local', 'Relatórios usam apenas a impressão do navegador.'],
  ['Persistência', 'Alterações permanecem somente durante a sessão atual.'],
] as const;

export function CompliancePage() {
  return <AnalyticsPageShell title="Compliance" description="Checklist demonstrativo de privacidade, transparência e limites do frontend."><section className="compliance-summary"><div><strong>6 de 6</strong><span>controles demonstrativos aplicados</span></div><StatusBadge tone="success">Revisado</StatusBadge></section><div className="compliance-list">{controls.map(([title, description]) => <article key={title}><span aria-hidden="true">✓</span><div><h2>{title}</h2><p>{description}</p></div><StatusBadge tone="success">Aplicado</StatusBadge></article>)}</div><p className="analytics-language-notice">Este checklist é uma representação de frontend e não constitui auditoria, certificação ou parecer jurídico.</p></AnalyticsPageShell>;
}
