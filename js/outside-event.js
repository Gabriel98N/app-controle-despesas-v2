function outsideEvent(element, callback, eventos) {
  eventos = eventos || ["click", "touchstart"];
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    setTimeout(() => {
      eventos.forEach((evento) => {
        html.addEventListener(evento, handleOutsideClick);
      });
    });
    element.setAttribute(outside, "");
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      eventos.forEach((evento) => {
        html.removeEventListener(evento, handleOutsideClick);
      });
      callback();
    }
  }
}

export default outsideEvent;
