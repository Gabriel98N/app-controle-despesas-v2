/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cadastro.js":
/*!************************!*\
  !*** ./js/cadastro.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./js/dom.js\");\n\r\n\r\nconst dom = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\nfunction Cadastro() {\r\n  const instituicao = dom.el(\"#instituicao\");\r\n  const nomeImpresso = dom.el(\"#nome\");\r\n  const vencDia = dom.el(\"#vencimento\");\r\n  const btnConfirmar = dom.el(\".confirmar\");\r\n\r\n  const listaCartao = dom.el(\".lista-cartao\");\r\n  const storageCartao = JSON.parse(localStorage.getItem(\"dados\"));\r\n  const arrCartao = storageCartao ? storageCartao : [];\r\n  let count = 0;\r\n\r\n  async function dadosJSON() {\r\n    const response = await fetch(\"js/dados.json\");\r\n    const dados = await response.json();\r\n    return dados;\r\n  }\r\n\r\n  async function criarOptionBanco() {\r\n    const dados = await dadosJSON();\r\n    if (instituicao) {\r\n      dados.forEach(({ nome_inst }) => {\r\n        const option = dom.create(\"option\");\r\n        option.innerText = nome_inst;\r\n        instituicao.appendChild(option);\r\n      });\r\n    }\r\n  }\r\n\r\n  function fnCartao(\r\n    card,\r\n    logo,\r\n    bandeira,\r\n    nome_banco,\r\n    nome_impresso,\r\n    dia_venc,\r\n    cor_cartao\r\n  ) {\r\n    card.style.backgroundColor = cor_cartao;\r\n    card.classList.add(\"card\");\r\n    card.innerHTML = `\r\n      <div class=\"box-cartao logo-cartao\">\r\n        <div class=\"img-bandeira\">\r\n          <img src=\"${logo}\" alt=\"${bandeira}\">\r\n        </div>\r\n        <p>${nome_banco}</p>\r\n      </div>\r\n      <div class=\"box-cartao dados-cartao\">\r\n        <p>${nome_impresso}</p>\r\n        <div class=\"vencimento\">\r\n          <h4>Venc</h4>\r\n          <p>${dia_venc}</p>\r\n        </div>\r\n      </div>\r\n    `;\r\n  }\r\n\r\n  async function handleClickConfirmar(e) {\r\n    e.preventDefault();\r\n    const dados = await dadosJSON();\r\n    const card = dom.create(\"div\");\r\n\r\n    const nomeImprVal = nomeImpresso.value.toUpperCase();\r\n    const vencDiaVal = vencDia.value;\r\n\r\n    dados.forEach(({ nome_inst, logo_bandeira, bandeira, cor_cartao }) => {\r\n      if (nome_inst === instituicao.value) {\r\n        fnCartao(\r\n          card,\r\n          logo_bandeira,\r\n          bandeira,\r\n          nome_inst,\r\n          nomeImprVal,\r\n          vencDiaVal,\r\n          cor_cartao\r\n        );\r\n        arrCartao.push({\r\n          nome_inst: nome_inst,\r\n          nome_impresso: nomeImprVal,\r\n          venc_dia: vencDiaVal,\r\n          logo_bandeira: logo_bandeira,\r\n          bandeira: bandeira,\r\n          cor_cartao: cor_cartao,\r\n          id: count++,\r\n        });\r\n        localStorage.setItem(\"dados\", JSON.stringify(arrCartao));\r\n      }\r\n    });\r\n    if (listaCartao) listaCartao.appendChild(card);\r\n  }\r\n\r\n  function adicionarCartao() {\r\n    if (btnConfirmar) {\r\n      btnConfirmar.addEventListener(\"click\", handleClickConfirmar);\r\n    }\r\n  }\r\n\r\n  function salvarCartao() {\r\n    if (storageCartao) {\r\n      storageCartao.forEach(\r\n        ({\r\n          nome_inst,\r\n          nome_impresso,\r\n          logo_bandeira,\r\n          bandeira,\r\n          venc_dia,\r\n          cor_cartao,\r\n        }) => {\r\n          const card = dom.create(\"div\");\r\n          fnCartao(\r\n            card,\r\n            logo_bandeira,\r\n            bandeira,\r\n            nome_inst,\r\n            nome_impresso,\r\n            venc_dia,\r\n            cor_cartao\r\n          );\r\n          if (listaCartao) listaCartao.appendChild(card);\r\n        }\r\n      );\r\n    }\r\n  }\r\n\r\n  function init() {\r\n    criarOptionBanco();\r\n    adicionarCartao();\r\n    salvarCartao();\r\n  }\r\n\r\n  return {\r\n    init,\r\n  };\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cadastro);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/cadastro.js?");

/***/ }),

