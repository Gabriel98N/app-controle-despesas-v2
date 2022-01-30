import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import debounce from "./debounce.js";

const dom = Dom();

function Cartao() {
  const storageDados = JSON.parse(localStorage.getItem("dados"));
  const active = "active";

  const storageTransacao = JSON.parse(localStorage.getItem("transacao"));
  const arrTransacao = storageTransacao ? storageTransacao : [];
  const containerTabela = dom.el(".container-tabela");

  const arrValores = {
    totalSaldo: [],
    totalDespesa: [],
  };

  function mostrarCard(btn, element, classe) {
    const button = dom.el(btn);
    const card = dom.el(`[data-card="${element}"]`);
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        card.classList.add(classe);
        outsideEvent(
          card,
          () => {
            card.classList.remove(classe);
          },
          ["click"]
        );
      });
    }
  }

  function criarSelectBanco() {
    if (storageDados) {
      const btnCartao = dom.el(".btn-cartao");
      const select = dom.el(".select");

      if (btnCartao && select) {
        btnCartao.disabled = false;
        btnCartao.addEventListener("click", (e) => {
          e.preventDefault();
          select.classList.toggle(active);
        });

        storageDados.forEach(({ cor_cartao, nome_inst, nome_impresso }) => {
          const option = dom.create("div");
          option.classList.add("option");

          option.innerHTML = `
          <span style="background-color: ${cor_cartao};"></span>
          <div>
            <p>${nome_inst}</p>
            <p>${nome_impresso}</p>
          </div>
        `;
          select.appendChild(option);
        });
      }
    }
  }

  function cartaoSelecionado(dados) {
    const cartao = dom.el(".aside-dados .card");
    if (cartao) {
      cartao.style.backgroundColor = dados.cor_cartao;
      dom.el(".img-bandeira img").src = dados.logo_bandeira;
      dom.el(".img-bandeira img").alt = dados.bandeira;
      dom.el(".logo-cartao p").innerText = dados.nome_inst;
      dom.el(".dados-cartao p").innerText = dados.nome_impresso;
      dom.el(".vencimento p").innerText = dados.venc_dia;

      dom.el(".adicionar-transacao").disabled = false;
      dom.el(".adicionar-transacao span").style.display = "none";

      dom.el("[data-cartao='instituicao'] p").innerText = dados.nome_inst;
      dom.el("[data-cartao='vencimento'] p").innerText = dados.venc_dia;
    }
  }

  function selecionarBanco() {
    dom.els(".option").forEach((option, index) => {
      option.addEventListener("click", () => {
        dom.el(".aside-dados .card").setAttribute("data-id", index);
        const dados = storageDados[index];
        cartaoSelecionado(dados);
        localStorage.setItem("id", index);
      });
    });
  }

  function mostrarCartaoAtivo() {
    const id = JSON.parse(localStorage.getItem("id"));
    if (id === 0 || id > 0) {
      const dados = storageDados[id];
      dom.el(".aside-dados .card").setAttribute("data-id", id);
      cartaoSelecionado(dados);
    }
  }

  function criarTransacao(type, texto, valor) {
    if (containerTabela) {
      const transacao = dom.create("div");
      const moedaReal = dom.conversorMoeda(valor, "PT-BR", "BRL");
      transacao.setAttribute("data-transacao", type);
      transacao.innerHTML = `
        <div>
          <span class="${type}"></span>
          <p>${dom.firstLetter(texto)}</p>
        </div>
        <div>
          <span>Valor</span>
          ${
            type === "despesa" ? `<p>-${moedaReal}</p>` : `<p>+${moedaReal}</p>`
          }
        </div>
        `;
      containerTabela.prepend(transacao);
    }
  }

  function adicionarConta() {
    const estabelecimento = dom.el("#estabelecimento");
    const valor = dom.el("#valor");
    criarTransacao("despesa", estabelecimento.value, valor.value);
    arrTransacao.push({
      estabelecimento: estabelecimento.value,
      valor: valor.value,
      id: dom.el(".aside-dados .card").dataset.id,
      type: "despesa",
    });
    dom.setStorage("transacao", arrTransacao);
    return arrTransacao;
  }

  function adicionarDinheiro() {
    const inputDeposito = dom.el("#deposito");
    criarTransacao("saldo", "Depósito realizado", inputDeposito.value);
    arrTransacao.push({
      estabelecimento: "Depósito realizado",
      valor: inputDeposito.value,
      type: "saldo",
      id: null,
    });
    dom.setStorage("transacao", arrTransacao);
    return arrTransacao;
  }

  function eventClickButton(button, fn) {
    const btn = dom.el(button);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        fn();
      });
    }
  }

  function arrSomarValores(arr, append) {
    const totalValores = arr.reduce((ac, num) => {
      return ac + Number(num);
    }, 0);

    append.innerText = dom.conversorMoeda(totalValores, "PT-BR", "BRL");
    return totalValores;
  }

  function somarValores(type, valor) {
    const totalSaldo = dom.el('[data-cartao="saldo"] p');
    const totalDespesa = dom.el('[data-cartao="despesa"] p');

    if (type === "despesa") {
      arrValores.totalDespesa.push(valor);
      arrSomarValores(arrValores.totalDespesa, totalDespesa);
    } else if (type === "saldo") {
      arrValores.totalSaldo.push(valor);
      arrSomarValores(arrValores.totalSaldo, totalSaldo);
    }
  }

  function mostrarTransacao() {
    const options = dom.els(".option");
    const loader = dom.el('[data-loader="geral"]');

    arrTransacao.forEach(({ type, estabelecimento, valor, id }) => {
      const cartaoAtivo = dom.el(".aside-dados .card");
      if (id === cartaoAtivo.dataset.id) {
        criarTransacao(type, estabelecimento, valor);
        somarValores("despesa", valor);
      } else {
        if (type === "saldo") {
          criarTransacao(type, estabelecimento, valor);
          somarValores("saldo", valor);
        }
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        loader.classList.add(active);
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    });
  }

  function init() {
    mostrarCard(".adicionar-transacao", "transacao", "active");
    mostrarCard(".btn-saldo", "saldo", "active");

    criarSelectBanco();
    selecionarBanco();
    mostrarCartaoAtivo();

    eventClickButton(".adicionar", adicionarConta);
    eventClickButton(".btn-depositar", adicionarDinheiro);

    mostrarTransacao();
  }

  return { init };
}
export default Cartao;
