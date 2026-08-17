# PluraTalks

Ambiente controlado do PluraTalks para evoluir e validar a experiência web antes da integração com os serviços de produção. O estado atual concentra a interface React dos fluxos de autenticação, colaborador e RH.

## Estado atual

- Frontend em React 19, TypeScript e Vite.
- Formulários com React Hook Form e validação com Zod.
- Navegação com React Router.
- Dashboards organizacionais e por área, com proteção de anonimato.
- Gestão demonstrativa de organização, áreas, pessoas, plano, mensagens, comunicados, relatórios e playbooks.
- Portal do colaborador com avaliações, RH Comunica, trilhas, jornada e preferências.
- Testes unitários, de componentes e fluxos compartilhados com Vitest e Testing Library.
- Estrutura reservada para API, banco de dados, pacotes compartilhados e documentação.

> Este repositório é um ambiente frontend demonstrativo. A API e o banco de dados estão apenas estruturados, sem implementação funcional. Todos os dados são fictícios e as alterações duram somente a sessão atual.

## Estrutura

```text
apps/
  api/       estrutura reservada para o backend
  web/       aplicação web implementada
assets/      recursos visuais do projeto
db/          estrutura reservada para schemas, migrations e seeds
docs/        documentação de arquitetura, especificação e planejamento
packages/    pacotes compartilhados do monorepo
scripts/     automações futuras
```

## Como executar

Requisitos: Node.js compatível com Vite 8 e npm.

```bash
cd apps/web
npm ci
npm run dev
```

Comandos de validação:

```bash
npm test
npm run lint
npm run build
```

## Trade-offs do projeto

### Monorepo preparado antes das integrações

A separação entre `apps/web`, `apps/api`, `packages` e `db` cria limites claros e permite crescimento sem uma reorganização estrutural posterior. Em contrapartida, vários diretórios ainda contêm somente arquivos `.gitkeep`, aumentando a estrutura aparente sem entregar funcionalidade correspondente nesta fase.

### Frontend desacoplado para acelerar a validação

Os fluxos e dashboards podem ser desenvolvidos, testados e avaliados sem depender de uma API disponível. O custo é que autenticação, recuperação de senha, persistência e indicadores não representam comportamento ponta a ponta de produção.

### Estado compartilhado em Context API

Conversas, comunicados, convites, relatórios, avaliações, trilhas e preferências usam um único provider em memória. Isso permite validar fluxos entre RH e colaborador sem listas artificialmente desconectadas e sem adicionar uma biblioteca de estado. Em contrapartida, um recarregamento reinicia o cenário, não há sincronização entre abas e o volume futuro de dados poderá justificar uma camada de cache mais especializada.

### Anonimato aplicado no frontend

Scores e distribuições são ocultados para coortes com menos de cinco respostas, inclusive em áreas, detalhes analíticos, alertas e relatórios. Essa barreira reduz exposição acidental no protótipo, mas não substitui agregação, autorização e fiscalização no servidor. Em produção, o backend deve ser a autoridade dessa regra.

### Canais identificados separados de analytics anônimos

Solicitações ao RH exibem a identidade fictícia do colaborador, enquanto respostas de pesquisas e testes nunca aparecem individualmente. A separação torna a expectativa de privacidade clara, mas exige que futuros contratos de API e eventos de observabilidade mantenham a mesma fronteira.

### Capacidade contratada calculada localmente

O consumo do plano soma pessoas ativas e convites pendentes, bloqueando novos convites quando não há vagas. Isso torna o comportamento testável, porém não possui garantia transacional: concorrência e cobrança devem continuar fora do frontend e ser validadas por serviços de produção.

### Relatórios por impressão do navegador

O preview usa CSS de impressão e `window.print`, permitindo salvar PDF sem serviço adicional ou envio de dados. O resultado final varia conforme navegador, sistema operacional e preferências de impressão; não há garantia de paginação idêntica nem PDF assinado pelo servidor.

### Dados simulados em todo o produto

Dados locais tornam a interface determinística e facilitam testes visuais e de componentes. Por outro lado, eles não validam integração, autorização, isolamento entre empresas, qualidade dos dados ou atualização em tempo real. Nenhuma decisão operacional deve usar esses números como dados reais.

### React 19 e Vite 8

Versões recentes oferecem uma base moderna, compilação rápida e acesso às APIs atuais do ecossistema. O trade-off é exigir uma versão recente do Node.js e aceitar um risco maior de incompatibilidade com bibliotecas, plugins ou ambientes corporativos ainda presos a versões anteriores.

### Validação e formulários com bibliotecas especializadas

React Hook Form e Zod reduzem código manual e centralizam regras de entrada com boa tipagem. Em troca, adicionam dependências e exigem disciplina para manter schemas, mensagens e regras do backend alinhados quando a API for criada.

### Gráficos com Recharts

Recharts acelera a construção de visualizações responsivas e consistentes com React. A contrapartida é o aumento do bundle e uma flexibilidade menor para visualizações altamente customizadas ou grandes volumes de dados.

### Testes de frontend nesta etapa

Vitest e Testing Library cobrem regras, componentes e fluxos compartilhados, incluindo mensagem do colaborador, resposta do RH, capacidade do plano e anonimato com quatro e cinco respostas. Eles não substituem testes de contrato com API, segurança de backend nem uma auditoria formal de acessibilidade.

## Próximos passos recomendados

1. Implementar a API e definir contratos versionados entre frontend e backend.
2. Substituir dados simulados por fontes reais, mantendo estados explícitos de carregamento, vazio e erro.
3. Implementar autenticação, autorização por perfil e isolamento entre organizações.
4. Adicionar persistência, migrations e estratégia de dados para desenvolvimento e produção.
5. Criar testes de integração e ponta a ponta, além de CI para `test`, `lint` e `build`.
6. Documentar variáveis de ambiente, observabilidade, segurança, privacidade e processo de deploy.

## Limitações conhecidas

- Não há backend funcional neste snapshot.
- Não há banco de dados conectado.
- Todo o produto depende de dados simulados em memória.
- Alterações são reiniciadas ao recarregar a página.
- Autenticação e autorização são apenas demonstrativas.
- Não há configuração de deploy ou pipeline de CI versionada.
- A validação atual não comprova prontidão para produção.
