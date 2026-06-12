# RB Eventos

Site estatico da RB Eventos Esportivos.

Dominio de producao: `https://rbeventosesportivos.com.br/`

## Estrutura do projeto

- `index.html`: pagina inicial e ponto de entrada do site.
- `pages/`: paginas internas institucionais.
- `pages/eventos/`: landing pages individuais de eventos.
- `assets/styles/`: estilos globais, por pagina e por evento.
- `assets/scripts/`: scripts compartilhados e scripts especificos de eventos.
- `assets/images/`: imagens separadas por contexto de uso.
- `assets/images/events/`: imagens especificas de eventos ativos e encerrados.
- `assets/images/seo/`: imagens de compartilhamento Open Graph.
- `robots.txt`: regras de indexacao para buscadores.
- `sitemap.xml`: mapa das paginas publicas do site.
- `checklist.txt`: checklist complementar de SEO/publicacao.

## Estado da primeira versao

- Paginas publicas com `title`, `meta description`, canonical, Open Graph, Twitter Cards e JSON-LD.
- Imagens OG configuradas:
  - `assets/images/seo/og-base.jpg` para Home, Quem Somos e Fale Conosco.
  - `assets/images/seo/og-circuito-sete-lagoas.jpg` para Circuito Sete Lagoas.
- `robots.txt` aponta para `https://rbeventosesportivos.com.br/sitemap.xml`.
- Formulario da pagina Fale Conosco esta desativado ate existir envio real.
- Botao Galeria RB esta desativado ate a galeria oficial estar pronta.
- Clientes e parceiros da pagina Quem Somos estao com links externos seguros.
- Bloco antigo escondido `eventos-antigos` foi removido do `index.html`.
- Referencias antigas a `bg.png`, `serra-hero.png`, logos antigas e placeholders externos foram limpas.

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

Para adicionar eventos encerrados:

1. Adicione o card dentro do grupo do ano correspondente.
2. Use `data-status="encerrado"` no `.event-card`.
3. Use a tag visual `<span class="card-status-pill status-encerrado">Encerrado</span>`.
4. Se nao houver pagina individual do evento, use o botao desabilitado `Evento Encerrado`.

Status aceitos pelos filtros:

- `data-status="aberto"` para inscricoes abertas.
- `data-status="breve"` para eventos em breve.
- `data-status="encerrado"` para eventos encerrados.

## Como publicar novos arquivos de imagem

- Hero da home: usar imagem horizontal em `assets/images/home/`, idealmente `1920x800`.
- Hero Quem Somos: usar imagem horizontal em `assets/images/about/`, idealmente `1920x700`.
- Hero de evento: usar imagem horizontal grande em `assets/images/events/<slug-do-evento>/`, idealmente `1920x1080` ou `2560x1440` otimizada.
- OG compartilhamento: usar `1200x630`, JPG, ate cerca de 1 MB.
- Sempre comprimir imagens grandes antes de publicar.

## Pente fino feito nesta revisao

- Conferidos caminhos locais de `href`, `src` e `url(...)` em CSS.
- Conferidos JSON-LD das paginas publicas.
- Conferidos links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- Conferidos arquivos de imagem usados nas paginas.
- Identificadas imagens grandes que devem ser otimizadas depois:
  - `pages/eventos/eventos-img/kit.png`
  - `pages/eventos/eventos-img/circuito-sete.jpeg`
  - `assets/images/events/past/betim/capa-card.png`
  - `assets/images/events/biathlon-bv/hero.png`
  - `pages/eventos/eventos-img/trofeu.jpeg`
  - `assets/images/about/foto-rodrigobelles.jpeg`

## Proximos passos recomendados

1. Publicar o site e validar `https://rbeventosesportivos.com.br/robots.txt`.
2. Publicar e validar `https://rbeventosesportivos.com.br/sitemap.xml`.
3. Enviar o sitemap no Google Search Console.
4. Rodar Lighthouse em mobile e desktop depois do deploy.
5. Testar dados estruturados no Rich Results Test do Google.
6. Testar compartilhamento no WhatsApp, Facebook Debugger e OpenGraph.xyz.
7. Criar endpoint real para o formulario ou trocar por envio via WhatsApp/e-mail.
8. Criar pagina de Politica de Privacidade antes de ativar analytics, pixels ou formularios reais.
9. Ativar o botao Galeria RB quando houver link oficial de fotos.
10. Criar paginas individuais para eventos encerrados importantes com fotos, resultados e detalhes.
11. Atualizar o JSON-LD dos eventos com endereco completo, CEP, geolocalizacao e lotes quando estiverem definidos.
12. Converter/comprimir imagens pesadas para WebP/JPG otimizado.
13. Remover arquivos antigos do Git quando tiver certeza de que nao serao mais usados.

## Checklist rapido antes de cada deploy

1. Conferir se nenhuma imagem local esta quebrada.
2. Conferir se `sitemap.xml` inclui todas as paginas publicas.
3. Conferir se paginas novas possuem title, description, canonical, OG e JSON-LD quando fizer sentido.
4. Conferir se links externos com nova aba usam `rel="noopener noreferrer"`.
5. Conferir se o evento principal aponta para Sympla somente nos botoes de inscricao.
