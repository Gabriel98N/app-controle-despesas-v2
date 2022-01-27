import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import debounce from "./debounce.js";

const dom = Dom();

function Cartao() {
  const cartao = dom.el(".aside-dados .card");
  const btnSelecionar = dom.el(".btn-cartao");
  const storageDados = JSON.parse(localStorage.getItem("dados"));
  const select = dom.el(".select");
  const active = "active";
  const btnAdicionar = dom.el(".adicionar-transacao");
  const textBtnTras = dom.el(".adicionar-transacao span");

  const containerTabela = dom.el(".container-tabela");

  const storageTransacao = JSON.parse(localStorage.getItem("transacao"));
  const arrTransacao = storageTransacao ? storageTransacao : [];

  const storageSaldo = JSON.parse(localStorage.getItem("saldo"));
  const arrSaldo = storageSaldo ? storageSaldo : [];

  function mostrarDados(id) {
    const nomeCartao = dom.el('[data-cartao="instituicao"] p');
    const venc = dom.el('[data-cartao="vencimento"] p');
    const avisoVenc = dom.el(".aviso-venc");

    const { nome_inst, venc_dia } = storageDados[id];
    const diaAtual = new Date().getDate();

    nomeCartao.innerText = nome_inst;
    venc.innerText = venc_dia;

    avisoVenc.style.display = "block";
    btnAdicionar.disabled = false;
    textBtnTras.style.display = "none";

    const vencDia = Number(venc_dia);
    if (diaAtual > vencDia) {
      avisoVenc.innerText = "Atrasado";
      avisoVenc.style.backgroundColor = "#dc0000";
    } else if (diaAtual === vencDia) {
      avisoVenc.innerText = "Vence hoje";
      avisoVenc.style.backgroundColor = "";
    } else {
      avisoVenc.innerText = "Em dia";
      avisoVenc.style.backgroundColor = "";
    }
  }

  function fnCartaoSelecionado(
    cor_cartao,
    logo_bandeira,
    bandeira,
    nome_inst,
    nome_impresso,
    venc_dia,
    id
  ) {
    const imgBandeira = dom.el(".aside-dados .img-bandeira img");
    const nomeInst = dom.el(".aside-dados p");
    const nomeImp = dom.el(".dados-cartao p");
    const diaVenc = dom.el(".dados-cartao .vencimento p");

    if (cartao) {
      cartao.style.backgroundColor = cor_cartao;
      cartao.setAttribute("data-id", id);

      imgBandeira.src = logo_bandeira;
      imgBandeira.alt = bandeira;
      nomeInst.innerText = nome_inst;
      nomeImp.innerText = nome_impresso;
      diaVenc.innerText = venc_dia;
      mostrarDados(id);
    }
  }

  function selecionarCartao() {
    if (btnSelecionar) {
      btnSelecionar.disabled = true;

      if (storageDados) {
        btnSelecionar.disabled = false;

        function handleClickOption(e) {
          const targetOption = e.currentTarget;
          const idOption = targetOption.dataset.option;

          const {
            nome_inst,
            nome_impresso,
            logo_bandeira,
            bandeira,
            venc_dia,
            cor_cartao,
          } = storageDados[idOption];
          fnCartaoSelecionado(
            cor_cartao,
            logo_bandeira,
            bandeira,
            nome_inst,
            nome_impresso,
            venc_dia,
            idOption
          );
          localStorage.setItem("id", idOption);
        }

        storageDados.forEach(
          ({ cor_cartao, nome_inst, nome_impresso }, index) => {
            const option = dom.create("div");
            option.classList.add("option");

            option.setAttribute("data-option", index);
            option.innerHTML = `
              <span style="background-color: ${cor_cartao};"></span>
              <div>
                <p>${nome_inst}</p>
                <p>${nome_impresso}</p>
              </div>
              `;
            select.appendChild(option);

            /* Selecionar Cartão */
            option.addEventListener("click", handleClickOption);
          }
        );

        btnSelecionar.addEventListener("click", (e) => {
          e.preventDefault();
          select.classList.toggle(active);
        });
      }
    }
  }

  function mostrarCartao() {
    const id = JSON.parse(localStorage.getItem("id"));
    if (id === 0 || id > 0) {
      const {
        nome_inst,
        nome_impresso,
        logo_bandeira,
        bandeira,
        venc_dia,
        cor_cartao,
      } = storageDados[id];
      fnCartaoSelecionado(
        cor_cartao,
        logo_bandeira,
        bandeira,
        nome_inst,
        nome_impresso,
        venc_dia,
        id
      );
    }
  }

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

  function fnTransacao(transacao, texto, valor, type) {
    transacao.classList.add("box-transacao");
    transacao.innerHTML = `
      <div class="estabelecimento">
        <span class="${type}"></span>
        <p>${dom.firstLetter(texto)}</p>
      </div>
      <div class="valor">
        <p>Valor</p>
        ${
          type === "neg"
            ? `<span>-${dom.conversorMoeda(valor, "PT-BR", "BRL")}</span>`
            : `<span>+${dom.conversorMoeda(valor, "PT-BR", "BRL")}</span>`
        }
      </div>
    `;
    return transacao;
  }

  function adicionarConta() {
    const adicionar = dom.el(".adicionar");
    const estabelecimento = dom.el("#estabelecimento");
    const valor = dom.el("#valor");

    if (adicionar) {
      adicionar.addEventListener("click", (e) => {
        e.preventDefault();
        const idCartao = cartao ? cartao.dataset.id : "";
        const boxTransacao = dom.create("div");
        fnTransacao(boxTransacao, estabelecimento.value, valor.value, "neg");
        containerTabela.appendChild(boxTransacao);

        arrTransacao.push({
          estabelecimento: estabelecimento.value,
          valor: valor.value,
          id: idCartao,
        });
        localStorage.setItem("transacao", JSON.stringify(arrTransacao));
      });
    }
  }

  function adicionarDinheiro() {
    const btnDepositar = dom.el(".btn-depositar");
    const inputDeposito = dom.el("#deposito");

    if (btnDepositar) {
      btnDepositar.addEventListener("click", (e) => {
        e.preventDefault();
        const boxTransacao = dom.create("div");
        fnTransacao(
          boxTransacao,
          "Depósito realizado",
          inputDeposito.value,
          "pos"
        );
        containerTabela.prepend(boxTransacao);
        arrSaldo.push(inputDeposito.value);
        localStorage.setItem("saldo", JSON.stringify(arrSaldo));
        inputDeposito.value = "";
        inputDeposito.focus();
        dom.el(".box-deposito p").innerText = "R$";
      });
    }

    inputDeposito.addEventListener("keyup", (e) => {
      const target = e.target;
      const valorDep = dom.conversorMoeda(target.value, "PT-BR", "BRL");
      dom.el(".box-deposito p").innerText = valorDep;
    });
  }

  function mostrarConta() {
    arrTransacao.forEach(({ estabelecimento, valor, id }) => {
      if (id == cartao.dataset.id) {
        const boxTransacao = dom.create("div");
        containerTabela.prepend(boxTransacao);
        fnTransacao(boxTransacao, estabelecimento, valor, "neg");
      }

      dom.els(".option").forEach((option) => {
        option.addEventListener("click", () => {
          dom.el("[data-loader='geral']").classList.add(active);
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
      });
    });
  }

  function mostrarDinheiro() {
    arrSaldo.forEach((buy) => {
      const boxTransacao = dom.create("div");
      containerTabela.prepend(boxTransacao);
      fnTransacao(boxTransacao, "Despósito realizado", buy, "pos");
    });
  }

  function init() {
    selecionarCartao();
    mostrarCartao();
    adicionarConta();
    adicionarDinheiro();

    mostrarConta();
    mostrarDinheiro();

    mostrarCard(".adicionar-transacao", "transacao", "active");
    mostrarCard(".btn-saldo", "saldo", "active");
  }

  return { init };
}
export default Cartao;
