window.onload = function () {
    class Pessoa {
        constructor(nome, peso) {
            this._nome = nome;
            this._peso = peso;
        }

        get nome() {
            return this._nome;
        }

        get peso() {
            return this._peso;
        }
    }

    const btnAdicionar = document.querySelector('.adicionar');
    const btnBalancear = document.querySelector('.balancear');
    const btnLimpar = document.querySelector('.limpar');
    const inputNome = document.querySelector('.input-nome');
    const inputPeso = document.querySelector('.input-peso');
    const inputQtd = document.querySelector('.input-qtd-por-grupo');
    const contadorItens = document.querySelector('.contador');
    const tabela = document.querySelector('.tabela-nomes');

    let pessoas = [];
    let balanceado = [];

    function escreveTabela(item) {
        tabela.innerHTML += `
            <tr>
                <td class="nome">${item.nome}</td>
                <td class="peso">${item.peso}</td>
            </tr>`
    }

    function atualizaLista(lista) {
        tabela.innerHTML = "";

        lista.forEach(pessoa => {
            escreveTabela(pessoa);
        });
    };

    btnAdicionar.addEventListener('click', () => {
        if (inputNome.value != '' && inputPeso.value != '') {
            pessoas.push(new Pessoa(inputNome.value, inputPeso.value));
            contadorItens.innerHTML = `Quantidade de itens: ${pessoas.length}`;
            atualizaLista(pessoas);
        }
    });

    btnBalancear.addEventListener('click', () => {
        let qtdPorGp = inputQtd.value;
        balanceado = [];

        pessoas.sort(function (a, b) {
            if (parseInt(a.peso) > parseInt(b.peso))
                return 1;
            if (parseInt(a.peso) < parseInt(b.peso))
                return -1;

            return 0;
        });

        let pessoasInv = [];
        pessoas.forEach(i => {
            pessoasInv.push(i)
        });
        pessoasInv.reverse();

        for (let i = 0; i < Math.floor(pessoas.length / 2); i++) {
            balanceado.push(pessoasInv[i]);
            balanceado.push(pessoas[i]);
        }
        if (pessoas.length % 2 != 0) {
            balanceado.push(pessoas[Math.floor(pessoas.length / 2)]);
        }
        balanceado.reverse();

        console.log(pessoas);
        console.log(pessoasInv);
        console.log(balanceado);


        tabela.innerHTML = "";
        let grupo = 0;
        for (let i = 0; i < balanceado.length; i++) {
            if (i % qtdPorGp == 0) {
                grupo++;
                tabela.innerHTML += `<tr class="numero-grupos"><td colspan="2" style="text-align: center">Grupo ${grupo}</td></tr>`;
            }

            escreveTabela(balanceado[i]);
        }
    });

    btnLimpar.addEventListener('click', () => {
        pessoas = [];
        balanceado = [];
        tabela.innerHTML = '';
        inputNome.value = '';
        inputPeso.value = '';
        inputQtd.value = '';
        contadorItens.innerHTML = `Quantidade de itens: ${pessoas.length}`;
    });
};