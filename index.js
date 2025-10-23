// SELECCIÓN DE ELEMENTOS
const inputRango = document.querySelector(".input-range");
const spanEnVivo = document.querySelector(".span");
const mayusCheckbox = document.querySelector("#mayus");
const minusCheckbox = document.querySelector("#minus");
const numeCheckbox = document.querySelector("#nume");
const simbCheckbox = document.querySelector("#simb");
const generar = document.querySelector(".generar");
const copiar = document.querySelector(".copiar");
const resultado = document.querySelector(".resultado");  // ESTE YA ES EL INPUT DIRECAMENTE, NO HACÍA FALTA AGREGAR OTRA COSA

// VARIABLES 
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';


// EVENTOS
copiar.addEventListener("click", () => {
    const textoACopiar = resultado.value;
    if (!textoACopiar) return resultado.value = "No hay texto para copiar";
    if (resultado.value === "No hay texto para copiar" || 
        resultado.value === "Por favor, seleccione al menos una opción de caracteres") return;
    
    // MÉTODO MODERNO
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(resultado.value).then(() => {

            copiar.textContent = "¡Copiado!";
            setTimeout(() => {
                copiar.textContent = "Copiar"
            }, 1500)
        })
        .catch (err => {
            console.log("Hay un error: ", err);
        })
    } else { // POR POSIBLE FALLO, MÉTODO ANTIGUO
        const textArea = document.createElement("textarea");
        textArea.value = textoACopiar;
        textArea.classList.add("textArea");
        document.body.appendChild(textArea);

        textArea.select();
        document.execCommand('copy');

        document.body.removeChild(textArea);

        copiar.textContent = "¡Copiado!"
        setTimeout(() => {
            copiar.textContent = "Copiar"
        }, 1500);
    }
})

inputRango.addEventListener("input", (e) => {
    spanEnVivo.textContent = e.target.value;
});

generar.addEventListener("click", () => {
    let caracterPool = '';
    let password = '';
    let longitud = Number(inputRango.value);

    if (mayusCheckbox.checked) { caracterPool += UPPERCASE_CHARS };
    if (minusCheckbox.checked) { caracterPool += LOWERCASE_CHARS };
    if (numeCheckbox.checked) { caracterPool += NUMBER_CHARS };
    if (simbCheckbox.checked) { caracterPool += SYMBOL_CHARS };

    if (caracterPool.length == 0) {
        resultado.value = "Por favor, seleccione al menos una opción de caracteres";
        return;
    }

    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracterPool.length);
        password += caracterPool[randomIndex];
    }

    resultado.value = password;
});