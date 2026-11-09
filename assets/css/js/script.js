let artefatos = JSON.parse(localStorage.getItem("artefatos")) || [];

let indiceEdicao = null;

const formulario = document.getElementById("formCadastro");
const tabela = document.getElementById("listaArtefatos");

const busca = document.getElementById("busca");
const filtro = document.getElementById("filtro");
const ordem = document.getElementById("ordem");



function salvarDados() {
    localStorage.setItem("artefatos", JSON.stringify(artefatos));
}



formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const artefato = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        material: document.getElementById("material").value,
        periodo: document.getElementById("periodo").value,
        localizacao: document.getElementById("localizacao").value,
        conservacao: document.getElementById("conservacao").value,
        data: document.getElementById("data").value,
        descricao: document.getElementById("descricao").value
    };

    if (indiceEdicao === null) {

        artefatos.push(artefato);
        alert("Artefato cadastrado com sucesso!");

    } else {

        artefatos[indiceEdicao] = artefato;
        indiceEdicao = null;

        document.getElementById("btnSalvar").textContent = "Salvar";

        alert("Artefato atualizado com sucesso!");
    }

    salvarDados();
    listarArtefatos();

    formulario.reset();

});


function listarArtefatos() {
    tabela.innerHTML = "";

    artefatos.forEach(function(artefato, index) {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${artefato.nome}</td>
            <td>${artefato.categoria}</td>
            <td>${artefato.periodo}</td>
            <td>${artefato.conservacao}</td>
            <td>
                <button onclick="verDetalhes(${index})">Ver</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

function verDetalhes(indice) {

    const item = artefatos[indice];

    document.getElementById("conteudoDetalhes").innerHTML = `
        <h3>${item.nome}</h3>

        <ul>
            <li>Categoria: ${item.categoria}</li>
            <li>Material: ${item.material}</li>
            <li>Período: ${item.periodo}</li>
            <li>Localização: ${item.localizacao}</li>
            <li>Conservação: ${item.conservacao}</li>
            <li>Data: ${item.data}</li>
            <li>Descrição: ${item.descricao}</li>
        </ul>
    `;

}

function editarArtefato(indice) {

    const item = artefatos[indice];

    document.getElementById("nome").value = item.nome;
    document.getElementById("categoria").value = item.categoria;
    document.getElementById("material").value = item.material;
    document.getElementById("periodo").value = item.periodo;
    document.getElementById("localizacao").value = item.localizacao;
    document.getElementById("conservacao").value = item.conservacao;
    document.getElementById("data").value = item.data;
    document.getElementById("descricao").value = item.descricao;

    indiceEdicao = indice;

    document.getElementById("btnSalvar").textContent = "Atualizar";

    document.getElementById("cadastro").scrollIntoView();

}

function excluirArtefato(indice) {

    if (confirm("Deseja realmente excluir este artefato?")) {

        artefatos.splice(indice, 1);

        salvarDados();
        listarArtefatos();

        alert("Artefato excluído!");
    }

}

busca.addEventListener("input", listarArtefatos);
filtro.addEventListener("change", listarArtefatos);
ordem.addEventListener("change", listarArtefatos);


document.getElementById("formAPI").addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const termo = document.getElementById("buscaAPI").value;

    const resultadosAPI = document.getElementById("resultadosAPI");

    resultadosAPI.innerHTML = "Pesquisando...";

    try {

        const resposta = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1.1/search?q=${encodeURIComponent(termo)}&departmentId=10`
        );

        const dados = await resposta.json();

        resultadosAPI.innerHTML = "";

        if (!dados.objectIDs) {
            resultadosAPI.innerHTML = "Nenhum artefato encontrado.";
            return;
        }

        const ids = dados.objectIDs.slice(0, 5);

        for (let id of ids) {

            const respostaObjeto = await fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );

            const objeto = await respostaObjeto.json();

            const artigo = document.createElement("article");

            artigo.innerHTML = `
                <h3>${objeto.title}</h3>

                <p>Material: ${objeto.medium || "Não informado"}</p>

                <button type="button">Adicionar ao sistema</button>
            `;

            artigo.querySelector("button").addEventListener("click", function() {

                artefatos.push({
                    nome: objeto.title,
                    categoria: "estatua",
                    material: objeto.medium || "Não informado",
                    periodo: "nao-identificado",
                    localizacao: "Não informada",
                    conservacao: "regular",
                    data: new Date().toISOString().slice(0, 10),
                    descricao: "Artefato importado do Metropolitan Museum."
                });

                salvarDados();
                listarArtefatos();

                alert("Artefato adicionado com sucesso!");

            });

            resultadosAPI.appendChild(artigo);

        }

    } catch (erro) {

        resultadosAPI.innerHTML = "Erro ao consultar a API.";

    }

});

