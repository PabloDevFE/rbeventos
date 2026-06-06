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
