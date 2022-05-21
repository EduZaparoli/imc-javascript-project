var pacientes = document.querySelectorAll(".paciente"); //variavel paciente recebe o conteudo do id primeiro-paciente

for(var i=0; i<pacientes.length; i++){

    var paciente = pacientes[i];

    var tdPeso = paciente.querySelector(".info-peso"); //variavel tdPeso recebe a classe info-peso que esta na variavel paciente que armazena o conteudo de primeiro-paciente
    var peso = tdPeso.textContent; //variavel peso recebe o conteudo de texto que esta em tdPeso

    var tdAltura = paciente.querySelector(".info-altura"); //variavel tdAltura recebe oque esta na classe info-altura do html
    var altura = tdAltura.textContent; //variavel altura recebe o conteudo de texto que esta em tdAltura

    var tdImc = paciente.querySelector(".info-imc");

    var pesoEhValido = validaPeso(peso);
    var alturaEhValida = validaAltura(altura);

    if(!pesoEhValido){
        pesoEhValido = false;
        tdImc.textContent = "Peso Invalido";
        paciente.classList.add("paciente-invalido");
    }
    if(!alturaEhValida){
        alturaEhValida = false;
        tdImc.textContent = "Altura Invalida";
        paciente.classList.add("paciente-invalido"); //troca o background do paciente que esta errado
    }
    if(pesoEhValido == true && alturaEhValida == true){
        var imc = calculaImc(peso, altura);
        tdImc.textContent = imc;
    }
}

function validaPeso(peso){
    if(peso >= 0 && peso < 300){
        return true;
    }else{
        return false;
    }
}

function validaAltura(altura){
    if(altura >= 0 && altura <= 2.50){
        return true;
    }else{
        return false;
    }
}

function calculaImc(peso, altura){
    var imc = 0;
    imc = peso / (altura * altura);
    return imc.toFixed(2);
}