const selectGato = document.querySelector("#gato-select");

gatos.forEach(gato => {
    const opcao = document.createElement("option");
    opcao.textContent = gato.nome;
    opcao.value = gato.nome;

    selectGato.appendChild(opcao);
});

const parametros = new URLSearchParams(window.location.search);
const nomeGatoNaUrl = parametros.get("gato");

if(nomeGatoNaUrl) {
    selectGato.value = nomeGatoNaUrl;
}
const radiosTipoImovel = document.querySelectorAll('input[name="tipoImovel"]');
const perguntaProprietario = document.querySelector("#pergunta-proprietario");

radiosTipoImovel.forEach(radio => {
   radio.addEventListener("change", (e) => {
        if (radio.value === "alugado") {
            perguntaProprietario.classList.remove("oculto");
        } else {
    perguntaProprietario.classList.add("oculto");
}
    });
})

const formAdocao = document.querySelector("form");

formAdocao.addEventListener("submit", (evento) => {
    evento.preventDefault();
    window.location.href = "confirmacao.html";
});