# PluraTalks

Ambiente controlado do PluraTalks para evoluir e validar a experiência web antes da integração com os serviços de produção. O estado atual concentra a interface React dos fluxos de autenticação, colaborador e RH.

## Estado atual

- Frontend em React 19, TypeScript e Vite.
- Formulários com React Hook Form e validação com Zod.
- Navegação com React Router.
- Dashboards com Recharts.
- Testes de componentes e fluxos com Vitest e Testing Library.
- Estrutura reservada para API, banco de dados, pacotes compartilhados e documentação.

> Este repositório ainda é um ambiente de desenvolvimento. A API e o banco de dados estão apenas estruturados, sem implementação funcional, e o dashboard de RH usa dados simulados locais.

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

Os fluxos e dashboards podem ser desenvolvidos, testados e avaliados sem depender de uma API disponível. O custo é que autenticação, recuperação de senha, persistência e indicadores ainda não representam comportamento ponta a ponta de produção.

### Dados simulados no dashboard de RH

Dados locais tornam a interface determinística e facilitam testes visuais e de componentes. Por outro lado, eles não validam integração, autorização, isolamento entre empresas, qualidade dos dados ou atualização em tempo real. Nenhuma decisão operacional deve usar esses números como dados reais.

### React 19 e Vite 8

Versões recentes oferecem uma base moderna, compilação rápida e acesso às APIs atuais do ecossistema. O trade-off é exigir uma versão recente do Node.js e aceitar um risco maior de incompatibilidade com bibliotecas, plugins ou ambientes corporativos ainda presos a versões anteriores.

### Validação e formulários com bibliotecas especializadas

React Hook Form e Zod reduzem código manual e centralizam regras de entrada com boa tipagem. Em troca, adicionam dependências e exigem disciplina para manter schemas, mensagens e regras do backend alinhados quando a API for criada.

### Gráficos com Recharts

Recharts acelera a construção de visualizações responsivas e consistentes com React. A contrapartida é o aumento do bundle e uma flexibilidade menor para visualizações altamente customizadas ou grandes volumes de dados.

### Testes unitários e de componentes nesta etapa

Vitest e Testing Library dão feedback rápido sobre regras e interações da interface. Eles não substituem testes de integração com API, testes de contrato, acessibilidade automatizada nem validação ponta a ponta em navegadores reais, que deverão entrar antes de uma liberação de produção.

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
- O dashboard de RH depende de dados simulados.
- Não há configuração de deploy ou pipeline de CI versionada.
- A validação atual não comprova prontidão para produção.
