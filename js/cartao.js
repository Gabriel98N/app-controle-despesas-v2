import Dom from "./dom.js";
import outsideEvent from "./outside-event.js";
import Data from "./data.js";

const dom = Dom();

function Cartao() {
  const cartao = dom.el(".aside-dados .card");
  const btnSelecionar = dom.el(".btn-cartao");
  const storageDados = JSON.parse(localStorage.getItem("dados"));
  const select = dom.el(".select");
  const active = "active";
  const btnAdicionar = dom.el(".adicionar-transacao");
  const textBtnTras = btnAdicionar.querySelector("span");

  const storageTransacao = JSON.parse(localStorage.getItem("transacao"));
  const arrTransacao = storageTransacao ? storageTransacao : [];
  const estabelecimento = dom.el("#estabelecimento");
  const valor = dom.el("#valor");
  const containerTabela = dom.el(".container-tabela");

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
      avisoVenc.style.backgroundColor = "#ED4E4B";
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

  function fnTransacao(boxTransacao, estabelecimento, valor) {
    boxTransacao.classList.add("box-transacao");
    boxTransacao.innerHTML = `
      <div class="estabelecimento">${estabelecimento.toUpperCase()}</div>
      <div class="valor">
        <p>Valor</p>
        <span>${dom.conversorMoeda(valor, "PT-BR", "BRL")}</span>
      </div>
    `;
  }

  function valorTotalTransacao() {
    const valorTotal = dom.el('[data-cartao="total"] p');
    const total = arrTransacao
      .filter(({ valor, id }) => {
        if (id === cartao.dataset.id) {
          return valor;
        }
      })
      .reduce((ac, { valor }) => {
        return ac + Number(valor);
      }, 0);

    valorTotal.innerText = dom.conversorMoeda(total, "PT-BR", "BRL");
  }

  function mostrarTransacao() {
    const options = dom.els(".option");
    arrTransacao.forEach(({ estabelecimento, valor, id }) => {
      const boxTransacao = dom.create("div");
      fnTransacao(boxTransacao, estabelecimento, valor);

      if (cartao.dataset.id === id) {
        containerTabela.appendChild(boxTransacao);
        valorTotalTransacao();
      }

      options.forEach((option, index) => {
        option.addEventListener("click", () => {
          containerTabela.appendChild(boxTransacao);
          valorTotalTransacao();
          if (index === Number(id)) {
            boxTransacao.style.display = "flex";
          } else {
            boxTransacao.style.display = "none";
          }
        });
      });
    });
  }

  function adicionarTransacao() {
    const formTransacao = dom.el(".form-transacao");
    const adicionar = dom.el(".adicionar");

    btnAdicionar.addEventListener("click", (e) => {
      e.preventDefault();
      formTransacao.classList.add(active);
      outsideEvent(
        formTransacao,
        () => {
          formTransacao.classList.remove(active);
        },
        ["click"]
      );
    });

    adicionar.addEventListener("click", (e) => {
      e.preventDefault();
      const boxTransacao = dom.create("div");
      const idCartao = cartao.dataset.id;

      fnTransacao(boxTransacao, estabelecimento.value, valor.value);
      containerTabela.appendChild(boxTransacao);

      arrTransacao.push({
        estabelecimento: estabelecimento.value,
        valor: valor.value.replace(",", "."),
        id: idCartao,
      });

      localStorage.setItem("transacao", JSON.stringify(arrTransacao));
    });
  }

  function init() {
    selecionarCartao();
    mostrarCartao();
    adicionarTransacao();
    mostrarTransacao();
  }

  return { init };
}
export default Cartao;
