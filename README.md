# 🐾 Patinhas: Site de Adoção de Gatinhos

Meu primeiro projeto de portfólio como desenvolvedor júnior: um site fictício de adoção de gatos, feito em HTML, CSS e JavaScript puro, sem nenhum framework.

## O que o site faz

- Vitrine de gatinhos disponíveis para adoção, com filtro por categoria (filhote, adulto, idoso)
- Modal com detalhes de cada gato
- Sistema de favoritos, salvo no `localStorage` do navegador
- Formulário de contato com validação e feedback visual ao enviar
- Formulário de adoção completo (dados do adotante, sobre o lar, sobre a adoção, termo de responsabilidade), com:
  - pré-preenchimento automático do gato escolhido (via parâmetro na URL)
  - uma pergunta que só aparece se você marcar que o imóvel é alugado
  - página de confirmação ao final
- Totalmente responsivo (testado em desktop, tablet e celular)

## Tecnologias

HTML5, CSS3 (Grid e Flexbox) e JavaScript puro (sem bibliotecas de front-end). Ícones via Lucide e Font Awesome.

## Como rodar localmente

Não precisa de instalação nenhuma. É só abrir com um servidor local (recomendo a extensão Live Server do VS Code) a partir da pasta `html/`.

## O que eu aprendi de verdade fazendo esse projeto

Não quero deixar isso genérico, então vou contar os problemas reais que apareceram no caminho. Foi debugando eles que eu realmente aprendi.

**Caminho relativo vs. absoluto muda tudo no deploy.** Eu usava `/css/style.css` (com barra no início) em todo o projeto, e funcionava certinho no Live Server. O problema é que isso só dá certo se o site estiver hospedado na raiz do domínio. No GitHub Pages de projeto (`usuario.github.io/nome-do-repo/`), esse caminho quebra, porque a barra inicial sempre aponta pra raiz do domínio, não do repositório. Troquei tudo para caminho relativo (`../css/style.css`) e passou a funcionar nos dois cenários.

**Especificidade do CSS pode te surpreender.** Tive dois bugs parecidos: um elemento que deveria estar escondido (`.oculto`, com `display: none`) continuava aparecendo porque outra classe (`.form-group`, com `display: flex`) estava "ganhando" a disputa. Resolvi entendendo que, quando duas classes competem pela mesma propriedade, o CSS carregado por último tende a vencer (e usando `!important` no caso da classe utilitária, que deveria sempre valer). O outro foi uma regra genérica (`.form-group input`) afetando radio buttons e checkboxes sem eu querer, porque ela não distinguia o `type` do input. Resolvi com um seletor mais específico, `input[type="radio"]`.

**`aspect-ratio` é melhor que `height` fixo para imagens responsivas.** Eu tinha `width: 100%` (fluido) e `height: 180px` (fixo) na mesma imagem. Em telas estreitas isso distorcia a proporção e cortava a foto de forma feia. Trocar `height` fixo por `aspect-ratio: 1/1` resolveu, porque os dois lados passam a escalar juntos, mantendo a proporção em qualquer largura de tela.

**Radio button e checkbox parecem iguais mas têm papéis diferentes.** Radio serve para "escolha uma entre várias opções" (por isso todos do mesmo grupo compartilham o `name`); checkbox serve para uma pergunta isolada de sim/não, e cada um tem seu próprio `name`.

**`URLSearchParams` para passar informação entre páginas.** Para o gato escolhido no modal chegar já selecionado no formulário de adoção, usei um parâmetro na URL (`formulario.html?gato=Luis`) e li ele do lado do formulário com `new URLSearchParams(window.location.search).get("gato")`, sem precisar de nenhum banco de dados ou back-end.

**Duas variáveis com o mesmo nome, em arquivos diferentes, quebram tudo.** Tive um `const form` declarado tanto no `script.js` quanto no `formulario.js`. Como as duas páginas carregavam os dois arquivos, isso gerava um erro de "variável duplicada" que travava a execução do script inteiro, sem nenhum aviso visual óbvio na tela. Foi resolvido só olhando o console do navegador.

**Dividir o CSS em vários arquivos exige decidir "de quem" é cada classe.** Separei em arquivos por escopo (`base`, `header`, `components`, e um por página). O critério foi: se uma classe aparece em mais de uma página, ela vai para um arquivo compartilhado; se é exclusiva de uma página, fica no arquivo daquela página.

## Estrutura de pastas

```
projetofelino/
├── css/
│   ├── base.css
│   ├── header.css
│   ├── components.css
│   ├── index.css
│   ├── gatos.css
│   ├── favoritos.css
│   └── confirmacao.css
├── html/
│   ├── index.html
│   ├── gatos.html
│   ├── favoritos.html
│   ├── formulario.html
│   ├── confirmacao.html
│   └── header.html
├── imgs/
└── js/
    ├── script.js
    ├── gatos.js
    └── formulario.js
```