/***/ "./js/cartao.js":
/*!**********************!*\
  !*** ./js/cartao.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./js/dom.js\");\n/* harmony import */ var _outside_event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./outside-event.js */ \"./js/outside-event.js\");\n/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debounce.js */ \"./js/debounce.js\");\n\r\n\r\n\r\n\r\nconst dom = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\nfunction Cartao() {\r\n  const cartao = dom.el(\".aside-dados .card\");\r\n  const btnSelecionar = dom.el(\".btn-cartao\");\r\n  const storageDados = JSON.parse(localStorage.getItem(\"dados\"));\r\n  const select = dom.el(\".select\");\r\n  const active = \"active\";\r\n  const btnAdicionar = dom.el(\".adicionar-transacao\");\r\n  const textBtnTras = dom.el(\".adicionar-transacao span\");\r\n\r\n  const containerTabela = dom.el(\".container-tabela\");\r\n\r\n  const storageTransacao = JSON.parse(localStorage.getItem(\"transacao\"));\r\n  const arrTransacao = storageTransacao ? storageTransacao : [];\r\n\r\n  const storageSaldo = JSON.parse(localStorage.getItem(\"saldo\"));\r\n  const arrSaldo = storageSaldo ? storageSaldo : [];\r\n\r\n  function mostrarDados(id) {\r\n    const nomeCartao = dom.el('[data-cartao=\"instituicao\"] p');\r\n    const venc = dom.el('[data-cartao=\"vencimento\"] p');\r\n    const avisoVenc = dom.el(\".aviso-venc\");\r\n\r\n    const { nome_inst, venc_dia } = storageDados[id];\r\n    const diaAtual = new Date().getDate();\r\n\r\n    nomeCartao.innerText = nome_inst;\r\n    venc.innerText = venc_dia;\r\n\r\n    avisoVenc.style.display = \"block\";\r\n    btnAdicionar.disabled = false;\r\n    textBtnTras.style.display = \"none\";\r\n\r\n    const vencDia = Number(venc_dia);\r\n    if (diaAtual > vencDia) {\r\n      avisoVenc.innerText = \"Atrasado\";\r\n      avisoVenc.style.backgroundColor = \"#dc0000\";\r\n    } else if (diaAtual === vencDia) {\r\n      avisoVenc.innerText = \"Vence hoje\";\r\n      avisoVenc.style.backgroundColor = \"\";\r\n    } else {\r\n      avisoVenc.innerText = \"Em dia\";\r\n      avisoVenc.style.backgroundColor = \"\";\r\n    }\r\n  }\r\n\r\n  function fnCartaoSelecionado(\r\n    cor_cartao,\r\n    logo_bandeira,\r\n    bandeira,\r\n    nome_inst,\r\n    nome_impresso,\r\n    venc_dia,\r\n    id\r\n  ) {\r\n    const imgBandeira = dom.el(\".aside-dados .img-bandeira img\");\r\n    const nomeInst = dom.el(\".aside-dados p\");\r\n    const nomeImp = dom.el(\".dados-cartao p\");\r\n    const diaVenc = dom.el(\".dados-cartao .vencimento p\");\r\n\r\n    if (cartao) {\r\n      cartao.style.backgroundColor = cor_cartao;\r\n      cartao.setAttribute(\"data-id\", id);\r\n\r\n      imgBandeira.src = logo_bandeira;\r\n      imgBandeira.alt = bandeira;\r\n      nomeInst.innerText = nome_inst;\r\n      nomeImp.innerText = nome_impresso;\r\n      diaVenc.innerText = venc_dia;\r\n      mostrarDados(id);\r\n    }\r\n  }\r\n\r\n  function selecionarCartao() {\r\n    if (btnSelecionar) {\r\n      btnSelecionar.disabled = true;\r\n\r\n      if (storageDados) {\r\n        btnSelecionar.disabled = false;\r\n\r\n        function handleClickOption(e) {\r\n          const targetOption = e.currentTarget;\r\n          const idOption = targetOption.dataset.option;\r\n\r\n          const {\r\n            nome_inst,\r\n            nome_impresso,\r\n            logo_bandeira,\r\n            bandeira,\r\n            venc_dia,\r\n            cor_cartao,\r\n          } = storageDados[idOption];\r\n          fnCartaoSelecionado(\r\n            cor_cartao,\r\n            logo_bandeira,\r\n            bandeira,\r\n            nome_inst,\r\n            nome_impresso,\r\n            venc_dia,\r\n            idOption\r\n          );\r\n          localStorage.setItem(\"id\", idOption);\r\n        }\r\n\r\n        storageDados.forEach(\r\n          ({ cor_cartao, nome_inst, nome_impresso }, index) => {\r\n            const option = dom.create(\"div\");\r\n            option.classList.add(\"option\");\r\n\r\n            option.setAttribute(\"data-option\", index);\r\n            option.innerHTML = `\r\n              <span style=\"background-color: ${cor_cartao};\"></span>\r\n              <div>\r\n                <p>${nome_inst}</p>\r\n                <p>${nome_impresso}</p>\r\n              </div>\r\n              `;\r\n            select.appendChild(option);\r\n\r\n            /* Selecionar Cartão */\r\n            option.addEventListener(\"click\", handleClickOption);\r\n          }\r\n        );\r\n\r\n        btnSelecionar.addEventListener(\"click\", (e) => {\r\n          e.preventDefault();\r\n          select.classList.toggle(active);\r\n        });\r\n      }\r\n    }\r\n  }\r\n\r\n  function mostrarCartao() {\r\n    const id = JSON.parse(localStorage.getItem(\"id\"));\r\n    if (id === 0 || id > 0) {\r\n      const {\r\n        nome_inst,\r\n        nome_impresso,\r\n        logo_bandeira,\r\n        bandeira,\r\n        venc_dia,\r\n        cor_cartao,\r\n      } = storageDados[id];\r\n      fnCartaoSelecionado(\r\n        cor_cartao,\r\n        logo_bandeira,\r\n        bandeira,\r\n        nome_inst,\r\n        nome_impresso,\r\n        venc_dia,\r\n        id\r\n      );\r\n    }\r\n  }\r\n\r\n  function mostrarCard(btn, element, classe) {\r\n    const button = dom.el(btn);\r\n    const card = dom.el(`[data-card=\"${element}\"]`);\r\n    if (button) {\r\n      button.addEventListener(\"click\", (e) => {\r\n        e.preventDefault();\r\n        card.classList.add(classe);\r\n        (0,_outside_event_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\r\n          card,\r\n          () => {\r\n            card.classList.remove(classe);\r\n          },\r\n          [\"click\"]\r\n        );\r\n      });\r\n    }\r\n  }\r\n\r\n  function fnTransacao(transacao, texto, valor, type) {\r\n    transacao.classList.add(\"box-transacao\");\r\n    transacao.innerHTML = `\r\n      <div class=\"estabelecimento\">\r\n        <span class=\"${type}\"></span>\r\n        <p>${dom.firstLetter(texto)}</p>\r\n      </div>\r\n      <div class=\"valor\">\r\n        <p>Valor</p>\r\n        ${\r\n          type === \"neg\"\r\n            ? `<span>-${dom.conversorMoeda(valor, \"PT-BR\", \"BRL\")}</span>`\r\n            : `<span>+${dom.conversorMoeda(valor, \"PT-BR\", \"BRL\")}</span>`\r\n        }\r\n      </div>\r\n    `;\r\n    return transacao;\r\n  }\r\n\r\n  function adicionarConta() {\r\n    const adicionar = dom.el(\".adicionar\");\r\n    const estabelecimento = dom.el(\"#estabelecimento\");\r\n    const valor = dom.el(\"#valor\");\r\n\r\n    if (adicionar) {\r\n      adicionar.addEventListener(\"click\", (e) => {\r\n        e.preventDefault();\r\n        const idCartao = cartao ? cartao.dataset.id : \"\";\r\n        const boxTransacao = dom.create(\"div\");\r\n        fnTransacao(boxTransacao, estabelecimento.value, valor.value, \"neg\");\r\n        containerTabela.appendChild(boxTransacao);\r\n\r\n        arrTransacao.push({\r\n          estabelecimento: estabelecimento.value,\r\n          valor: valor.value,\r\n          id: idCartao,\r\n        });\r\n        localStorage.setItem(\"transacao\", JSON.stringify(arrTransacao));\r\n      });\r\n    }\r\n  }\r\n\r\n  function adicionarDinheiro() {\r\n    const btnDepositar = dom.el(\".btn-depositar\");\r\n    const inputDeposito = dom.el(\"#deposito\");\r\n\r\n    if (btnDepositar) {\r\n      btnDepositar.addEventListener(\"click\", (e) => {\r\n        e.preventDefault();\r\n        const boxTransacao = dom.create(\"div\");\r\n        fnTransacao(\r\n          boxTransacao,\r\n          \"Depósito realizado\",\r\n          inputDeposito.value,\r\n          \"pos\"\r\n        );\r\n        containerTabela.prepend(boxTransacao);\r\n        arrSaldo.push(inputDeposito.value);\r\n        localStorage.setItem(\"saldo\", JSON.stringify(arrSaldo));\r\n        inputDeposito.value = \"\";\r\n        inputDeposito.focus();\r\n        dom.el(\".box-deposito p\").innerText = \"R$\";\r\n      });\r\n    }\r\n\r\n    inputDeposito.addEventListener(\"keyup\", (e) => {\r\n      const target = e.target;\r\n      const valorDep = dom.conversorMoeda(target.value, \"PT-BR\", \"BRL\");\r\n      dom.el(\".box-deposito p\").innerText = valorDep;\r\n    });\r\n  }\r\n\r\n  function mostrarConta() {\r\n    arrTransacao.forEach(({ estabelecimento, valor, id }) => {\r\n      if (id == cartao.dataset.id) {\r\n        const boxTransacao = dom.create(\"div\");\r\n        containerTabela.prepend(boxTransacao);\r\n        fnTransacao(boxTransacao, estabelecimento, valor, \"neg\");\r\n      }\r\n\r\n      dom.els(\".option\").forEach((option) => {\r\n        option.addEventListener(\"click\", () => {\r\n          dom.el(\"[data-loader='geral']\").classList.add(active);\r\n          setTimeout(() => {\r\n            location.reload();\r\n          }, 1000);\r\n        });\r\n      });\r\n    });\r\n  }\r\n\r\n  function mostrarDinheiro() {\r\n    arrSaldo.forEach((buy) => {\r\n      const boxTransacao = dom.create(\"div\");\r\n      containerTabela.prepend(boxTransacao);\r\n      fnTransacao(boxTransacao, \"Despósito realizado\", buy, \"pos\");\r\n    });\r\n  }\r\n\r\n  function init() {\r\n    selecionarCartao();\r\n    mostrarCartao();\r\n    adicionarConta();\r\n    adicionarDinheiro();\r\n\r\n    mostrarConta();\r\n    mostrarDinheiro();\r\n\r\n    mostrarCard(\".adicionar-transacao\", \"transacao\", \"active\");\r\n    mostrarCard(\".btn-saldo\", \"saldo\", \"active\");\r\n  }\r\n\r\n  return { init };\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cartao);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/cartao.js?");

