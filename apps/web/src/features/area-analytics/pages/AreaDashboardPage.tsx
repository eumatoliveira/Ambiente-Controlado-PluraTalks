import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ANONYMITY_THRESHOLD, canDisplayAggregate } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { Breadcrumbs, EmptyState, PageHeader, SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import type { AssessmentAggregate } from '../../../types/domain';
import { RHLayout } from '../../rh/components/RHLayout';
import './area-dashboard.css';

function percentage(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

function aggregateLabel(aggregate: AssessmentAggregate): string {
  return `${aggregate.respondents} de ${aggregate.eligible} respostas válidas`;
}

export default function AreaDashboardPage() {
  const { areaId = '' } = useParams();
  const { state } = useMockApp();
  const department = state.departments.find((item) => item.id === areaId);
  const availableAssessments = state.assessments.filter((assessment) => state.aggregates.some((aggregate) => aggregate.assessmentId === assessment.id && aggregate.departmentId === areaId));
  const [assessmentId, setAssessmentId] = useState(availableAssessments[0]?.id ?? '');
  const [period, setPeriod] = useState('current');
  const [comparisonId, setComparisonId] = useState('');
  const aggregate = state.aggregates.find((item) => item.departmentId === areaId && item.assessmentId === assessmentId);
  const displayable = Boolean(aggregate && canDisplayAggregate(aggregate.respondents));
  const comparison = state.aggregates.find((item) => item.departmentId === comparisonId && item.assessmentId === assessmentId);
  const comparisonDisplayable = Boolean(comparison && canDisplayAggregate(comparison.respondents));

  const organizationScore = useMemo(() => {
    const eligible = state.aggregates.filter((item) => item.assessmentId === assessmentId && canDisplayAggregate(item.respondents));
    const respondentTotal = eligible.reduce((sum, item) => sum + item.respondents, 0);
    if (respondentTotal === 0) return 0;
    return Math.round(eligible.reduce((sum, item) => sum + item.score * item.respondents, 0) / respondentTotal);
  }, [assessmentId, state.aggregates]);

  useEffect(() => {
    document.title = department ? `${department.name} — Área | PluraTalks` : 'Área não encontrada | PluraTalks';
  }, [department]);

  if (!department) {
    return <RHLayout><Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: 'Áreas', to: '/rh/areas' }, { label: 'Não encontrada' }]} /><PageHeader title="Área não encontrada" description="A área informada não existe no cenário demonstrativo." /><EmptyState title="Não foi possível abrir esta área" description="Volte para a lista e escolha uma área disponível." action={<Link className="area-primary-link" to="/rh/areas">Ver áreas</Link>} /></RHLayout>;
  }

  return (
    <RHLayout>
      <Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: 'Áreas', to: '/rh/areas' }, { label: department.name }]} />
      <PageHeader eyebrow="Indicadores agregados" title={department.name} description="Leitura demonstrativa da área, sem respostas ou classificações individuais." actions={<StatusBadge tone={department.status === 'active' ? 'success' : 'neutral'}>{department.status === 'active' ? 'Área ativa' : 'Área arquivada'}</StatusBadge>} />

      <section className="area-privacy-notice" aria-labelledby="area-privacy-title">
        <div><strong id="area-privacy-title">Privacidade por padrão</strong><p>Resultados aparecem somente a partir de {ANONYMITY_THRESHOLD} respostas válidas. Pessoas, cargos, e-mails e respostas individuais nunca são exibidos.</p></div>
        <StatusBadge tone="info">Dados demonstrativos</StatusBadge>
      </section>

      {availableAssessments.length === 0 || !aggregate ? (
        <EmptyState title="Nenhum resultado disponível" description="Ainda não há uma avaliação agregada para esta área." />
      ) : (
        <>
          <div className="area-filter-bar" aria-label="Filtros do dashboard">
            <label><span>Avaliação</span><select value={assessmentId} onChange={(event) => { setAssessmentId(event.target.value); setComparisonId(''); }}>{availableAssessments.map((assessment) => <option value={assessment.id} key={assessment.id}>{assessment.title}</option>)}</select></label>
            <label><span>Período</span><select value={period} onChange={(event) => setPeriod(event.target.value)} disabled={!displayable}><option value="current">Ciclo atual</option><option value="previous">Ciclo anterior</option></select></label>
            <label><span>Comparar com</span><select value={comparisonId} onChange={(event) => setComparisonId(event.target.value)} disabled={!displayable}><option value="">Organização</option>{state.departments.filter((item) => item.id !== areaId && item.status === 'active').map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select></label>
          </div>

          {!displayable ? (
            <section className="area-insufficient" role="status" aria-labelledby="area-insufficient-title">
              <strong id="area-insufficient-title">Dados insuficientes para preservar o anonimato</strong>
              <p>Esta área possui {aggregate.respondents} respostas válidas. São necessárias pelo menos {ANONYMITY_THRESHOLD}. Scores, distribuições, fatores e filtros de comparação permanecem ocultos.</p>
              <Link to="/rh/areas">Voltar para áreas</Link>
            </section>
          ) : (
            <div className="area-analytics-content">
              <div className="area-kpi-grid" aria-label="Indicadores da área">
                <article><span>Score agregado</span><strong>{aggregate.score}</strong><small>Escala demonstrativa de 0 a 100</small></article>
                <article><span>Participação</span><strong>{percentage(aggregate.respondents, aggregate.eligible)}%</strong><small>{aggregateLabel(aggregate)}</small></article>
                <article><span>Referência</span><strong>{comparisonId && comparisonDisplayable ? comparison?.score : organizationScore}</strong><small>{comparisonId ? state.departments.find((item) => item.id === comparisonId)?.name : 'Organização'}</small></article>
              </div>

              {comparisonId && !comparisonDisplayable ? <p className="area-comparison-blocked" role="status">A comparação selecionada não possui respostas suficientes e foi ocultada para preservar o anonimato.</p> : null}

              <div className="area-chart-grid">
                <SectionCard>
                  <div className="area-section-heading"><div><h2>Fatores agregados</h2><p>Percepção média da coorte elegível.</p></div><StatusBadge tone="info">{period === 'current' ? 'Ciclo atual' : 'Ciclo anterior'}</StatusBadge></div>
                  <div className="area-factor-list" role="img" aria-label={`Fatores agregados da área ${department.name}: ${aggregate.factors.map((factor) => `${factor.label}, ${factor.value}`).join('; ')}`}>
                    {aggregate.factors.map((factor) => <div className="area-factor" key={factor.label}><div><span>{factor.label}</span><strong>{factor.value}</strong></div><div className="area-bar-track"><span style={{ width: `${factor.value}%` }} /></div></div>)}
                  </div>
                </SectionCard>
                <SectionCard>
                  <div className="area-section-heading"><div><h2>Distribuição</h2><p>Faixas agregadas, sem ranking individual.</p></div></div>
                  <ul className="area-distribution-list" aria-label="Distribuição agregada de respostas">{aggregate.scoreBands.map((band) => <li key={band.label}><span>{band.label}</span><strong>{band.count}</strong><small>{percentage(band.count, aggregate.respondents)}%</small></li>)}</ul>
                </SectionCard>
              </div>

              <SectionCard>
                <div className="area-section-heading"><div><h2>Leitura comparativa</h2><p>Diferença entre a área e a referência agregada permitida.</p></div></div>
                <p className="area-comparison-copy">{comparisonId && comparisonDisplayable ? `${department.name} está ${aggregate.score - (comparison?.score ?? 0)} pontos em relação a ${state.departments.find((item) => item.id === comparisonId)?.name}.` : `${department.name} está ${aggregate.score - organizationScore} pontos em relação à referência organizacional demonstrativa.`}</p>
              </SectionCard>
            </div>
          )}
        </>
      )}
    </RHLayout>
  );
}
