let preguntasPorCategoria = {};
let preguntas = [];
let indiceActual = 0;
let puntos = 0;
let categoriaActual = "";
let modoActual = "";
let vidas = 3;
let timer;

// 🔹 Cargar preguntas desde JSON
fetch("./js/preguntas.json")
    .then(res => res.json())
    .then(data => {
        preguntasPorCategoria = data;

        // Una vez cargado el JSON, arrancar el juego si hay categoría guardada
        const categoria = localStorage.getItem("categoriaSeleccionada");
        const modo = localStorage.getItem("modoSeleccionado");

        if (categoria && modo) {
            categoriaActual = categoria;
            modoActual = modo;

            if (categoriaActual === "aleatorio") {
                const todas = Object.values(preguntasPorCategoria).flat();
                preguntas = todas.sort(() => Math.random() - 0.5).slice(0, 10);
            } else if (preguntasPorCategoria[categoriaActual]) {
                preguntas = preguntasPorCategoria[categoriaActual]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 10);
            } else {
                Swal.fire("Error", "Categoría no encontrada en JSON", "error");
                return;
            }

            if (!preguntas || preguntas.length === 0) {
                Swal.fire("Sin preguntas", "No hay preguntas para esta categoría", "warning");
                return;
            }

            document.getElementById("quiz").style.display = "block";
            indiceActual = 0;
            puntos = 0;
            vidas = 3;
            document.getElementById("puntos").innerText = puntos;

            mostrarPregunta(indiceActual);
        } else {
            Swal.fire("Error", "No se seleccionó categoría ni modo", "error");
        }
    })
    .catch(err => Swal.fire("Error", "No se pudieron cargar las preguntas", "error"));

function mostrarPregunta(indice) {
    const pregunta = preguntas[indice];
    document.getElementById("pregunta").innerText = pregunta.texto;
    document.getElementById("pregunta-numero").innerText = 
        `Pregunta ${indiceActual + 1} de ${preguntas.length}`;

    const opcionesDiv = document.getElementById("opciones");
    opcionesDiv.innerHTML = "";

    const opcionesMezcladas = [...pregunta.opciones].sort(() => Math.random() - 0.5);

    opcionesMezcladas.forEach(opcion => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.classList.add("opcion-btn");
        btn.innerText = opcion;
        btn.onclick = () => verificarRespuesta(opcion, pregunta.respuesta, btn);
        opcionesDiv.appendChild(btn);
    });

    clearInterval(timer);

    if (modoActual === "contrarreloj") {
        let tiempoRestante = 6;
        document.getElementById("resultado").innerText = `⏱ Tiempo: ${tiempoRestante}s`;
        timer = setInterval(() => {
            tiempoRestante--;
            document.getElementById("resultado").innerText = `⏱ Tiempo: ${tiempoRestante}s`;
            if (tiempoRestante <= 0) {
                clearInterval(timer);
                verificarRespuesta("TIEMPO", pregunta.respuesta, null);
            }
        }, 1000);
    } else {
        document.getElementById("resultado").innerText = "";
    }
}

function verificarRespuesta(opcion, respuestaCorrecta, botonSeleccionado) {
    clearInterval(timer);
    const resultado = document.getElementById("resultado");
    const botones = document.querySelectorAll(".opcion-btn");
    botones.forEach(b => b.disabled = true);

    if (opcion === respuestaCorrecta) {
        resultado.innerText = "✅ Correcto!";
        puntos++;
        document.getElementById("puntos").innerText = puntos;
        if (botonSeleccionado) botonSeleccionado.style.backgroundColor = "green";
    } else {
        resultado.innerText = "❌ Incorrecto!";
        if (botonSeleccionado) botonSeleccionado.style.backgroundColor = "red";
        botones.forEach(b => {
            if (b.innerText === respuestaCorrecta) {
                b.style.backgroundColor = "green";
            }
        });

        if (modoActual === "supervivencia") {
            vidas--;
            resultado.innerText += ` ❤️ Vidas restantes: ${vidas}`;
            if (vidas <= 0) {
                mostrarMensajeFinal();
                return;
            }
        }
    }

    setTimeout(() => {
        indiceActual++;
        if (indiceActual < preguntas.length) {
            mostrarPregunta(indiceActual);
        } else {
            mostrarMensajeFinal();
        }
    }, 1000);
}

function mostrarMensajeFinal() {
    let mensajeFinal = "";

    if (puntos === preguntas.length) {
        mensajeFinal = "🎉 ¡Excelente! Respondiste todas correctamente 👏";
    } else if (puntos >= preguntas.length * 0.7) {
        mensajeFinal = "😎 Muy bien, acertaste " + puntos + " de " + preguntas.length;
    } else if (puntos >= preguntas.length * 0.4) {
        mensajeFinal = "🙂 No está mal, acertaste " + puntos + " de " + preguntas.length;
    } else {
        mensajeFinal = "🤔 Podés mejorar, acertaste " + puntos + " de " + preguntas.length;
    }

    Swal.fire("Juego terminado", mensajeFinal, "info");

    let historial = JSON.parse(localStorage.getItem("historialQuiz")) || [];
    historial.push({ puntaje: puntos, total: preguntas.length, fecha: new Date().toLocaleString() });
    localStorage.setItem("historialQuiz", JSON.stringify(historial));

    let mejor = Math.max(...historial.map(h => h.puntaje));
    document.getElementById("resultado").innerText = 
        `🛑 Juego terminado. Mejor puntaje: ${mejor}/${preguntas.length}`;

    document.getElementById("opciones").innerHTML = "";

    Swal.fire({
        title: "¿Deseás volver a jugar?",
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¿Querés cambiar de categoría?",
                showDenyButton: true,
                confirmButtonText: "Sí",
                denyButtonText: "No"
            }).then((res) => {
                if (res.isConfirmed) {
                    // 👉 Redirigir al selector
                    window.location.href = "preguntados.html";
                } else {
                    // 👉 Reiniciar el juego con la misma categoría
                    document.getElementById("resultado").innerText = "";
                    indiceActual = 0;
                    puntos = 0;
                    vidas = 3;
                    mostrarPregunta(indiceActual);
                }
            });
        }
    });
}




