/***/ }),

/***/ "./js/debounce.js":
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction debounce(callback, delay) {\r\n  let timer;\r\n  return (...args) => {\r\n    if (timer) clearTimeout(timer);\r\n\r\n    timer = setTimeout(() => {\r\n      callback(...args);\r\n      timer = null;\r\n    }, delay);\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debounce);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/debounce.js?");

/***/ }),

/***/ "./js/dom.js":
/*!*******************!*\
  !*** ./js/dom.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction Dom() {\r\n  function el(el) {\r\n    return document.querySelector(el);\r\n  }\r\n\r\n  function els(el) {\r\n    return document.querySelectorAll(el);\r\n  }\r\n\r\n  function create(tag) {\r\n    return document.createElement(tag);\r\n  }\r\n\r\n  function events(...event) {\r\n    return [...event];\r\n  }\r\n\r\n  function transformLowerCase(string) {\r\n    return string.toLowerCase();\r\n  }\r\n\r\n  function addClass(element, classe) {\r\n    el(element).classList.add(classe);\r\n    return element;\r\n  }\r\n\r\n  function removeClass(element, classe) {\r\n    el(element).classList.remove(classe);\r\n    return element;\r\n  }\r\n\r\n  function toggleClass(element, classe) {\r\n    el(element).classList.toggle(classe);\r\n    return element;\r\n  }\r\n\r\n  function conversorMoeda(numero, lang, type) {\r\n    return Number(numero).toLocaleString(lang, {\r\n      style: \"currency\",\r\n      currency: type,\r\n    });\r\n  }\r\n\r\n  function firstLetter(text) {\r\n    return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;\r\n  }\r\n\r\n  return {\r\n    el,\r\n    els,\r\n    create,\r\n    events,\r\n    transformLowerCase,\r\n    addClass,\r\n    removeClass,\r\n    toggleClass,\r\n    conversorMoeda,\r\n    firstLetter,\r\n  };\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dom);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/dom.js?");

/***/ }),

