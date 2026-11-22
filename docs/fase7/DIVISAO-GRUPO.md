# Divisão do grupo - Fase 7 (AgroHub - Sprint 7)

**Prazo na plataforma:** terça, 24/11/2026, 23h59. Meta do grupo: **enviar na terça até 18h**,
para sobrar folga caso algo dê errado no envio.
Atualizado em domingo, 22/11: o repositório da Fase 7 já existe e o trabalho começa **hoje**.

- Repositório: https://github.com/nuneslucass23/agrohub-react--fase-7
- Site (GitHub Pages, publica sozinho a cada push na `main`): https://nuneslucass23.github.io/agrohub-react--fase-7/

## O que o enunciado pede

- Site com a navegação e a identidade visual da Fase 6 **mais as funcionalidades novas**,
  usando só conteúdo visto até a Fase 7.
- **Deploy obrigatório** (vale ponto).
- **Vídeo (PV) de até 3 min** apresentando as funcionalidades, **público** no YouTube,
  com o link na **Home** do site.
- **PDF** com o link do deploy e o link do vídeo.
- **Um único arquivo comprimido** com o PDF e o projeto (sem `node_modules`, sem o arquivo do vídeo).

## Funcionalidades novas escolhidas

Ambas usam o conteúdo do **Cap 5 - Front-end** ("Hora do Fetch: consumo de dados de API").

1. **CEP automático no cadastro** - ao digitar o CEP, a API ViaCEP preenche rua, bairro,
   cidade e UF. É o mesmo exemplo da aula.
2. **Previsão do tempo para o produtor** - na página do Produtor, o usuário informa a cidade
   e vê a previsão dos próximos dias (máxima, mínima e chance de chuva) pela API Open-Meteo,
   que é gratuita e não precisa de chave.

As duas são independentes: cada pessoa trabalha num arquivo diferente e não depende da outra.

## Quem fez o quê até agora (base para a divisão)

| Integrante | Fase 5 | Fase 6 |
| --- | --- | --- |
| Erick | Base do projeto em React (rotas, Header/Footer/Layout) | Favoritos da ONG; dono do repositório |
| Pietro | Migração das páginas (Home, Cadastro, Produtor, ONG, Contato) | Revisão das páginas, deploy no GitHub Pages, UML |
| Lucas | Notificações (sino + excedente na página da ONG) | Correções dos favoritos, formulários com estado do React, UML com herança, integração |
| João | - | Vídeo, PDF e ZIP final |

A divisão abaixo mantém cada um perto do que já conhece.

---

## Pietro - CEP automático (ViaCEP)

Ele migrou e revisou o **Cadastro**, então já conhece a página.

- Arquivo: `agrohub-react/src/pages/Cadastro.jsx`.
- Na aba **Produtor** (e, se der tempo, na **ONG**), trocar o campo livre de endereço por:
  **CEP, Rua, Número, Bairro, Cidade e UF**.
- Os campos de endereço precisam ficar **controlados com `useState`**, porque hoje o formulário
  usa inputs não controlados e o `fetch` precisa conseguir preencher os valores.
- Quando o CEP tiver 8 dígitos: `fetch("https://viacep.com.br/ws/" + cep + "/json/")`.
- Tratar os três casos e mostrar uma mensagem em cada um:
  - **buscando** ("Buscando endereço...");
  - **CEP inexistente** (a API responde `{ "erro": true }`): "CEP não encontrado. Confira os números.";
  - **sem internet / falha**: "Não foi possível buscar o CEP agora. Preencha o endereço manualmente."
- O usuário continua podendo editar os campos preenchidos e digitar o **Número** à mão.

**Pronto quando:** CEP válido preenche os campos, CEP inválido mostra a mensagem, e o cadastro
continua funcionando como antes. Abrir PR na branch `fase7/cep`.

## Erick - Previsão do tempo (Open-Meteo)

Ele montou a arquitetura do projeto e fez os favoritos.

- Arquivos: um componente novo `agrohub-react/src/components/PrevisaoTempo.jsx`,
  usado em `agrohub-react/src/pages/Produtor.jsx` (abaixo dos cards de benefícios).
