const catsContainer = document.querySelector(".cats-container");
const favoritesContainer = document.querySelector(".favorites-container");

// =========================
// GATOS
// =========================

const gatos = [
    {
        nome: "Mel",
        idade: "2 anos",
        personalidade: "Dócil e brincalhona",
        imagem: "../imgs/Mel.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Fred",
        idade: "3 anos",
        personalidade: "Carinhoso e tranquilo",
        imagem: "../imgs/Fred.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Luna",
        idade: "1 ano",
        personalidade: "Curiosa e carinhosa",
        imagem: "../imgs/Luna.jpeg",
        categoria: "filhote"
    },
    {
        nome: "Zeus",
        idade: "4 anos",
        personalidade: "Calmo e companheiro",
        imagem: "../imgs/Zeus.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Nina",
        idade: "2 anos",
        personalidade: "Brincalhona e amorosa",
        imagem: "../imgs/Nina.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Simba",
        idade: "3 anos",
        personalidade: "Dócil e brincalhão",
        imagem: "../imgs/Simba.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Mia",
        idade: "1 ano",
        personalidade: "Carinhosa e divertida",
        imagem: "../imgs/Mia.jpeg",
        categoria: "filhote"
    },
    {
        nome: "Luis",
        idade: "8 anos",
        personalidade: "Tranquilo e carinhoso",
        imagem: "../imgs/Luis.jpeg",
        categoria: "idoso"
    },
    {
        nome: "George",
        idade: "2 anos",
        personalidade: "Curioso e brincalhão",
        imagem: "../imgs/George.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Panqueca",
        idade: "1 ano",
        personalidade: "Dócil e brincalhona",
        imagem: "../imgs/Panqueca.jpeg",
        categoria: "filhote"
    },
    {
        nome: "Thor",
        idade: "4 anos",
        personalidade: "Companheiro e amoroso",
        imagem: "../imgs/Thor.jpeg",
        categoria: "adulto"
    },
    {
        nome: "Amora",
        idade: "2 anos",
        personalidade: "Carinhosa e tranquila",
        imagem: "../imgs/Amora.jpeg",
        categoria: "adulto"
    }
];


// =========================
// CONFIGURAÇÕES
// =========================

let quantidadeGatos = 8;
let gatosAtuais = gatos;

let favoritos = localStorage.getItem("favoritos")
    ? JSON.parse(localStorage.getItem("favoritos"))
    : [];


// =========================
// EMBARALHAR GATOS
// =========================

function embaralhar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


const gatosParaExibir = document.querySelector("#cats-preview")
    ? embaralhar(gatos).slice(0, 4)
    : gatos;


// =========================
// TEMPLATE DO CARD
// =========================

function criarCardHTML(gato, { comBotaoRemover = false } = {}) {

    return `
        <article class="cat-card">

            <img src="${gato.imagem}" alt="${gato.nome}">

            <h3>${gato.nome}</h3>

            <p>
                ${gato.idade} • ${gato.personalidade}
            </p>

            <div class="cat-tags">
                <span class="tag-vacinado">Vacinado</span>
                <span class="tag-vermifugado">Vermifugado</span>
            </div>

            <button class="btn-conhecer" data-nome="${gato.nome}">
                Quero conhecer
            </button>

            ${comBotaoRemover
                ? `<button class="btn-remover-favorito" data-nome="${gato.nome}">♥</button>`
                : ""
            }

        </article>
    `;
}


// =========================
// ABRIR MODAL
// =========================

function abrirModal(gato) {

    const modal = document.createElement("div");

    modal.classList.add("modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", `Detalhes de ${gato.nome}`);

    modal.innerHTML = `
        <button class="btn-fechar" aria-label="Fechar">×</button>

        <div class="modal-content">

            <h2>${gato.nome}</h2>

            <img src="${gato.imagem}" alt="${gato.nome}">

            <p>Disponível para adoção</p>

            <p>${gato.idade}</p>

            <p>${gato.personalidade}</p>

            <div class="modal-actions">

                <button class="btn-favoritar">♡</button>

                <a href="formulario.html?gato=${gato.nome}" class="btn-adotar">Quero adotar!</a>

            </div>

        </div>
    `;


    document.body.appendChild(modal);


    // =========================
    // FECHAR MODAL (botão, clique fora, Esc)
    // =========================

    function fecharModal() {
        modal.remove();
        document.removeEventListener("keydown", fecharComEsc);
    }

    function fecharComEsc(evento) {
        if (evento.key === "Escape") {
            fecharModal();
        }
    }

    document.addEventListener("keydown", fecharComEsc);


    const btnFechar = modal.querySelector(".btn-fechar");
    btnFechar.focus();

    btnFechar.addEventListener("click", () => {
        fecharModal();
    });

    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            fecharModal();
        }
    });


    // =========================
    // BOTÃO FAVORITAR
    // =========================

    const btnFavoritar = modal.querySelector(".btn-favoritar");

    if (favoritos.includes(gato.nome)) {

        btnFavoritar.textContent = "♥";

        btnFavoritar.classList.add("favoritado");
    }


    btnFavoritar.addEventListener("click", () => {

        if (btnFavoritar.textContent === "♥") {

            btnFavoritar.textContent = "♡";

            btnFavoritar.classList.remove("favoritado");

            favoritos = favoritos.filter(nome => {
                return nome !== gato.nome;
            });

        } else {

            btnFavoritar.textContent = "♥";

            btnFavoritar.classList.add("favoritado");

            if (!favoritos.includes(gato.nome)) {

                favoritos.push(gato.nome);
            }
        }

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );
    });
}


