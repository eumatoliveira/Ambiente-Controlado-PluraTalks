import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState } from '../../../components/ui/AppPrimitives';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

const questions = [
  'Tenho clareza sobre minhas prioridades de trabalho.',
  'Consigo organizar minhas demandas dentro do tempo disponível.',
  'Recebo apoio quando preciso ajustar prioridades.',
  'Percebo reconhecimento pelas contribuições do time.',
];

export function AssessmentRunnerPage() {
  const { assessmentId = '' } = useParams();
  const { state, setAssessmentStatus } = useMockApp();
  const assessment = state.assessments.find((item) => item.id === assessmentId);
  const [started, setStarted] = useState(assessment?.status === 'in_progress');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  if (!assessment) return <CollaboratorPageShell title="Avaliação não encontrada" description="A atividade informada não existe."><EmptyState title="Atividade indisponível" description="Volte para a lista de avaliações." action={<Link to="/colaborador/responda">Ver avaliações</Link>} /></CollaboratorPageShell>;
  if (assessment.status === 'completed' || submitted) return <CollaboratorPageShell title={assessment.title} description="Atividade concluída neste cenário demonstrativo."><section className="portal-complete-card" role="status"><strong>Respostas enviadas</strong><p>Obrigado por participar. Nenhum resultado individual será exibido ao RH.</p><Link to="/colaborador/responda">Voltar para avaliações</Link></section></CollaboratorPageShell>;
  async function start() { await setAssessmentStatus(assessmentId, 'in_progress'); setStarted(true); }
  async function finish() { await setAssessmentStatus(assessmentId, 'completed'); setSubmitted(true); }
  if (!started) return <CollaboratorPageShell title={assessment.title} description={assessment.description}><section className="portal-start-card"><span>{assessment.estimatedMinutes} minutos estimados</span><h2>Antes de começar</h2><ul><li>Responda com base na sua percepção atual.</li><li>O RH não verá suas respostas individuais.</li><li>Resultados só aparecem em grupos com cinco ou mais respostas.</li></ul><button className="portal-primary-button" type="button" onClick={start}>Iniciar avaliação</button></section></CollaboratorPageShell>;
  const answer = answers[step];
  return <CollaboratorPageShell title={assessment.title} description={`Pergunta ${step + 1} de ${questions.length}`}><div className="portal-progress" role="progressbar" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={step + 1} aria-label="Progresso da avaliação"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><section className="portal-question-card"><fieldset><legend>{questions[step]}</legend><div className="portal-scale">{['Discordo totalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo totalmente'].map((label, index) => <label key={label}><input type="radio" name={`question-${step}`} value={String(index + 1)} checked={answer === String(index + 1)} onChange={(event) => setAnswers((current) => ({ ...current, [step]: event.target.value }))} /><span>{index + 1}</span><small>{label}</small></label>)}</div></fieldset><div className="portal-runner-actions"><button className="portal-secondary-button" type="button" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0}>Voltar</button>{step < questions.length - 1 ? <button className="portal-primary-button" type="button" disabled={!answer} onClick={() => setStep((value) => value + 1)}>Próxima</button> : <button className="portal-primary-button" type="button" disabled={!answer} onClick={finish}>Enviar respostas</button>}</div></section></CollaboratorPageShell>;
}
