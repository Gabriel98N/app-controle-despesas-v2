import Dom from "./dom.js";

const dom = Dom();

function Cadastro() {
  const instituicao = dom.el("#instituicao");
  const nomeImpresso = dom.el("#nome");
  const vencDia = dom.el("#vencimento");
  const btnConfirmar = dom.el(".confirmar");

  const listaCartao = dom.el(".lista-cartao");
  const storageCartao = JSON.parse(localStorage.getItem("dados"));
  const arrCartao = storageCartao ? storageCartao : [];
  let count = 0;

  async function dadosJSON() {
    const response = await fetch("js/dados.json");
    const dados = await response.json();
    return dados;
  }

  async function criarOptionBanco() {
    const dados = await dadosJSON();
    if (instituicao) {
      dados.forEach(({ nome_inst }) => {
        const option = dom.create("option");
        option.innerText = nome_inst;
        instituicao.appendChild(option);
      });
    }
  }

  function fnCartao(
    card,
    logo,
    bandeira,
    nome_banco,
    nome_impresso,
    dia_venc,
    cor_cartao
  ) {
    card.style.backgroundColor = cor_cartao;
    card.classList.add("card");
    card.innerHTML = `
      <div class="box-cartao logo-cartao">
        <div class="img-bandeira">
          <img src="${logo}" alt="${bandeira}">
        </div>
        <p>${nome_banco}</p>
      </div>
      <div class="box-cartao dados-cartao">
        <p>${nome_impresso.toUpperCase()}</p>
        <div class="vencimento">
          <h4>Venc</h4>
          <p>${dia_venc}</p>
        </div>
      </div>
    `;
  }

  async function handleClickConfirmar(e) {
    e.preventDefault();
    const dados = await dadosJSON();
    const card = dom.create("div");
    const nomeImprVal = nomeImpresso.value.toUpperCase();
    const vencDiaVal = vencDia.value;

    dados.forEach(({ nome_inst, logo_bandeira, bandeira, cor_cartao }) => {
      if (nome_inst === instituicao.value) {
        fnCartao(
          card,
          logo_bandeira,
          bandeira,
          nome_inst,
          nomeImprVal,
          vencDiaVal,
          cor_cartao
        );
        arrCartao.push({
          nome_inst: nome_inst,
          nome_impresso: nomeImprVal,
          venc_dia: vencDiaVal,
          logo_bandeira: logo_bandeira,
          bandeira: bandeira,
          cor_cartao: cor_cartao,
          id: count++,
        });
        localStorage.setItem("dados", JSON.stringify(arrCartao));
      }
    });
    if (listaCartao) listaCartao.appendChild(card);
  }

  function adicionarCartao() {
    if (btnConfirmar) {
      btnConfirmar.addEventListener("click", handleClickConfirmar);
    }
  }

  function salvarCartao() {
    if (storageCartao) {
      storageCartao.forEach(
        ({
          nome_inst,
          nome_impresso,
          logo_bandeira,
          bandeira,
          venc_dia,
          cor_cartao,
        }) => {
          const card = dom.create("div");
          fnCartao(
            card,
            logo_bandeira,
            bandeira,
            nome_inst,
            nome_impresso,
            venc_dia,
            cor_cartao
          );
          if (listaCartao) listaCartao.appendChild(card);
        }
      );
    }
  }

  function init() {
    criarOptionBanco();
    adicionarCartao();
    salvarCartao();
  }

  return {
    init,
  };
}
export default Cadastro;
