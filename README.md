# AgroHub - Fase 7

**FIAP 2026 · Engenharia de Software · 1º ano · Grupo 75 · ODS 2 (Fome Zero e Agricultura Sustentável)**

O AgroHub conecta pequenos produtores rurais a ONGs e instituições sociais, para que excedentes e
alimentos fora do padrão comercial virem doação em vez de desperdício.

- **Site publicado:** https://nuneslucass23.github.io/agrohub-react--fase-7/
- **Pitch vídeo da Fase 7:** link na Home do site (seção "Pitch vídeo")
- **Repositório da Fase 6:** https://github.com/Erickito30/agrohub-react--fase-6

## Integrantes

- Erick Henrique Miranda Izidoro
- João Victor Silva de Paula Cesar
- Lucas Nunes Nogueira
- Pietro de Nadai Fernandes de Andrade

## O que há de novo na Fase 7

### CEP automático no cadastro do produtor

Na página **Cadastre-se → Produtor**, o endereço é preenchido a partir do CEP:

1. Quando o CEP tem 8 números, o site faz uma requisição com `fetch` para a API pública
   [ViaCEP](https://viacep.com.br/) (`https://viacep.com.br/ws/{cep}/json/`).
2. A resposta em JSON preenche **rua, bairro, cidade e UF**. O número continua sendo digitado pelo usuário.
3. Enquanto busca, aparece "Buscando endereço...".
4. Se o CEP não existir (a API responde `{ "erro": true }`), aparece "CEP não encontrado".
5. Se a conexão falhar, o `try/catch` mostra um aviso e o usuário pode preencher à mão.

Os campos de endereço são **controlados pelo estado do React** (`useState`), o que permite que o
resultado da API apareça direto no formulário e que o usuário continue podendo editar.

Código: [`agrohub-react/src/components/EnderecoCep.jsx`](agrohub-react/src/components/EnderecoCep.jsx),
usado em [`agrohub-react/src/pages/Cadastro.jsx`](agrohub-react/src/pages/Cadastro.jsx).

## Funcionalidades das fases anteriores

| Funcionalidade | Onde | Como funciona |
| --- | --- | --- |
| Cadastro de excedente | Sou produtor | Formulário controlado com validação de campos obrigatórios |
| Notificações | Sino no menu (todas as páginas) | Context API do React (`NotificationsContext`) |
| Excedente novo na lista da ONG | Sou ONG | O item cadastrado pelo produtor aparece com o selo "Novo" |
| Filtros por categoria e distância | Sou ONG | Estado do React filtrando a lista |
| Favoritos e agendamento de coleta | Sou ONG | Salvos no `localStorage`, continuam após recarregar a página |
| Simulador de impacto | Home | Calcula o impacto estimado de uma doação |
| Formulário de contato e perguntas frequentes | Fale conosco | Formulário controlado com validação |

## Tecnologias

- React 18 + Vite 5
- React Router (`HashRouter`, para funcionar no GitHub Pages)
- Context API e hooks (`useState`, `useEffect`)
- `fetch` com `async/await` para consumir a API ViaCEP
- Deploy automático no GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`) a cada push na `main`

## Como executar

```sh
cd agrohub-react
npm ci
npm run dev
```

O site abre em `http://localhost:5173/agrohub-react--fase-7/`.

Build de produção: `npm run build` na pasta `agrohub-react`.

## Estrutura

```text
agrohub-react/src/
├── components/   Header, Footer, Layout, PitchSection, EnderecoCep...
├── context/      NotificationsContext (notificações e excedentes)
├── data/         pitches.js (links dos pitch vídeos)
└── pages/        Home, Cadastro, Produtor, Ong, Contato
```
