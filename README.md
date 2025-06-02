# Eu Faço Isso - Frontend

Este é o frontend da plataforma "Eu Faço Isso", desenvolvido com Next.js e Tailwind CSS para conectar prestadores de serviço com clientes.

## Tecnologias Utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios para requisições HTTP
- React Icons
- Recharts para gráficos

## Estrutura do Projeto

```
frontend/
├── public/             # Arquivos estáticos
├── src/
│   ├── app/            # Páginas da aplicação (Next.js App Router)
│   │   ├── admin/      # Área administrativa
│   │   ├── cadastro-prestador/ # Cadastro de prestadores
│   │   ├── login/      # Autenticação
│   │   ├── prestador/  # Área do prestador
│   │   ├── resultados/ # Resultados de busca
│   │   └── page.tsx    # Página inicial
│   ├── components/     # Componentes reutilizáveis
│   │   ├── common/     # Componentes comuns
│   │   ├── layout/     # Componentes de layout
│   │   ├── prestador/  # Componentes específicos de prestador
│   │   ├── admin/      # Componentes específicos de admin
│   │   └── ui/         # Componentes de UI
│   └── services/       # Serviços e APIs
│       └── api.ts      # Configuração do Axios
├── .env.local          # Variáveis de ambiente locais
└── package.json        # Dependências
```

## Requisitos

- Node.js (v16 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Navegue até a pasta do frontend:
   ```bash
   cd eu-faco-isso/frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` baseado no `.env.example`
   - Configure a URL da API do backend

## Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

Para construir a aplicação para produção:

```bash
npm run build
```

Para iniciar a versão de produção:

```bash
npm start
```

## Principais Funcionalidades

### Área Pública
- **Página Inicial**: Busca de prestadores por categoria ou termo
- **Resultados de Busca**: Listagem de prestadores com filtros
- **Perfil de Prestador**: Visualização detalhada de prestador e seus serviços
- **Cadastro de Prestador**: Formulário de cadastro com validação de token

### Área do Prestador
- **Dashboard**: Visão geral de métricas e desempenho
- **Gerenciamento de Serviços**: CRUD de serviços oferecidos
- **Edição de Perfil**: Atualização de dados pessoais e profissionais
- **Visualização de Métricas**: Gráficos de visitas e contatos

### Área Administrativa
- **Geração de Tokens**: Criação de tokens para convite de prestadores
- **Métricas Gerais**: Visualização de estatísticas da plataforma
- **Gerenciamento de Categorias**: CRUD de categorias de serviço

## Integração com Backend

O frontend se comunica com o backend através de uma API RESTful. A configuração da URL da API é feita através da variável de ambiente `NEXT_PUBLIC_API_URL` no arquivo `.env.local`.

## Autenticação

A autenticação é feita através de JWT (JSON Web Tokens). O token é armazenado no localStorage do navegador e enviado no cabeçalho das requisições HTTP.

## Responsividade

A interface foi desenvolvida com foco em responsividade, adaptando-se a diferentes tamanhos de tela (desktop, tablet e mobile) através do Tailwind CSS.

## Acessibilidade

O projeto segue as melhores práticas de acessibilidade, utilizando elementos semânticos, atributos ARIA e contraste adequado.

## Desenvolvimento

### Estrutura de Componentes

Os componentes são organizados em categorias:
- **Layout**: Componentes estruturais como Header e Footer
- **Common**: Componentes reutilizáveis como CardPrestador e Avaliacao
- **UI**: Componentes de interface como botões e inputs
- **Prestador/Admin**: Componentes específicos para cada área

### Estilização

A estilização é feita com Tailwind CSS, utilizando classes utilitárias diretamente nos elementos.

## Testes

Para executar os testes:

```bash
npm run test
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