// =========================
// MOSTRAR GATOS
// =========================

function mostrarGatos(listaGatos) {

    catsContainer.innerHTML = "";


    listaGatos
        .slice(0, quantidadeGatos)
        .forEach(gato => {
            catsContainer.innerHTML += criarCardHTML(gato);
        });


    // =========================
    // BOTÕES "QUERO CONHECER"
    // =========================

    const botoesConhecer =
        catsContainer.querySelectorAll(".btn-conhecer");


    botoesConhecer.forEach(botao => {

        botao.addEventListener("click", evento => {

            const nomeGato = evento.target.dataset.nome;

            const gato = gatos.find(gato => {
                return gato.nome === nomeGato;
            });

            abrirModal(gato);
        });
    });
}


// =========================
// MOSTRAR FAVORITOS
// =========================

function mostrarFavoritos() {

    favoritesContainer.innerHTML = "";

    if (favoritos.length === 0) {
        favoritesContainer.innerHTML = `
         <p class="mensagem-vazia">Você ainda não salvou nenhum gatinho.</p>
        `;
        return;
    }

    const gatosFavoritos = favoritos
        .map(nome => {

            return gatos.find(gato => {
                return gato.nome === nome;
            });

        })
        .filter(gato => gato !== undefined);


    gatosFavoritos.forEach(gato => {
        favoritesContainer.innerHTML += criarCardHTML(gato, { comBotaoRemover: true });
    });


    // =========================
    // BOTÕES "QUERO CONHECER"
    // =========================

    const botoesConhecer =
        favoritesContainer.querySelectorAll(".btn-conhecer");


    botoesConhecer.forEach(botao => {

        botao.addEventListener("click", evento => {

            const nomeGato = evento.target.dataset.nome;

            const gato = gatos.find(gato => {
                return gato.nome === nomeGato;
            });

            abrirModal(gato);
        });
    });


    // =========================
    // BOTÕES REMOVER FAVORITO
    // =========================

    const botoesRemover =
        favoritesContainer.querySelectorAll(
            ".btn-remover-favorito"
        );


    botoesRemover.forEach(botao => {

        botao.addEventListener("click", () => {

            const nomeGato = botao.dataset.nome;

            favoritos = favoritos.filter(nome => {
                return nome !== nomeGato;
            });


            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );


            mostrarFavoritos();
        });
    });
}


// =========================
// INICIALIZAÇÃO
// =========================

if (catsContainer) {
    mostrarGatos(gatosParaExibir);
}


if (favoritesContainer) {
    mostrarFavoritos();
}


// =========================
// CARREGAR MAIS
// =========================

const btnCarregarMais =
    document.querySelector("#btn-carregar-mais");


if (btnCarregarMais) {

    btnCarregarMais.addEventListener("click", () => {

        quantidadeGatos += 4;

        mostrarGatos(gatosAtuais);
    });
}


// =========================
// FILTROS
// =========================

const botoesFiltro =
    document.querySelectorAll(".filter-btn");


botoesFiltro.forEach(botao => {

    botao.addEventListener("click", evento => {

        evento.preventDefault();


        botoesFiltro.forEach(botaoFiltro => {
            botaoFiltro.classList.remove("active");
        });


        botao.classList.add("active");


        const categoriaSelecionada = botao.dataset.categoria;


        gatosAtuais =
            categoriaSelecionada === "todos"
                ? gatos
                : gatos.filter(gato => {
                    return gato.categoria === categoriaSelecionada;
                });


        quantidadeGatos = 8;


        mostrarGatos(gatosAtuais);
    });
});