let cardContainer = document.querySelector(".resultados");
let dados = [];
let searchInput = document.querySelector("#busca");

// Carrega os dados do JSON apenas uma vez ao abrir a página
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
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

// Ouvinte de digitação no campo de busca
searchInput.addEventListener("input", iniciarBusca);

// Função para renderizar os cards
function renderizarCards(lista) {
    cardContainer.innerHTML = ""; // Limpa os cards anteriores

    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
        return;
    }

    for (let dado of lista) {
    let article = document.createElement("article");
    article.classList.add("card");

    function nomeImagem(dadoNome) {
        switch(dadoNome.toLowerCase()) {
            case 'c++': return 'cpp.png';
            case 'c#': return 'csharp.png';
            default: return dadoNome.toLowerCase() + '.png';
        }
    }

    const anoExibido = dado.ano || dado.data_criacao || "Desconhecido";

    article.innerHTML = `
        <img src="imagens/${nomeImagem(dado.nome)}" alt="${dado.nome}" class="card-img">
        <h2>${dado.nome}</h2>
        <p>${anoExibido}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>
    `;

    cardContainer.appendChild(article);
}

}

// Carrega os dados quando a página abre
carregarDados();

