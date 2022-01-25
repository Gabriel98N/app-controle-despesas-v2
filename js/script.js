import Cadastro from "./cadastro.js";
import Cartao from "./cartao.js";
import Validacao from "./validacao.js";

Validacao("[required]", ".confirmar");
Validacao(".form-transacao [required]", ".adicionar");

const cadastro = Cadastro();
cadastro.init();

const cartao = Cartao();
cartao.init();
