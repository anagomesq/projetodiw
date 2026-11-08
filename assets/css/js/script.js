let artefatos = [];

const formulario = document.getElementById("formCadastro");
const tabela = document.getElementById("listaArtefatos");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

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

    artefatos.push(artefato);

    formulario.reset();

    alert("Artefato cadastrado!");
});