let d = document,
  options = d.getElementById("options"),
  text = d.getElementById("text"),
  result = d.getElementById("result"),
  process = d.getElementById("process"),
  processText = d.getElementById("processText"),
  copy = d.getElementById("copy"),
  words = d.getElementById("words");
let encrip = false,
  timer;

const vowels = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const codificar = (text) =>
  text
    .split("")
    .map((e) => (vowels.hasOwnProperty(e) ? vowels[e] : e))
    .join("");

const decodificar = (text) => {
  Object.entries(vowels).forEach(([key, value]) => {
    text = text.replaceAll(value, key);
  });
  return text;
};

const deleteMessage = () =>
  d.querySelector("main").removeChild(d.querySelector(".alert"));

const mensajes = ({ mensaje, color, icon }) => {
  if (d.querySelector(".alert") !== null) {
    clearTimeout(timer);
    deleteMessage();
  }

  const section = `
      <section class="alert" style="--color-msj:${color}">
        <section class="alert-container flex">
          <span class="flex span-icon">${icon}${mensaje} </span>
          <button id="close" class="flex"><i class='bx bx-x'></i></button>
        </section>
      </section>`;

  d.querySelector("main").insertAdjacentHTML("beforeend", section);

  timer = setTimeout((e) => {
    deleteMessage();
  }, 4000);
};

d.addEventListener("input", (e) => {
  if (e.target === text) words.textContent = e.target.value.length;
});

d.addEventListener("change", (e) => {
  if (e.target === options) {
    processText.textContent = encrip ? "ENCRIPTEMOS!" : "DESCIFREMOS!";
    encrip = encrip ? false : true;
  }
});

d.addEventListener("click", (e) => {
  if (e.target === process || e.target.parentElement === process) {
    if (/^[a-z\s.0-9]+$/.test(text.value) && !(text.value.length > 1000)) {
      result.value = encrip ? decodificar(text.value) : codificar(text.value);
      mensajes({
        mensaje: `Texto transformado correctamente`,
        color: "#0abf30",
        icon: "<i class='bx bxs-check-circle'></i>",
      });
    } else {
      mensajes({
        mensaje: `Solo letras minusculas sin acentos`,
        color: "#e24d4c",
        icon: "<i class='bx bxs-x-circle' ></i>",
      });
    }
  }

  if (e.target === copy || e.target.parentElement === copy) {
    navigator.clipboard
      .writeText(result.value)
      .then((e) =>
        mensajes({
          mensaje: "Texto copiado correctamente",
          color: "#0abf30",
          icon: "<i class='bx bxs-check-circle'></i>",
        })
      )
      .catch((e) =>
        mensajes({
          mensaje: "Error al copiar el texto",
          color: "#e24d4c",
          icon: "<i class='bx bxs-x-circle' ></i>",
        })
      );
  }

  if (e.target.matches("#close") || e.target.matches("#close *"))
    deleteMessage();
});
