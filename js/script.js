const botoesAdocao = document.querySelectorAll(".btn-adocao");

const btnTodosGatos = document.querySelector("#btn-todos-gatos");

const form = document.querySelector("form");

const inputNome = document.querySelector("#nome");
const inputEmail = document.querySelector("#email");
const inputAssunto = document.querySelector("#assunto");
const inputMensagem = document.querySelector("#mensagem");

const btnEnviarMensagem = document.querySelector("#btn-enviar-mensagem");


// =========================
// FORMULÁRIO
// =========================

if (form) {

    form.addEventListener("submit", (evento) => {

        evento.preventDefault();
        
        const formFeedback = document.querySelector("#form-feedback")

        formFeedback.classList.remove("oculto");

    });

}


// =========================
// HEADER
// =========================

fetch("header.html")
    .then(resposta => resposta.text())
    .then(html => {

        document.getElementById("header-placeholder").innerHTML = html;

        const btnHeaderAdocao = document.querySelector("#btn-header-adocao");

        btnHeaderAdocao.addEventListener("click", () => {

            window.location.href = "gatos.html";

        });

    })
    .catch(erro => console.error("Erro ao carregar o header:", erro));