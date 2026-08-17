# Design QA — fidelidade visual Plura Talks

Data: 2026-08-17

## Escopo e fonte de verdade

- Fonte visual canônica: `E:\Download\Plura Talks - Apresentação (3).pdf`.
- Referências usadas: paleta oficial, lockups e símbolo, tipografia Rubik, aplicação web original e ilustração humana da apresentação.
- O conteúdo e a arquitetura continuam B2B e demonstrativos, conforme o produto atual. A apresentação orientou identidade visual; não foi usada para reintroduzir escopo clínico ou backend.
- Renders locais de referência:
  - `output/playwright/identity-audit-2026-08-17/reference-11-palette.png`
  - `output/playwright/identity-audit-2026-08-17/reference-31-web.png`
  - `tmp/pdfs/plura-brand/page-26.png`

## Ambiente de verificação

- Preview: `http://127.0.0.1:4173`
- Navegador: Chromium controlado por Playwright CLI.
- Desktop: 1440 × 900 CSS px.
- Mobile: 390 × 844 CSS px.
- Densidade: DPR padrão do navegador automatizado.
- Rotas verificadas: `/`, `/esqueci-minha-senha`, `/rh` e `/colaborador`.

## Evidências finais

| Contexto | Desktop | Mobile/estado |
| --- | --- | --- |
| Login | `01-login-desktop.png` | `04-login-mobile.png` |
| Recuperação | `09-forgot-password-desktop.png` | `10-forgot-password-mobile.png` |
| RH | `02-rh-desktop.png` | `05-rh-mobile.png`, `06-rh-mobile-menu.png` |
| Colaborador | `03-collaborator-desktop.png` | `07-collaborator-mobile.png`, `08-collaborator-mobile-menu.png` |

Todos os arquivos estão em `output/playwright/fidelity-implementation-2026-08-17/`.

## Comparação conjunta com a referência

As imagens abaixo reúnem referência e implementação no mesmo artefato; cada comparação foi aberta e inspecionada após a correção final.

- Login: `comparison-final-login.png`
- Dashboard RH: `comparison-final-rh.png`
- Portal do colaborador: `comparison-final-collaborator.png`

Resultado visual:

- A paleta oficial está presente nas superfícies, CTAs, navegação, estados e gráficos.
- Rubik Variable está carregada localmente; a face latina usada pela interface foi confirmada como `loaded`.
- Logo, símbolo, favicon e ilustração são ativos extraídos da apresentação, sem aproximações desenhadas em CSS.
- Login e recuperação usam o mesmo shell de marca; a versão mobile preserva hierarquia e legibilidade.
- Dashboard RH mantém a densidade B2B, mas substitui a antiga paleta azul-acinzentada por roxo, lavanda, creme e laranja.
- Portal do colaborador preserva respiro, cartões arredondados e o tom humano da referência.

## Estados e interações

- Submissão vazia no login: alerta de validação visível.
- Recuperação de senha: retorno para o login visível e acessível.
- Seletor de período RH: `Trimestral` assume `aria-pressed="true"`.
- Drawer RH mobile: abre completamente após a transição.
- Drawer do colaborador mobile: abre completamente após a transição.
- Todas as oito combinações rota/viewport verificadas ficaram sem overflow horizontal.
- Erros de console: 0.
- Erros de página: 0.

## Histórico de correções

Primeira captura:

- P1 — o símbolo reduzido aparecia junto do wordmark por conflito de especificidade CSS.
- P1 — os arquivos Rubik eram emitidos, mas o nome `Rubik Variable` ainda não era usado pelo token global.
- Evidência preservada em `iteration-1-*.png` no diretório de capturas.

Correção e nova captura:

- Separação responsiva de wordmark/símbolo corrigida no componente compartilhado.
- Família tipográfica global corrigida e carregamento latino confirmado no navegador.
- Nenhuma pendência P0, P1 ou P2 permaneceu após a comparação final.

## Verificação técnica

- `npm run lint`: aprovado.
- `npm run test`: 15 arquivos e 45 testes aprovados.
- `npm run build`: aprovado; build Vite de produção gerado com os WOFF2 da Rubik.

## Observação não bloqueante

- A fotografia da apresentação foi preservada como ativo de referência, mas não entrou na interface. A ilustração oficial cobre a necessidade visual sem depender da confirmação de licença da foto.
- A densidade do dashboard RH é maior que a página promocional B2C original por necessidade do produto B2B; os elementos de identidade, e não o conteúdo clínico antigo, foram reproduzidos.

Final result: passed