- Campo **Cidade** + botão **Ver previsão**. Fluxo com dois `fetch`:
  1. Cidade → coordenadas:
     `https://geocoding-api.open-meteo.com/v1/search?name=CIDADE&count=1&language=pt&countryCode=BR`
  2. Coordenadas → previsão:
     `https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America/Sao_Paulo&forecast_days=5`
- Mostrar 5 cards (dia, máxima, mínima, % de chuva) com o visual do site (`ah-card`).
- Mensagens: "Buscando previsão...", "Cidade não encontrada." e "Não foi possível carregar a previsão agora."
- Texto de apoio ligado ao tema: por exemplo, "Chuva forte prevista: combine a retirada do excedente antes."

**Pronto quando:** cidade válida mostra os 5 dias, cidade inexistente mostra a mensagem, e o
formulário de excedente continua funcionando. Abrir PR na branch `fase7/clima`.

O repositório da Fase 7 já foi criado pelo Lucas, com todo o histórico da Fase 6, a `base` do
Vite ajustada e o GitHub Pages ativo. O site da Fase 6, no repositório do Erick, não foi alterado.

## Lucas - Integração, textos e revisão

Mesmo papel da Fase 6: juntar as partes e garantir que nada quebrou.

- Revisar e fazer o merge dos PRs do Pietro e do Erick.
- Atualizar a **Home** para "Fase 7" e trocar o número do grupo: o portal mostra **Grupo 75**
  nesta fase (hoje o site diz 86, em `Home.jsx` e `Footer.jsx`). **Confirmar o número com o grupo antes.**
- Preparar o espaço do link do vídeo da Fase 7 em `agrohub-react/src/data/pitches.js`
  (o da Fase 6 passa para a lista de vídeos anteriores).
- Padronizar as mensagens de carregando/erro das duas funcionalidades (mesmo tom de voz).
- Testar o site inteiro: as duas funcionalidades novas, notificações, favoritos, agendamento,
  no computador e no celular.
- Atualizar o `README.md` com as funcionalidades da Fase 7 e as APIs usadas.

**Pronto quando:** `main` do repositório da Fase 7 com tudo integrado, `npm run build` sem erro
e o site publicado funcionando em janela anônima.

## João - Vídeo, PDF e entrega

- **Roteiro do vídeo (até 3 min)**, sugestão:
  - 0:00-0:20 - o que é o AgroHub e o problema (desperdício de alimentos);
  - 0:20-1:10 - CEP automático no cadastro (CEP certo e CEP errado);
  - 1:10-2:00 - previsão do tempo para o produtor;
  - 2:00-2:40 - passada rápida pelo resto (excedente → notificação → ONG agenda/salva);
  - 2:40-3:00 - fechamento.
- Gravar **depois** que o Lucas avisar que o site publicado está pronto, gravando no site publicado.
- Publicar no YouTube como **público** e mandar o link para o Lucas colocar na Home.
- **PDF:** nomes completos dos 4 integrantes, Grupo, link do deploy e link do vídeo.
  Conferir os dois links em janela anônima antes de fechar.
- **ZIP final:** projeto sem `node_modules` + PDF, num único arquivo. Não incluir o vídeo.
- Enviar na plataforma na **terça (24/11) até 18h**.

---

## Cronograma

| Dia | O que acontece | Quem |
| --- | --- | --- |
| **Dom 22/11 (hoje)** | Repositório criado (feito). Pietro começa o CEP, Erick o clima, João escreve o roteiro | Pietro, Erick, João |
| **Seg 23/11** | **PRs do CEP e do clima abertos até 14h**. À tarde o Lucas integra, troca Home/Grupo e testa; o site publica sozinho. À noite: gravação, upload no YouTube, link na Home | Pietro, Erick, Lucas, João |
| **Ter 24/11** | PDF, ZIP e **envio até 18h** (prazo final 23h59) | João (+ Lucas conferindo) |

Se o CEP ou o clima não estiver pronto até segunda às 14h, o grupo entrega com o que estiver
funcionando: o vídeo pode mostrar só uma das duas funcionalidades novas.

## Dependências

- Pietro, Erick e João precisam ser adicionados como colaboradores do repositório (Lucas) para abrir branches.
- João só grava depois que o Lucas avisar que o site integrado está no ar (segunda à tarde).
- O link do vídeo na Home precisa de um novo deploy depois do upload (Lucas, segunda).
- O PDF só fecha com os dois links finais.
