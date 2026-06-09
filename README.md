# RB Eventos

Estrutura sugerida para manter o projeto organizado e facilitar novas paginas, eventos e assets:

- `index.html`: pagina inicial e ponto de entrada do site.
- `pages/`: paginas internas do site.
- `pages/eventos/`: landing pages individuais de cada evento.
- `assets/styles/`: estilos globais, por pagina e por evento.
- `assets/scripts/`: scripts compartilhados e scripts especificos de eventos.
- `assets/images/`: imagens separadas por contexto de uso.
- `archive/`: arquivos antigos, prototipos ou testes que nao devem participar da navegacao principal.

Padrao para expansao:

1. Nova pagina institucional: criar HTML em `pages/` e CSS em `assets/styles/pages/`.
2. Novo evento: criar HTML em `pages/eventos/`, CSS em `assets/styles/events/` e JS em `assets/scripts/events/`.
3. Novas imagens: salvar em `assets/images/` dentro da categoria mais proxima do uso.

## Como adicionar eventos no index

A secao de eventos da pagina inicial fica em `index.html`, dentro da `section` com `id="eventos"`.

Para adicionar um novo evento em um mes existente:

1. Localize o ano em `.event-year-group`.
2. Localize o mes em `.event-month-group`.
3. Duplique um `.event-card` dentro da `.events-grid` daquele mes.
4. Atualize imagem, data, titulo, local, status e links do card.

Para adicionar um novo mes em 2026:

1. Dentro do grupo do ano `2026`, duplique o bloco `.event-month-group`.
2. Altere o titulo em `.event-month-title` para o novo mes, por exemplo `Agosto`.
3. Adicione os cards dentro da `.events-grid` desse novo mes.
4. So crie meses que ja tenham eventos cadastrados.

Para adicionar eventos encerrados de 2025:

1. Adicione o card diretamente na `.events-grid` do grupo `2025`.
2. Use `data-status="encerrado"` no `.event-card`.
3. Use a tag visual `<span class="card-status-pill status-encerrado">Encerrado</span>`.
4. Se nao houver pagina individual do evento, use o botao desabilitado `Evento Encerrado`.

Status aceitos pelos filtros:

- `data-status="aberto"` para inscricoes abertas.
- `data-status="breve"` para eventos em breve.
- `data-status="encerrado"` para eventos encerrados.
