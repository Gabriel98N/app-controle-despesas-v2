import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import debounce from "./debounce.js";

const dom = Dom();

function Cartao() {
  const storageDados = JSON.parse(localStorage.getItem("dados"));
  const active = "active";

  const storageTransacao = JSON.parse(localStorage.getItem("transacao"));
  const arrTransacao = storageTransacao ? storageTransacao : [];

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
      cartao.setAttribute("data-id", dados.id);

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
        dom.el(".aside-dados .card").setAttribute("data-cartao", index);
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
      cartaoSelecionado(dados);
    }
  }

  function criarTransacao(type, texto, valor) {
    typeof valor === "string" ? valor.replace(",", ".") : valor;
    const valorInput = dom.conversorMoeda(valor, "PT-BR", "BRL");

    const transacao = dom.create("div");
    transacao.classList.add("box-transacao");

    transacao.innerHTML = `
          <div>
            <span data-traco="${type}"></span>
            <p>${dom.firstLetter(texto)}</p>
          </div>
          <div>
            <span>Valor</span>
            <p>${type}${valorInput}</p>
          </div>
        `;
    dom.el(".container-tabela").prepend(transacao);
  }

  function adicionarDespesa() {
    const estabelecimento = dom.el("#estabelecimento");
    const valor = dom.el("#valor");

    dom.el(".adicionar").addEventListener("click", (e) => {
      e.preventDefault();
      criarTransacao("-", estabelecimento.value, valor.value);
      arrTransacao.push({
        estabelecimento: estabelecimento.value,
        valor: valor.value,
        type: "-",
        id: dom.el(".aside-dados .card").dataset.id,
      });
      localStorage.setItem("transacao", JSON.stringify(arrTransacao));
    });
  }

  function adicionarDinheiro() {
    const inputDeposito = dom.el("#deposito");
    dom.el(".btn-depositar").addEventListener("click", (e) => {
      e.preventDefault();
      if (Number(inputDeposito.value) !== 0) {
        criarTransacao("+", "Depósito realizado", inputDeposito.value);
        arrTransacao.push({
          estabelecimento: "Depósito realizado",
          valor: inputDeposito.value,
          type: "+",
        });
        localStorage.setItem("transacao", JSON.stringify(arrTransacao));
      }
    });
  }

  function mostrarTransacao() {
    arrTransacao.forEach(({ estabelecimento, valor, type }) =>
      criarTransacao(type, estabelecimento, valor)
    );
  }

  function despesaCartao() {
    const idCartao = dom.el(".aside-dados .card").dataset.id;

    arrTransacao.forEach(({ estabelecimento, valor, id }, index) => {
      const boxTransacao = dom.els(".box-transacao")[index];
      if (id) {
        console.log(boxTransacao);
      }
    });
  }

  function init() {
    mostrarCard(".adicionar-transacao", "transacao", "active");
    mostrarCard(".btn-saldo", "saldo", "active");

    criarSelectBanco();
    selecionarBanco();
    mostrarCartaoAtivo();

    adicionarDespesa();
    adicionarDinheiro();

    mostrarTransacao();
    despesaCartao();
  }

  return { init };
}
export default Cartao;
