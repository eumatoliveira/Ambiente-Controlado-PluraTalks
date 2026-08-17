import { useState } from 'react';

import { remainingSeats, usedSeats } from '../../../app/mockRules';
import { useMockApp } from '../../../app/providers/useMockApp';
import { SectionCard, StatusBadge } from '../../../components/ui/AppPrimitives';
import { SettingsPageShell } from '../components/SettingsPageShell';

export function PlanPage() {
  const { state } = useMockApp();
  const [contactOpen, setContactOpen] = useState(false);
  const used = usedSeats(state.people);
  const remaining = remainingSeats(state.plan, state.people);
  const percentage = Math.min(Math.round((used / state.plan.seatLimit) * 100), 100);

  return (
    <SettingsPageShell title="Plano" description="Acompanhe a capacidade contratada e o uso demonstrativo de assentos.">
      <div className="settings-plan-grid">
        <SectionCard>
          <div className="settings-section-title"><h2>{state.plan.name}</h2><StatusBadge tone="success">Ativo</StatusBadge></div>
          <p className="settings-plan-copy">{state.plan.contractType}. O plano considera pessoas ativas e convites pendentes.</p>
          <div className="settings-progress-track" role="progressbar" aria-valuenow={used} aria-valuemin={0} aria-valuemax={state.plan.seatLimit} aria-label="Assentos utilizados"><span style={{ width: `${percentage}%` }} /></div>
          <p><strong>{used}</strong> de {state.plan.seatLimit} assentos em uso · {remaining} restantes</p>
        </SectionCard>
        <SectionCard>
          <h2>Precisa ampliar a capacidade?</h2>
          <p className="settings-plan-copy">A contratação acontece fora deste protótipo. Nenhum pagamento é coletado aqui.</p>
          <button className="settings-primary-button" type="button" onClick={() => setContactOpen(true)}>Falar com vendas</button>
        </SectionCard>
      </div>
      <div className="settings-plan-grid" aria-label="Detalhes do plano"><article className="settings-plan-stat"><span>Assentos contratados</span><strong>{state.plan.seatLimit}</strong></article><article className="settings-plan-stat"><span>Disponibilidade</span><strong>{remaining}</strong><small>{percentage}% utilizado</small></article></div>
      {contactOpen ? <div className="settings-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setContactOpen(false); }}><section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="plan-contact-title"><h2 id="plan-contact-title">Contato comercial</h2><p>Esta ação é demonstrativa. Em produção, a solicitação seguiria para o time comercial.</p><p><strong>{state.plan.externalSalesContact}</strong></p><div className="settings-form-actions"><button className="settings-secondary-button" type="button" onClick={() => setContactOpen(false)}>Fechar</button></div></section></div> : null}
    </SettingsPageShell>
  );
}
