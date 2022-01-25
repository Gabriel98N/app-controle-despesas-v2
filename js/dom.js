function Dom() {
  function el(el) {
    return document.querySelector(el);
  }

  function els(el) {
    return document.querySelectorAll(el);
  }

  function create(tag) {
    return document.createElement(tag);
  }

  function events(...event) {
    return [...event];
  }

  function transformLowerCase(string) {
    return string.toLowerCase();
  }

  function addClass(element, classe) {
    el(element).classList.add(classe);
    return element;
  }

  function removeClass(element, classe) {
    el(element).classList.remove(classe);
    return element;
  }

  function toggleClass(element, classe) {
    el(element).classList.toggle(classe);
    return element;
  }

  return {
    el,
    els,
    create,
    events,
    transformLowerCase,
    addClass,
    removeClass,
    toggleClass,
  };
}

export default Dom;
