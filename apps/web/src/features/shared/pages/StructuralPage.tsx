import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Breadcrumbs, EmptyState, PageHeader, SectionCard } from '../../../components/ui/AppPrimitives';
import { CollaboratorLayout } from '../../collaborator/components/CollaboratorLayout';
import { RHLayout } from '../../rh/components/RHLayout';

type StructuralPageProps = {
  context: 'rh' | 'collaborator';
  title: string;
  description: string;
  nextRound: string;
};

export function StructuralPage({ context, title, description, nextRound }: StructuralPageProps) {
  const location = useLocation();
  const home = context === 'rh' ? '/rh' : '/colaborador';

  useEffect(() => {
    document.title = `${title} | PluraTalks`;
  }, [title]);
  const content = (
    <>
      {context === 'rh' ? <Breadcrumbs items={[{ label: 'Visão geral', to: '/rh' }, { label: title }]} /> : null}
      <PageHeader eyebrow={nextRound} title={title} description={description} />
      <SectionCard>
        <EmptyState
          title="Rota pronta para evolução"
          description="A navegação e o estado compartilhado desta área já estão conectados. O comportamento completo será entregue na ronda indicada, com testes e estados de interface próprios."
          action={<Link className="structural-back-link" to={home}>Voltar ao início <ArrowRightIcon aria-hidden="true" /></Link>}
        />
      </SectionCard>
      <p className="structural-route-note">Rota atual: <code>{location.pathname}</code></p>
    </>
  );

  return context === 'rh' ? <RHLayout>{content}</RHLayout> : <CollaboratorLayout>{content}</CollaboratorLayout>;
}
