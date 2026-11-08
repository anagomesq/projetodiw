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

