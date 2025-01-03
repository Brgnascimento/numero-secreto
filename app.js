let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Descubra um número de 1 a ${numeroLimite}:`);
} 

exibirMensagemInicial()


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* numeroLimite+1);
    let tamanhoLista = listaDeNumerosSorteados.length;
    if (numeroLimite==tamanhoLista){
        listaDeNumerosSorteados= []
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
    }

}

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas>1? 'tentativas':'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemTentativas); 
        tentativas=1
        document.getElementById('reiniciar').removeAttribute('disabled') 
    } else {
        if (chute>numeroSecreto) {
            exibirTextoNaTela('p', 'O número é menor');
        } else {
            exibirTextoNaTela('p', 'O número é maior');
        }
        tentativas++;
        limparCampo();
    }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value='';
}


function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true)
}