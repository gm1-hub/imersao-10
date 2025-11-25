let cardContainer = document.querySelector(".resultados");
let dados = [];
let searchInput = document.querySelector("#busca");

// Carrega os dados do JSON
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Mostra todos os cards ao abrir
}

// Função de busca
function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase().trim();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(dadosFiltrados);
}

// Ouvinte de digitação
searchInput.addEventListener("input", iniciarBusca);

// Função para renderizar cards SEM IMAGENS
function renderizarCards(lista) {
    cardContainer.innerHTML = ""; // Limpa os cards anteriores

    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
        return;
    }

    for (let dado of lista) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Define o ano (ou data_criacao) para não dar undefined
        const ano = dado.ano || dado.data_criacao || "—";

        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano:</strong> ${ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;

        cardContainer.appendChild(article);
    }
}

// Carrega os dados ao abrir a página
carregarDados();
