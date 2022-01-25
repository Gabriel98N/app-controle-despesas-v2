import Dom from "./dom.js";

const dom = Dom();

function Cartao() {
  const cartao = dom.el(".aside-dados .card");
  const btnSelecionar = dom.el(".btn-cartao");
  const storageDados = JSON.parse(localStorage.getItem("dados"));
  const select = dom.el(".select");
  const active = "active";

  function fnCartaoSelecionado(
    cor_cartao,
    logo_bandeira,
    bandeira,
    nome_inst,
    nome_impresso,
    venc_dia,
    id
  ) {
    const cartao = dom.el(".aside-dados .card");
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

  function init() {
    selecionarCartao();
    selecionarDados();
  }

  return { init };
}
export default Cartao;
