import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NotFoundPage() {
  const location = useLocation();
  const collaborator = location.pathname.startsWith('/colaborador');
  const target = collaborator ? '/colaborador' : location.pathname.startsWith('/rh') ? '/rh' : '/';

  useEffect(() => {
    document.title = 'Página não encontrada | PluraTalks';
  }, []);

  return (
    <main className="not-found-page">
      <p className="ui-eyebrow">Erro 404</p>
      <h1>Página não encontrada</h1>
      <p>O endereço <code>{location.pathname}</code> não corresponde a uma página do PluraTalks.</p>
      <Link to={target}>Voltar para uma área segura</Link>
    </main>
  );
}
