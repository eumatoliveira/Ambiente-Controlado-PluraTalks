import { Link, useParams } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import { ReportPageShell } from '../components/ReportPageShell';
import { reportHasSufficientData } from '../reportRules';

export function ReportPreviewPage() {
  const { reportId = '' } = useParams();
  const { state } = useMockApp();
  const report = state.reports.find((item) => item.id === reportId);
  if (!report) return <ReportPageShell title="Relatório não encontrado" description="O preview informado não existe nesta sessão."><EmptyState title="Preview indisponível" description="Volte para a lista de relatórios." action={<Link to="/rh/relatorios">Ver relatórios</Link>} /></ReportPageShell>;
  const safe = reportHasSufficientData(report, state.aggregates);
  const department = state.departments.find((item) => item.id === report.departmentId);
  const playbooks = state.playbooks.filter((item) => report.playbookIds.includes(item.id));
  return <ReportPageShell title={report.title} description={`${report.period} · ${report.scope === 'organization' ? 'Toda a organização' : department?.name}`} actions={<div className="report-header-actions"><StatusBadge tone="success">Dados demonstrativos</StatusBadge><button className="report-primary-button report-print-button" type="button" onClick={() => window.print()} disabled={!safe}>Imprimir / salvar como PDF</button></div>}>
    {!safe ? <section className="report-privacy-block report-privacy-block--large" role="status"><strong>Dados insuficientes para preservar o anonimato</strong><p>O preview foi bloqueado porque o escopo selecionado não alcança cinco respostas válidas. Nenhum indicador é exibido.</p></section> : <article className="report-preview"><header><div><p>PLURA TALKS · RELATÓRIO DEMONSTRATIVO</p><h2>{report.title}</h2><span>Gerado por {report.author}</span></div><strong>{report.period}</strong></header><section><h3>Resumo agregado</h3><div className="report-metric-grid">{report.metrics.map((metric) => <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></article>)}</div></section><section><h3>Avaliações incluídas</h3><ul>{state.assessments.filter((item) => report.assessmentIds.includes(item.id)).map((item) => <li key={item.id}>{item.title} · resultados agregados</li>)}</ul></section>{playbooks.length > 0 ? <section><h3>Recomendações organizacionais</h3><div className="report-playbook-list">{playbooks.map((item) => <Link to={`/rh/playbooks/${item.id}`} key={item.id}><strong>{item.title}</strong><span>{item.context}</span></Link>)}</div><p className="report-disclaimer">Estas recomendações não constituem diagnóstico médico, psicológico, tratamento ou parecer legal.</p></section> : null}<footer>Dados fictícios para demonstração. Respostas individuais não são exibidas.</footer></article>}
  </ReportPageShell>;
}
