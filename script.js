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

// Função para renderizar cards
function renderizarCards(lista) {
    cardContainer.innerHTML = ""; // Limpa os cards anteriores

    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhuma linguagem encontrada.</p>";
        return;
    }

    for (let dado of lista) {
        let article = document.createElement("article");
        article.classList.add("card");

        // Mapa de imagens
        const imagens = {
            "javascript": "javascript.png",
            "python": "python.png",
            "java": "java.png",
            "php": "php.png",
            "c++": "cpp.png",
            "c#": "csharp.png",
            "typescript": "typescript.png",
            "go": "go.png",
            "rust": "rust.png",
            "react": "react.png",
            "vue.js": "vue.png",
            "angular": "angular.png",
            "kotlin": "kotlin.png",
            "swift": "swift.png",
            "postgresql": "postgresql.png",
            "mongodb": "mongodb.png",
            "redis": "redis.png",
            "docker": "docker.png",
            "kubernetes (k8s)": "kubernetes.png",
            "terraform": "terraform.png",
            "next.js": "nextjs.png",
            "nestjs": "nestjs.png",
            "graphql": "graphql.png",
            "kafka": "kafka.png",
            "svelte": "svelte.png",
            "scala": "scala.png",
            "elixir": "elixir.png",
            "erlang": "erlang.png",
            "haskell": "haskell.png",
            "jira": "jira.png",
            "prometheus": "prometheus.png",
            "aws lambda": "aws.png",
            "tensorflow": "tensorflow.png",
            "gcp (google cloud platform)": "gcp.png"
        };

        // Seleciona a imagem correta
        const nomeImagem = imagens[dado.nome.toLowerCase()] || "default.png";

        // Define o ano (ou data_criacao) para não dar undefined
        const ano = dado.ano || dado.data_criacao || "—";

        article.innerHTML = `
            <img src="imagens/${nomeImagem}" alt="${dado.nome}" class="card-img">
            <h2>${dado.nome}</h2>
            <p>${ano}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;

        cardContainer.appendChild(article);
    }
}

// Carrega os dados ao abrir a página
carregarDados();
