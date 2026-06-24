#  Preguntados Web

Aplicación web interactiva de preguntas y respuestas desarrollada en **JavaScript**, que simula un juego tipo trivia.  
Este proyecto fue creado como **evaluación final** del curso de Frontend con JavaScript.

---

##  Contexto
El objetivo del proyecto es demostrar el uso de:
- **Manipulación del DOM y eventos** para mostrar preguntas, opciones y resultados en tiempo real.
- **Fetch y JSON** para cargar dinámicamente las preguntas desde un archivo externo.
- **Librerías externas (SweetAlert2)** para mejorar la experiencia de usuario y reemplazar `alert`, `prompt` y `confirm`.
- **LocalStorage** para guardar historial de partidas y sugerencias de usuarios.
- **CSS gamer futurista** para darle un estilo atractivo y moderno.

---

##  Estructura del proyecto
- `index.html` → Página principal.
- `preguntados.html` → Selector de categoría y modo de juego.
- `juego.html` → Pantalla del quiz interactivo.
- `formulario.html` → Formulario de opinión con validaciones.
- `style.css` → Estilos gamer futuristas.
- `main.js` → Lógica del juego (DOM, Fetch, modos de juego).
- `formulario.js` → Validación y almacenamiento de sugerencias.
- `preguntas.json` → Base de datos de preguntas por categoría.

---

##  Funcionalidades
- Selección de **categoría** y **modo de juego** (normal, contrarreloj, supervivencia).
- Preguntas dinámicas con opciones aleatorias.
- Sistema de **puntos y vidas**.
- **Historial de partidas** guardado en LocalStorage.
- Formulario de feedback con validación y almacenamiento.
- Interfaz visual con estilo gamer.

---

##  Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/preguntados-web.git

2. Abrir el proyecto en tu navegador (no requiere servidor, funciona con archivos locales).

---


## Demo
- link a github pages: https://alexiscardozo4556.github.io/preguntados/

---

## Reflexion final
- Este proyecto permitió integrar todos los conceptos aprendidos:

1. DOM y eventos.

2. Asincronismo con Fetch.

3. Uso de librerías externas.

4. Buenas prácticas de código y estructura clara.

El mayor desafío fue organizar el JSON y manejar los distintos modos de juego.
Como mejora futura, se podría implementar un ranking global, multijugador en tiempo real o integración con APIs externas.

---

## Autor
- Cardozo Alexis Tobias
- Comision: 92395