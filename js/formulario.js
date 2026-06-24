document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value.trim(), 10);
    const comentario = document.getElementById("comentario").value.trim();
    const categoria = document.getElementById("categoria").value;

    if (!nombre || !edad || !comentario || !categoria) {
        Swal.fire("Campos incompletos", "Por favor completa todos los campos", "warning");
        return;
    }

    // 👉 Validación especial para edad < 16
    if (edad < 16) {
        Swal.fire({
            title: "Error",
            text: "Debes tener al menos 16 años para enviar sugerencias",
            icon: "error", // 🔴 Esto hace que el mensaje salga en rojo
            confirmButtonText: "Entendido"
        });
        return;
    }

    // 👉 Si todo está correcto
    let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];
    sugerencias.push({
        nombre: nombre,
        edad: edad,
        comentario: comentario,
        categoria: categoria,
        fecha: new Date().toLocaleString()
    });
    localStorage.setItem("sugerencias", JSON.stringify(sugerencias));

    Swal.fire({
        title: "¡Gracias!",
        text: "Tu sugerencia fue enviada correctamente ✅",
        icon: "success",
        confirmButtonText: "Cerrar"
    });

    document.getElementById("formulario").reset();
});


