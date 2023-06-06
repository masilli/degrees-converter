//variaveis
var valor = document.getElementById("valor");
var result1 = document.getElementById("result1");
var result2 = document.getElementById("result2");
var grau1 = document.getElementById("grau1");
var grau2 = document.getElementById("grau2");
var grau3 = document.getElementById("grau3");

//botoes
var btn = document.getElementsByTagName("button");
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    var value = this.value;
    write(value);
  });
}

//botoes radio -> escolha temperatura
var radios = document.querySelectorAll('.escolha input[name="temp"]');
radios.forEach(function (radio) {
  radio.addEventListener("click", function () {
    mudarLetras();
    write();
    clearValor();
  });
});

//funcao mudarLetras
function mudarLetras() {
  var escolha = document.querySelector('.escolha input[name="temp"]:checked');
  if (escolha) {
    var selectedValue = escolha.value;
    var labels = {
      "tempc": { grau1: "ºC", grau2: "ºF", grau3: "ºK" },
      "tempf": { grau1: "ºF", grau2: "ºC", grau3: "ºK" },
      "tempk": { grau1: "ºK", grau2: "ºC", grau3: "ºF" }
    };
    var selectedLabels = labels[selectedValue];
    
    if (selectedLabels) {
      grau1.innerHTML = selectedLabels.grau1;
      grau2.innerHTML = selectedLabels.grau2;
      grau3.innerHTML = selectedLabels.grau3;
      [grau1, grau2, grau3].forEach(function (el) {
        el.classList.remove("turn");
        setTimeout(function() {
          el.classList.add("turn");
        }, 10);
      });
    }
  }
}

//function write
function write(value) {
  var conteudo = valor ? valor.innerHTML : "";

  //prevenir mais do que 1 ponto
  var decimal = conteudo.includes(".");
  if (value === "." && decimal) {
    return;
  }

  //sinal negativo apenas permitido no início
  var negativo = value === "-";
  if (negativo && conteudo !== "") {
    return;
  }

  //prevenir mais do que 1 zero no início
  var zero = value === "0";
  var numero1 = conteudo.charAt(0);
  if (numero1 === "0" && zero && conteudo.length === 1) {
    return;
  }

  //limitar número a 10 digitos
  if (conteudo.length < 10) {
    valor.innerHTML += value;
  } else {
    return;
  }

  //converte o conteudo de 'valorC' em numero decimal
  var c = parseFloat(valor.innerHTML);

  //se nao for numero nao mostra nada
  //se for numero faz a conversao
  if (isNaN(c)) {
    result1.innerHTML = "";
    result2.innerHTML = "";
  } else {
    var cToF = (c * 1.8) + 32;
    var cToK = c + 273.15;
    var fToC = (c - 32) / 1.8;
    var fToK = ((c - 32) * 5) / 9 + 273.15;
    var kToC = c - 273.15;
    var kToF = ((c - 273.15) * 9) / 5 + 32;

    var escolha = document.querySelector('.escolha input[name="temp"]:checked');
    
    //apresenta o resultado consoante a escolha
    //aplica 2 casas decimais aos resultados
    if (escolha) {
      var selectedValue = escolha.value;
      if (selectedValue === "tempc") {
        result1.innerHTML = cToF.toFixed(2);
        result2.innerHTML = cToK.toFixed(2);
      } else if (selectedValue === "tempf") {
        result1.innerHTML = fToC.toFixed(2);
        result2.innerHTML = fToK.toFixed(2);
      } else if (selectedValue === "tempk") {
        result1.innerHTML = kToC.toFixed(2);
        result2.innerHTML = kToF.toFixed(2);
      }
    }
  }
}

//funcao limpar
function clearValor() {
  valor.innerHTML = "";
  result1.innerHTML = "";
  result2.innerHTML = "";
}