import { useMockApp } from '../../../app/providers/useMockApp';
import { EmptyState, StatusBadge } from '../../../components/ui/AppPrimitives';
import { CollaboratorPageShell } from '../components/CollaboratorPageShell';

export function JourneyPage() {
  const { state } = useMockApp();
  return <CollaboratorPageShell title="Minha Jornada" description="Linha do tempo pessoal de atividades e conteúdos deste cenário.">{state.journey.length === 0 ? <EmptyState title="Sua jornada começa aqui" description="Atividades concluídas aparecerão nesta linha do tempo." /> : <ol className="portal-timeline">{state.journey.map((event) => <li key={event.id}><div aria-hidden="true" /><article><div><time dateTime={event.date}>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(`${event.date}T12:00:00`))}</time><StatusBadge tone={event.status === 'Concluída' || event.status === 'Lido' ? 'success' : 'info'}>{event.status}</StatusBadge></div><h2>{event.title}</h2><p>{event.description}</p><small>{event.type === 'assessment' ? 'Avaliação anônima' : event.type === 'learning' ? 'Desenvolvimento' : 'Comunicação'}</small></article></li>)}</ol>}</CollaboratorPageShell>;
}
