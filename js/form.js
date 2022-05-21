var botaoAdicionar = document.querySelector("#adicionar-paciente"); //botaoAdicionar seleciona o id do botão adicionar-paciente
botaoAdicionar.addEventListener("click", function(event){ //adiciona um evento de click na variavel botaoAdicionar
    event.preventDefault(); //faz com que a pagina não seja recarregada ao clicar no botao

    var form = document.querySelector("#form-adiciona"); //a variavel form seleciona o id do form-adiciona
    
    //var paciente recebe a extração dos valores de nome, peso, altura e gordura
    var paciente = obtemPacienteDoFormulario(form);

    //var paciente recebe a funçaõ que cria um tr para cada paciente
    var pacienteTr = montaTr(paciente);

    // var erros recebe a funcao que valida se o paciente pode ser adicionado
    var erros = validaPaciente(paciente);

    //se tiver algum erro exibe a mensagem e sai da função
    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }

    //adiciona o paciente na tabela
    var tabela = document.querySelector("#tabela-pacientes");
    var mensagensErro = document.querySelector("#mensagens-erro");

    //adiciona um elemento filho (pacienteTr) ao elemento pai (tabela) na ultima posição
    tabela.appendChild(pacienteTr);

    adicionaPacienteNaTabela(paciente);

    //apos clicar no botao reseta o formulario
    form.reset();

    //se não tiver nenhum erro não exibe nenhuma mensagem
    mensagensErro.innerHTML = "";
    
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }

    return paciente;
}

function montaTr(paciente){
    //cria uma tr
    var pacienteTr = document.createElement("tr");

    //coloca uma classe na tr
    pacienteTr.classList.add("paciente");

    //para cada tr vai colocar um filho que vai ser criado com a função montaTd
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

function montaTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(!validaPeso(paciente.peso)){
        erros.push("O peso é inválido!");
    }
    if(!validaAltura(paciente.altura)){
        erros.push("A altura é inválida!");
    }
    if(paciente.nome.length == 0){
        erros.push("Insira o nome do paciente!");
    }
    if(paciente.gordura == 0){
        erros.push("Insira a % de gordura do paciente!");
    }
    if(paciente.peso.length == 0){
        erros.push("Insira o peso do paciente!");
    }
    if(paciente.altura.length == 0){
        erros.push("Insira a altura do paciente!");
    }

    return erros;
}