/***/ "./js/outside-event.js":
/*!*****************************!*\
  !*** ./js/outside-event.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction outsideEvent(element, callback, eventos) {\r\n  eventos = eventos || [\"click\", \"touchstart\"];\r\n  const html = document.documentElement;\r\n  const outside = \"data-outside\";\r\n\r\n  if (!element.hasAttribute(outside)) {\r\n    setTimeout(() => {\r\n      eventos.forEach((evento) => {\r\n        html.addEventListener(evento, handleOutsideClick);\r\n      });\r\n    });\r\n    element.setAttribute(outside, \"\");\r\n  }\r\n\r\n  function handleOutsideClick(event) {\r\n    if (!element.contains(event.target)) {\r\n      element.removeAttribute(outside);\r\n      eventos.forEach((evento) => {\r\n        html.removeEventListener(evento, handleOutsideClick);\r\n      });\r\n      callback();\r\n    }\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (outsideEvent);\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/outside-event.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cadastro_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cadastro.js */ \"./js/cadastro.js\");\n/* harmony import */ var _cartao_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartao.js */ \"./js/cartao.js\");\n/* harmony import */ var _validacao_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validacao.js */ \"./js/validacao.js\");\n\r\n\r\n\r\n\r\n(0,_validacao_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"[required]\", \".confirmar\");\r\n(0,_validacao_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\".form-transacao [required]\", \".adicionar\");\r\n\r\nconst cadastro = (0,_cadastro_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\ncadastro.init();\r\n\r\nconst cartao = (0,_cartao_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\ncartao.init();\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/script.js?");

/***/ }),

/***/ "./js/validacao.js":
/*!*************************!*\
  !*** ./js/validacao.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Validacao)\n/* harmony export */ });\nfunction Validacao(input, button) {\r\n  const inputs = document.querySelectorAll(input);\r\n  const btn = document.querySelector(button);\r\n\r\n  if (btn) {\r\n    function checarInput(inputs) {\r\n      let campo = true;\r\n      inputs.forEach((input) => {\r\n        if (!input.value) {\r\n          campo = false;\r\n        }\r\n      });\r\n      return campo;\r\n    }\r\n\r\n    function validarFormulario() {\r\n      btn.disabled = true;\r\n      inputs.forEach((input) => {\r\n        input.addEventListener(\"input\", () => {\r\n          if (checarInput(inputs)) {\r\n            btn.disabled = false;\r\n          } else {\r\n            btn.disabled = true;\r\n          }\r\n        });\r\n      });\r\n    }\r\n    validarFormulario();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://app-sequoia/./js/validacao.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/script.js");
/******/ 	
/******/ })()
;