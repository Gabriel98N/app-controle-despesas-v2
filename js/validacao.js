export default function Validacao(input, button) {
  const inputs = document.querySelectorAll(input);
  const btn = document.querySelector(button);

  if (btn) {
    function checarInput(inputs) {
      let campo = true;
      inputs.forEach((input) => {
        if (!input.value) {
          campo = false;
        }
      });
      return campo;
    }

    function validarFormulario() {
      btn.disabled = true;
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          if (checarInput(inputs)) {
            btn.disabled = false;
          } else {
            btn.disabled = true;
          }
        });
      });
    }
    validarFormulario();
  }
}
