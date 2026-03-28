/**
 * CSS Quest - script.js
 * Controlador principal tipo SPA (Single Page Application)
 */

// Global Error Handler
window.onerror = function(message, source, lineno, colno, error) {
  document.body.innerHTML = `
    <div style="padding: 2rem; color: #fff; background: #ef4444; font-family: sans-serif; height: 100vh;">
      <h1>Critical Error 🚨</h1>
      <p><b>Mensaje:</b> ${message}</p>
      <p><b>Archivo:</b> ${source}</p>
      <p><b>Línea:</b> ${lineno} : ${colno}</p>
      <pre style="background: rgba(0,0,0,0.2); padding: 1rem;">${error ? error.stack : 'N/A'}</pre>
    </div>
  `;
  return true;
};

let currentLevelIndex = 0;

// Base de datos de niveles interactivos
const levelsInfo = [
  // NIVEL 0: Bienvenida
  {
    id: 0,
    title: "¿Cuánto sabes de CSS?",
    concept: "Introducción",
    intro: "Bienvenido a CSS Quest, una experiencia interactiva para aprender CSS moderno.",
    introDetails: "A lo largo de 10 niveles aprenderás desde variables hasta container queries y nesting de manera interactiva.",
    challenge: "Haz clic en 'Comenzar' para iniciar tu aventura.",
    outro: "¡Preparándonos para tu código!",
    outroDetails: [],
    outroTip: "TIP: La práctica constante es la mejor manera de dominar CSS.",
    template: `
      <div class="theory-area animate-fade-in" style="grid-column: 1 / -1; text-align: center;">
        <span class="logo-icon" style="font-size: 5rem; display: block; margin: 0 auto 1rem;">🚀</span>
        <h1 class="level-title" style="font-size: 3rem; margin-bottom: 2rem;">¿Estás listo para<br>subir de nivel?</h1>
        <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 2rem;">
          Explora los conceptos más importantes de CSS que vimos en clases y observa sus efectos en tiempo real.
        </p>
        <button id="start-btn" class="btn btn-primary" style="font-size: 1.5rem; padding: 1rem 3rem;">Comenzar</button>
      </div>
    `,
    setup: (wrapper, successCb) => {
      wrapper.querySelector('#start-btn').addEventListener('click', successCb);
    }
  },

  // NIVEL 1: Variables
  {
    id: 1,
    title: "Variables CSS",
    concept: "Custom Properties",
    intro: "¿Qué son las variables CSS?",
    introDetails: "Las Custom Properties (variables CSS) te permiten almacenar un valor (como un color) en un lugar y reutilizarlo en todo el stylesheet. Se declaran usando '--' y se llaman con 'var(--nombre)'.",
    challenge: "Haz clic en el botón 'Cambiar Tema' para aplicar la clase 'theme-dark' al :root y mira cómo cambian los colores automáticamente.",
    outro: "Has aprendido a usar Variables CSS.",
    outroDetails: [
      "Ejemplo 1: Cambiar colores corporativos en un solo lugar.",
      "Ejemplo 2: Modo claro y oscuro automáticos."
    ],
    outroTip: "Siempre define tus variables en :root{} para que sean globales.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Variables</span>
        <h2 class="level-title">Variables CSS</h2>
        <p><strong>Uso actual:</strong> <br><code>:root { --bg-color: #f8fafc; }</code></p>
        <p>A diferencia de lenguajes compilados (como Sass), las variables CSS se pueden modificar directo desde JavaScript y su efecto es inmediato.</p>
        <div class="controls-panel">
          <button id="toggle-theme" class="btn btn-secondary">☀️ / 🌙 Cambiar Tema</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s;">
        <div class="card" style="width: 100%; max-width: 350px; text-align: center; margin: 0 auto;">
          <h3>Soy un Componente</h3>
          <p style="margin-top: 1rem; color: var(--text-muted);">Mis colores dependen de variables. Observa cómo cambio al presionar el botón.</p>
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      let isDark = false;
      wrapper.querySelector('#toggle-theme').addEventListener('click', () => {
        isDark = !isDark;
        document.documentElement.classList.toggle('theme-dark', isDark);
        successCb();
      });
    }
  },

  // NIVEL 2: Funciones (calc/clamp)
  {
    id: 2,
    title: "Funciones Clamp y Calc",
    concept: "Responsive Math",
    intro: "¿Qué es clamp()?",
    introDetails: "La función clamp(min, val, max) toma tres parámetros. Es ideal para fuentes responsivas porque evita que el texto sea muy pequeño en móviles o gigantesco en monitores.",
    challenge: "Mueve el slider para cambiar el ancho simulado de la pantalla (vw) y observa cómo la caja usa clamp() para limitar su tamaño mínimo y máximo.",
    outro: "¡Clamp es poderoso para diseños fluidos!",
    outroDetails: [
      "Ejemplo 1: width: clamp(200px, 50vw, 800px);",
      "Ejemplo 2: font-size: clamp(1rem, 2vw, 3rem);"
    ],
    outroTip: "clamp() también reduce la necesidad de escribir tantos media queries.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Funciones</span>
        <h2 class="level-title">clamp()</h2>
        <p><strong>Regla aplicada en la caja lila:</strong></p>
        <pre><code>width: clamp(25vw, <span id="vw-display">25</span>vw, 69vw);</code></pre>
        <div class="controls-panel">
          <label for="vw-slider">Simular Viewport Width (vw): <span id="vw-val">25</span>vw</label>
          <input type="range" id="vw-slider" min="25" max="69" value="25">
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s;">
        <div id="clamp-box" style="background: var(--primary); color: white; padding: 20px; text-align: center; border-radius: 8px; width: 25%; min-width: 25%; max-width: 69%; transition: width 0.1s;">
          ¡La caja crece!
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const slider = wrapper.querySelector('#vw-slider');
      const docVal = wrapper.querySelector('#vw-val');
      const vwDisplay = wrapper.querySelector('#vw-display');
      const box = wrapper.querySelector('#clamp-box');
      
      let movedToEdge = false;
      slider.addEventListener('input', (e) => {
        const val = e.target.value;
        docVal.textContent = val;
        vwDisplay.textContent = val;
        // Simular vw aplicando un width de porcentaje pero manteniendo limites min max 
        box.style.width = val + '%'; 
        
        if (val <= 25 || val >= 69) movedToEdge = true;
        if (movedToEdge) successCb();
      });
    }
  },

  // NIVEL 3: Flexbox
  {
    id: 3,
    title: "Centrado con Flexbox",
    concept: "Flexbox",
    intro: "¿Qué es Flexbox?",
    introDetails: "Un módulo de layout diseñado para organizar elementos en un contenedor en una sola dimensión (fila o columna), adaptando su tamaño al espacio libre.",
    challenge: "Alinea y reordena los 3 ítems del contenedor gris. Domina el flujo primario, el transversal y la dirección.",
    outro: "Dominaste el flujo y el centrado de Flexbox.",
    outroDetails: [
      "Ejemplo 1: Centrar un div perfectamente al medio.",
      "Ejemplo 2: Crear una barra de navegación (navbar)."
    ],
    outroTip: "Recuerda que Flexbox es unidimensional (trabaja en 1 eje a la vez).",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Flexbox</span>
        <h2 class="level-title">Centrado y Reorden</h2>
        <p>Aplica o quita consecutivamente estas propiedades al contenedor gris para ubicarlos.</p>
        <p style="font-size: 0.85rem; color: var(--warning); margin-bottom: 1rem;">
          💡 <em>Recuerda: Las funciones 2, 3 y 4 <b>NO tendrán ningún efecto visual</b> a menos que el contenedor tenga <code>display: flex</code> activado.</em>
        </p>
        <div class="controls-panel" style="flex-direction: column;">
          <button id="btn-flex" class="btn btn-secondary">1. display: flex;</button>
          <button id="btn-reverse" class="btn btn-secondary">2. flex-direction: row-reverse;</button>
          <button id="btn-justify" class="btn btn-secondary">3. justify-content: center;</button>
          <button id="btn-align" class="btn btn-secondary">4. align-items: center;</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s;">
        <div id="flex-container" class="flex-demo-container" style="display: block;">
          <div class="box-demo" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">1</div>
          <div class="box-demo" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">2</div>
          <div class="box-demo" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;">3</div>
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const container = wrapper.querySelector('#flex-container');
      const btnFlex = wrapper.querySelector('#btn-flex');
      const btnReverse = wrapper.querySelector('#btn-reverse');
      const btnJustify = wrapper.querySelector('#btn-justify');
      const btnAlign = wrapper.querySelector('#btn-align');
      
      let flexStatus = { d: false, r: false, j: false, a: false };

      const checkSuccess = () => {
        if (flexStatus.d && flexStatus.r && flexStatus.j && flexStatus.a) {
          successCb();
        }
      };

      btnFlex.addEventListener('click', () => {
        flexStatus.d = !flexStatus.d;
        container.style.display = flexStatus.d ? 'flex' : 'block';
        if (flexStatus.d) {
          btnFlex.classList.replace('btn-secondary', 'btn-primary');
        } else {
          btnFlex.classList.replace('btn-primary', 'btn-secondary');
        }
        checkSuccess();
      });

      btnReverse.addEventListener('click', () => {
        flexStatus.r = !flexStatus.r;
        container.style.flexDirection = flexStatus.r ? 'row-reverse' : 'row';
        if (flexStatus.r) {
          btnReverse.classList.replace('btn-secondary', 'btn-primary');
        } else {
          btnReverse.classList.replace('btn-primary', 'btn-secondary');
        }
        checkSuccess();
      });

      btnJustify.addEventListener('click', () => {
        flexStatus.j = !flexStatus.j;
        container.style.justifyContent = flexStatus.j ? 'center' : 'flex-start';
        if (flexStatus.j) {
          btnJustify.classList.replace('btn-secondary', 'btn-primary');
        } else {
          btnJustify.classList.replace('btn-primary', 'btn-secondary');
        }
        checkSuccess();
      });

      btnAlign.addEventListener('click', () => {
        flexStatus.a = !flexStatus.a;
        container.style.alignItems = flexStatus.a ? 'center' : 'stretch';
        if (flexStatus.a) {
          btnAlign.classList.replace('btn-secondary', 'btn-primary');
        } else {
          btnAlign.classList.replace('btn-primary', 'btn-secondary');
        }
        checkSuccess();
      });
    }
  },

  // NIVEL 4: Grid Layout
  {
    id: 4,
    title: "Grillas Bidimensionales",
    concept: "CSS Grid",
    intro: "¿Qué es Grid Layout?",
    introDetails: "A diferencia de Flexbox, CSS Grid permite maquetar elementos en dos dimensiones (filas y columnas) al mismo tiempo, ideal para crear el esqueleto principal de una página.",
    challenge: "Configura las columnas de tu Grid interactivo arrastrando los bloques desde el depósito hasta la nueva grilla.",
    outro: "¡Excelente! Has dominado la estructura básica de Grid y organizado tus elementos.",
    outroDetails: [
      "Ejemplo 1: Galería de imágenes estilo Pinterest.",
      "Ejemplo 2: Layout principal de página (Header, Sidebar, Main, Footer)."
    ],
    outroTip: "Puedes agrupar elementos fácilmente en grillas con drag-and-drop si lo combinas con HTML5.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Grid</span>
        <h2 class="level-title">Grid Layout Interactivo</h2>
        <p>Ajusta el número de columnas y la separación (gap). Luego, <b>arrastra</b> todas cajas dentro de tu Grid.</p>
        
        <div class="controls-panel" style="flex-direction: column; gap: 15px; align-items: stretch;">
          <label for="col-slider"><strong>Columnas:</strong> <span id="col-display">3</span></label>
          <input type="range" id="col-slider" min="1" max="6" value="3" style="margin-bottom: 5px;">
          
          <label for="row-slider"><strong>Filas:</strong> <span id="row-display">2</span></label>
          <input type="range" id="row-slider" min="1" max="6" value="2" style="margin-bottom: 5px;">
          
          <label for="row-gap-slider"><strong>Row Gap (px):</strong> <span id="row-gap-display">10</span>px</label>
          <input type="range" id="row-gap-slider" min="0" max="30" value="10" style="margin-bottom: 5px;">
          
          <label for="col-gap-slider"><strong>Column Gap (px):</strong> <span id="col-gap-display">10</span>px</label>
          <input type="range" id="col-gap-slider" min="0" max="30" value="10">
        </div>
      </div>
      <div class="interactive-area animate-slide-up" id="grid-interactive" style="animation-delay: 0.1s; flex-direction: column; gap: 20px; align-items: stretch;">
        
        <!-- Bloques fuera en contenedor inicial -->
        <h4 style="margin: 0; color: var(--text-muted);">Depósito Inicial</h4>
        <div id="source-container" style="display: flex; flex-wrap: wrap; gap: 10px; min-height: 80px; padding: 15px; border: 2px dashed var(--text-muted); border-radius: 8px; transition: background 0.2s;">
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold;">A</div>
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold; background: var(--secondary);">B</div>
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold; background: var(--warning);">C</div>
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold;">D</div>
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold; background: var(--secondary);">E</div>
          <div class="box-demo" draggable="true" style="width: 50px; height: 50px; cursor: grab; display:flex; align-items:center; justify-content:center; font-weight:bold; background: var(--warning);">F</div>
        </div>

        <h4 style="margin: 0; color: var(--text-muted);">Tu Grid Personalizado</h4>
        <div id="target-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 50px); place-items: center; place-content: center; gap: 10px; min-height: 150px; padding: 15px; border: 2px solid var(--primary); border-radius: 8px; transition: background 0.2s;">
        </div>
        
      </div>
    `,
    setup: (wrapper, successCb) => {
      const sourceContainer = wrapper.querySelector('#source-container');
      const targetGrid = wrapper.querySelector('#target-grid');
      const colSlider = wrapper.querySelector('#col-slider');
      const rowSlider = wrapper.querySelector('#row-slider');
      const rowGapSlider = wrapper.querySelector('#row-gap-slider');
      const colGapSlider = wrapper.querySelector('#col-gap-slider');
      
      const colDisplay = wrapper.querySelector('#col-display');
      const rowDisplay = wrapper.querySelector('#row-display');
      const rowGapDisplay = wrapper.querySelector('#row-gap-display');
      const colGapDisplay = wrapper.querySelector('#col-gap-display');
      
      const boxes = wrapper.querySelectorAll('.box-demo');
      const totalBoxes = boxes.length;

      let prevCols = parseInt(colSlider.value);
      let prevRows = parseInt(rowSlider.value);

      // Update grid layout function
      const updateGrid = (e) => {
        const cols = parseInt(colSlider.value);
        const rows = parseInt(rowSlider.value);
        const rGap = rowGapSlider.value;
        const cGap = colGapSlider.value;
        
        let hasConflict = false;
        if (e && (cols < prevCols || rows < prevRows)) {
            targetGrid.querySelectorAll('.grid-slot').forEach(slot => {
                if (slot.children.length > 0) {
                    const r = parseInt(slot.dataset.r);
                    const c = parseInt(slot.dataset.c);
                    if (r >= rows || c >= cols) {
                        hasConflict = true;
                    }
                }
            });
        }

        if (hasConflict) {
            alert('¡Hay bloques ocupando el espacio que intentas eliminar! Retíralos primero antes de achicar la grilla.');
            colSlider.value = prevCols;
            rowSlider.value = prevRows;
            return;
        }

        prevCols = cols;
        prevRows = rows;
        
        colDisplay.textContent = cols;
        rowDisplay.textContent = rows;
        rowGapDisplay.textContent = rGap;
        colGapDisplay.textContent = cGap;
        
        targetGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        targetGrid.style.gridTemplateRows = `repeat(${rows}, 60px)`;
        targetGrid.style.rowGap = `${rGap}px`;
        targetGrid.style.columnGap = `${cGap}px`;

        const existingBlocks = [];
        targetGrid.querySelectorAll('.grid-slot').forEach(slot => {
            if (slot.children.length > 0) {
                existingBlocks.push({ r: slot.dataset.r, c: slot.dataset.c, el: slot.children[0] });
            }
        });

        targetGrid.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const slot = document.createElement('div');
                slot.className = 'grid-slot drop-zone';
                slot.dataset.r = r;
                slot.dataset.c = c;
                slot.style.border = '2px dashed var(--text-muted)';
                slot.style.borderRadius = '4px';
                slot.style.display = 'flex';
                slot.style.alignItems = 'center';
                slot.style.justifyContent = 'center';
                slot.style.width = '100%';
                slot.style.height = '100%';
                slot.style.minHeight = '60px';
                
                setupDropZone(slot);
                targetGrid.appendChild(slot);
            }
        }

        existingBlocks.forEach(b => {
             const slot = targetGrid.querySelector(`.grid-slot[data-r="${b.r}"][data-c="${b.c}"]`);
             if (slot) slot.appendChild(b.el);
        });
      };

      colSlider.addEventListener('input', updateGrid);
      rowSlider.addEventListener('input', updateGrid);
      rowGapSlider.addEventListener('input', updateGrid);
      colGapSlider.addEventListener('input', updateGrid);

      // Drag and drop mechanics
      let draggedItem = null;

      boxes.forEach(box => {
        box.addEventListener('dragstart', function() {
          draggedItem = this;
          setTimeout(() => this.style.opacity = '0.5', 0);
        });
        
        box.addEventListener('dragend', function() {
          setTimeout(() => this.style.opacity = '1', 0);
          draggedItem = null;
        });
      });

      const setupDropZone = (zone) => {
        zone.addEventListener('dragover', (e) => {
          e.preventDefault();
        });
        zone.addEventListener('dragenter', (e) => {
          e.preventDefault();
          if (zone.classList.contains('grid-slot') && zone.children.length > 0) return;
          zone.style.backgroundColor = 'rgba(230, 57, 70, 0.05)';
        });
        zone.addEventListener('dragleave', () => {
          zone.style.backgroundColor = 'transparent';
        });
        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          zone.style.backgroundColor = 'transparent';
          if (draggedItem) {
            
            if (zone.classList.contains('grid-slot') && zone.children.length > 0) {
              return; // Denegar si el cuadro ya está ocupado
            }

            zone.appendChild(draggedItem);
            
            // Si la grilla tiene todos los bloques, ganaste
            const countInGrid = targetGrid.querySelectorAll('.box-demo').length;
            if (countInGrid === totalBoxes) {
              successCb();
            }
          }
        });
      };

      setupDropZone(sourceContainer);
      updateGrid(); // Create slots on load
    }
  },

  // NIVEL 5: Media Queries
  {
    id: 5,
    title: "Media Queries",
    concept: "@media",
    intro: "¿Qué son y para qué?",
    introDetails: "Son reglas CSS condicionales. Permiten cambiar el diseño si se cumple una condición, usualmente el ancho de la pantalla (max-width o min-width).",
    challenge: "Reduce el ancho simulado usando el slider. El Media Query indica que bajo 400px, las columnas del contenedor pasan de apiladas horizontal a vertical.",
    outro: "Hiciste tu primer paso en el diseño Responsive (adaptable).",
    outroDetails: [
      "Ejemplo 1: Ocultar barras laterales de PC cuando se ve en un celular.",
      "Ejemplo 2: Convertir un menú desplegable en un 'botón hamburguesa'."
    ],
    outroTip: "Se recomienda enfocar el diseño primero en celular ('Mobile First') con min-width.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Media</span>
        <h2 class="level-title">Media Queries</h2>
        <pre><code>@media (max-width: 400px) {
  .caja { flex-direction: column; }
}</code></pre>
        <div class="controls-panel">
          <label>Ancho Dispositivo Simulado: <span id="mq-val">100</span>%</label>
          <input type="range" id="mq-slider" min="30" max="100" value="100">
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s; display: flex; justify-content: center; width: 100%;">
        <!-- Contenedor simulador -->
        <div style="border: 4px solid var(--text-muted); border-radius: 20px; padding: 10px; height: 300px; width: 100%; max-width: 600px; display: flex; align-items:flex-end; justify-content:center;">
          <div id="mq-device" style="width: 100%; height: 260px; background: var(--surface-color); border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; display: flex; gap: 10px; padding: 10px; transition: width 0.3s;">
             <div class="box-demo" style="flex:1; height: 100%;">1</div>
             <div class="box-demo" style="flex:1; height: 100%; background: var(--secondary);">2</div>
          </div>
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const slider = wrapper.querySelector('#mq-slider');
      const valDisp = wrapper.querySelector('#mq-val');
      const device = wrapper.querySelector('#mq-device');
      
      slider.addEventListener('input', (e) => {
        const width = e.target.value;
        valDisp.textContent = width;
        device.style.width = width + '%';
        
        // Simular media query
        if (width <= 45) {
          device.style.flexDirection = 'column';
          successCb();
        } else {
          device.style.flexDirection = 'row';
        }
      });
    }
  },

  // NIVEL 6: Container Queries
  {
    id: 6,
    title: "Container Queries",
    concept: "@container",
    intro: "El futuro del Responsiveness",
    introDetails: "Mientras las Media Queries dependen del tamaño de la pantalla, las Container Queries dependen del tamaño del *contenedor padre*. Así un componente es autónomo y se adapta, sin importar dónde en la página resida.",
    challenge: "Encoje el área del componente 'Perfil' (que está marcado como container). Cuando sea pequeño, se adaptará para ocultar el texto secundario o cambiar de orientación.",
    outro: "¡Has adaptado un componente de forma pura y local!",
    outroDetails: [
      "Ejemplo 1: Una tarjeta (card) que dentro de una sidebar sea vertical, pero en el main sea horizontal.",
      "Ejemplo 2: Evitar problemas de desbordamiento en componentes reusables."
    ],
    outroTip: "Debes declarar container-type: inline-size; en el contenedor para poder evaluar su tamaño con @container.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">@container</span>
        <h2 class="level-title">Container Queries</h2>
        <pre><code>.wrapper {
  container-type: inline-size;
}
@container (max-width: 300px) {
  .tarjeta { background: rojo; }
}</code></pre>
        <div class="controls-panel">
          <label>Cambiar el tamaño del contenedor: <span id="cq-val">100</span>%</label>
          <input type="range" id="cq-slider" min="30" max="100" value="100">
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s; display: flex; justify-content: center; align-items: flex-start; width: 100%;">
        <!-- Container -->
        <div id="cq-parent" style="width: 100%; max-width: 600px; padding: 10px; border: 2px dashed var(--primary); container-type: inline-size; border-radius: 8px; transition: width 0.3s;">
           <!-- Element inside rules applied via script because standard cq might need classes for older fallback too, but JS is easier to fake or trigger exact class change, we will simulate via JS inline if we don't have css rules -->
           <div id="cq-child" style="display: flex; gap: 15px; align-items:center; background: var(--surface-color); padding: 15px; border-radius: 8px; box-shadow: var(--shadow-sm);">
              <div style="width: 50px; height: 50px; background: var(--warning); border-radius: 50%;"></div>
              <div id="cq-text">
                 <h4 style="margin:0;">Juan Pérez</h4>
                 <p style="margin:0; font-size: 0.9em; color: var(--text-muted);" id="cq-sub">Desarrollador Web</p>
              </div>
           </div>
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const slider = wrapper.querySelector('#cq-slider');
      const parent = wrapper.querySelector('#cq-parent');
      const child = wrapper.querySelector('#cq-child');
      const sub = wrapper.querySelector('#cq-sub');
      
      slider.addEventListener('input', (e) => {
        const width = e.target.value;
        wrapper.querySelector('#cq-val').textContent = width;
        parent.style.width = width + '%';
        
        // Simular container query
        if (width <= 50) {
          child.style.flexDirection = 'column';
          child.style.textAlign = 'center';
          sub.style.display = 'none';
          successCb();
        } else {
          child.style.flexDirection = 'row';
          child.style.textAlign = 'left';
          sub.style.display = 'block';
        }
      });
    }
  },

  // NIVEL 7: Transiciones
  {
    id: 7,
    title: "Transiciones Suaves",
    concept: "transition",
    intro: "¿Qué es Transition?",
    introDetails: "Permite cambiar valores de propiedades CSS a lo largo del tiempo de manera fluida, en lugar de que ocurran instantáneamente.",
    challenge: "Pasa el ratón (hover) sobre la caja morada para interactuar, pero verás que ahora será muy brusco. Presiona el botón para inyectarle una `transition` y vuelve a probar.",
    outro: "¡Agregaste mantequilla (suavidad) a tu interfaz!",
    outroDetails: [
      "Ejemplo 1: Suavizar un botón al poner el ratón encima.",
      "Ejemplo 2: Oscurecer una imagen al seleccionarla."
    ],
    outroTip: "Cuidado: No transiciones `display`. Mejor transicionar `opacity` usando `visibility` en apoyo.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Transición</span>
        <h2 class="level-title">transition</h2>
        <p>Propiedades comunes a transicionar:</p>
        <ul>
          <li>background-color</li>
          <li>transform</li>
          <li>opacity</li>
        </ul>
        <div class="controls-panel">
          <button id="btn-transition" class="btn btn-secondary">Añadir transition: 0.5s;</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s;">
        <style>
          .hover-test {
             background: var(--primary); width: 100px; height: 100px; border-radius: 12px; cursor: pointer;
          }
          .hover-test:hover {
             background: var(--secondary); transform: scale(1.3) translateY(-10px);
          }
        </style>
        <div id="hover-box" class="hover-test"></div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const btn = wrapper.querySelector('#btn-transition');
      const box = wrapper.querySelector('#hover-box');
      let tadded = false;

      btn.addEventListener('click', () => {
        box.style.transition = 'all 0.5s ease';
        btn.classList.replace('btn-secondary', 'btn-primary');
        btn.innerText = "¡Transición Aplicada!";
        tadded = true;
      });

      box.addEventListener('mouseenter', () => {
        if(tadded) successCb();
      });
    }
  },

  // NIVEL 8: Transformaciones
  {
    id: 8,
    title: "Mover, Rotar, Escalar",
    concept: "transform",
    intro: "¿Qué son las transformaciones?",
    introDetails: "Modifican la coordenada espacial, tamaño y rotación de un div sin afectar a sus elementos hermanos en el flujo normal (muy parecido a position pero mucho más potente visualmente).",
    challenge: "Usa los botones numéricos para aplicar rotación y escala al objeto en pantalla usando CSS.",
    outro: "Las transformaciones abren la puerta al 2D y 3D.",
    outroDetails: [
      "Ejemplo 1: Rotar un ícono de flecha al abrir un submenú.",
      "Ejemplo 2: Aumentar el tamaño de una foto seleccionada (scale)."
    ],
    outroTip: "Combinar transform con transition permite crear micro-interacciones excelentes para la UX.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Transform</span>
        <h2 class="level-title">transform</h2>
        <pre><code>transform: rotate(45deg) scale(1.5);</code></pre>
        <div class="controls-panel">
          <button id="tr-rot" class="btn btn-secondary">rotate(45deg)</button>
          <button id="tr-scl" class="btn btn-secondary">scale(1.5)</button>
          <button id="tr-rst" class="btn btn-secondary">reset</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s; display:flex; justify-content:center; align-items:center;">
        <div id="transform-box" class="transform-box" style="font-size: 5rem; cursor: default; transition: transform 0.4s;"></div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const bRot = wrapper.querySelector('#tr-rot');
      const bScl = wrapper.querySelector('#tr-scl');
      const bRst = wrapper.querySelector('#tr-rst');
      const box = wrapper.querySelector('#transform-box');
      
      let rot = 0;
      let scl = 1;

      const update = () => {
        box.style.transform = `rotate(${rot}deg) scale(${scl})`;
        if (rot !== 0 && scl !== 1) successCb();
      };

      bRot.addEventListener('click', () => { rot = 45; update(); });
      bScl.addEventListener('click', () => { scl = 1.5; update(); });
      bRst.addEventListener('click', () => { rot = 0; scl = 1; update(); });
    }
  },

  // NIVEL 9: Animaciones
  {
    id: 9,
    title: "Keyframes y Animaciones",
    concept: "@keyframes",
    intro: "¿Qué es una Animación en CSS?",
    introDetails: "A diferencia de `transition` (que solo va y vuelve por iteración), una `animation` ejecuta una serie de pasos secuenciales definidos mediante `@keyframes` y puede repetirse infinitamente sin acción del usuario.",
    challenge: "Completa la configuración y haz que el balón rebote usando 'animation' conectando un keyframe creado en CSS.",
    outro: "Tus sitios web están vivos ahora 👀.",
    outroDetails: [
      "Ejemplo 1: Rueda de 'Cargando' (Spinners).",
      "Ejemplo 2: Notificaciones flotantes que entran a pantalla solas."
    ],
    outroTip: "No abuses. Demasiadas animaciones pueden ralentizar la computadora y marear al usuario.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">@keyframes</span>
        <h2 class="level-title">animation</h2>
        <pre><code>@keyframes bounce {
  50% { transform: translateY(-100px); }
}
.pelota {
  animation: bounce 1s infinite;
}</code></pre>
        <div class="controls-panel">
          <button id="btn-anim" class="btn btn-secondary">1. Enlazar la animación</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 50px;">
        <div id="anim-ball" class="animate-target" style="font-size: 4rem; cursor: default; line-height: 1; display: inline-block;">⚽</div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const btn = wrapper.querySelector('#btn-anim');
      const ball = wrapper.querySelector('#anim-ball');

      btn.addEventListener('click', () => {
        ball.style.animation = 'customBounce 1s infinite ease-in-out';
        btn.classList.replace('btn-secondary', 'btn-primary');
        
        setTimeout(successCb, 1000); // Dar tiempito a ver el rebote
      });
    }
  },

  // NIVEL 10: Nesting (Anidación)
  {
    id: 10,
    title: "Anidación Nativa",
    concept: "CSS Nesting",
    intro: "El poder oculto (nuevo estándar)",
    introDetails: "Históricamente requería pre-procesadores como Sass, pero hoy CSS nativo permite anidar reglas dentro de otras usando el selector `&`. El código es mas conciso y ordenado.",
    challenge: "Observa los snippets de código a la izquierda. Añade la clase principal al contenedor en el lado derecho para visualizar su efecto agrupado.",
    outro: "¡Felicidades, completaste la aventura de CSS Quest!",
    outroDetails: [
      "Ejemplo 1: Estilizar '.menu a' y '.menu a:hover' con anidación.",
      "Ejemplo 2: Organizar todas las partes de tu '.card' dentro del mismo bloque principal."
    ],
    outroTip: "Solo navegadores muy nuevos soportan Nesting Nativo sin procesador (PostCSS). Ten cuidado con el Target de usabilidad.",
    template: `
      <div class="theory-area animate-slide-up">
        <span class="concept-badge">Nesting</span>
        <h2 class="level-title">CSS Nesting</h2>
        <p><strong>Antes:</strong></p>
        <pre><code>.nav { background: negro; }<br>.nav .link { color: blanco; }<br>.nav .link:hover { color: rojo; }</code></pre>
        <p><strong>Con Nesting:</strong></p>
        <pre><code>.nav {<br>  background: negro;<br>  & .link {<br>    color: blanco;<br>    &:hover { color: rojo; }<br>  }<br>}</code></pre>
        <div class="controls-panel">
          <button id="btn-nest" class="btn btn-secondary">Crear .nav</button>
        </div>
      </div>
      <div class="interactive-area animate-slide-up" style="animation-delay: 0.1s;">
        <!-- Injecting a nested stylesheet for the example -->
        <style>
          .test-nav-nesting {
            background: #111;
            padding: 10px 20px;
            border-radius: 8px;
            display: flex; gap: 15px;
            & .nest-link {
              color: white; font-weight: bold; cursor: pointer; padding: 5px; transition: color 0.3s;
              &:hover { color: var(--secondary); }
            }
          }
        </style>
        <div id="nest-parent" style="padding: 20px; width: 100%; text-align: center;">
          <div class="nest-link">Enlace 1</div>
          <div class="nest-link">Enlace 2</div>
        </div>
      </div>
    `,
    setup: (wrapper, successCb) => {
      const btn = wrapper.querySelector('#btn-nest');
      const parent = wrapper.querySelector('#nest-parent');
      let created = false;

      btn.addEventListener('click', () => {
        parent.classList.add('test-nav-nesting');
        parent.style.padding = "10px";
        btn.classList.replace('btn-secondary', 'btn-primary');
        created = true;
      });

      // Validar si hicieron hover
      wrapper.querySelectorAll('.nest-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
          if (created) successCb();
        });
      });
    }
  }

]; // End levelsInfo


/**
 * CONTROLADOR DOM Y DE ESTADO
 */

const gameContainer = document.getElementById('game-container');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const currentLevelDisplay = document.getElementById('current-level-display');
const feedbackBanner = document.getElementById('feedback-banner');
const nextBtn = document.getElementById('next-level-btn');

function renderLevel(index) {
  // Limpiar
  gameContainer.innerHTML = '';
  feedbackBanner.classList.remove('show');
  feedbackBanner.classList.add('hidden');
  
  if (index < 0 || index >= levelsInfo.length) {
    renderEndScreen();
    return;
  }

  const level = levelsInfo[index];
  
  // Si no es el nivel cero (bienvenida), mostrar progreso
  if (index > 0) {
    progressContainer.classList.remove('hidden');
    currentLevelDisplay.textContent = index;
    progressBar.style.width = `${(index / (levelsInfo.length - 1)) * 100}%`;
  } else {
    progressContainer.classList.add('hidden');
  }

  // Estructura de tarjeta nivel
  const levelWrapper = document.createElement('div');
  levelWrapper.className = 'card level-layout';
  levelWrapper.style.width = "100%";
  
  // Modificar layout para la bienvenida (nivel 0)
  if(index === 0) {
    levelWrapper.style.gridTemplateColumns = "1fr";
  }

  levelWrapper.innerHTML = level.template;
  
  // Inyección dinámica del bloque teórico y reorganización del Grid
  if (index > 0) {
    const theoryArea = levelWrapper.querySelector('.theory-area');
    if (theoryArea) {
      // 1. Crear el Header que ocupará todo el ancho superior
      const header = document.createElement('div');
      header.className = 'level-header animate-fade-in';
      header.style.gridColumn = '1 / -1';
      header.style.marginBottom = '0.5rem';
      
      // 2. Extraer todo (Título, texto, código) excepto el panel de controles
      Array.from(theoryArea.children).forEach(child => {
        if (!child.classList.contains('controls-panel')) {
           header.appendChild(child);
        }
      });
      
      // 3. Generar el bloque pedagógico interactivo
      const introBlock = document.createElement('div');
      introBlock.className = 'pedagogy-intro';
      introBlock.style.background = 'rgba(0, 0, 0, 0.1)';
      introBlock.style.padding = '1.25rem';
      introBlock.style.borderRadius = '8px';
      introBlock.style.marginTop = '1.5rem';
      introBlock.style.borderLeft = '4px solid var(--primary)';
      
      introBlock.innerHTML = `
        <h4 style="margin-top: 0; color: var(--primary); font-weight: bold; margin-bottom: 0.5rem; font-size: 1.1em;">💡 ${level.intro}</h4>
        <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95em; line-height: 1.5;">${level.introDetails}</p>
        <div style="background: rgba(230, 57, 70, 0.1); padding: 10px; border-radius: 6px;">
           <p style="margin: 0; font-weight: 600; color: var(--text-primary);">🎯 Misión: <span style="font-weight: normal;">${level.challenge}</span></p>
        </div>
      `;
      
      // 4. Añadir bloque al Header y poner el Header al principio
      header.appendChild(introBlock);
      levelWrapper.insertBefore(header, theoryArea);
      
      // Quitar padding/margin extra en los controles si quedaron solos
      const controls = theoryArea.querySelector('.controls-panel');
      if (controls) {
         controls.style.marginTop = '0';
      }
    }
  }

  gameContainer.appendChild(levelWrapper);
  
  // Agregar panel de teoría/explicación final OCULTO de forma predeterminada
  if (index > 0) {
    const theorySummary = document.createElement('div');
    theorySummary.className = 'theory-summary hidden animate-fade-in';
    theorySummary.style.gridColumn = "1 / -1";
    theorySummary.style.marginTop = "2rem";
    theorySummary.style.paddingTop = "2rem";
    theorySummary.style.borderTop = "2px dashed rgba(0,0,0,0.1)";
    
    // Contenido del resumen pedagógico
    let detailsHtml = level.outroDetails.map(d => `<li>${d}</li>`).join('');
    
    theorySummary.innerHTML = `
      <h3 style="color: var(--primary); margin-bottom: 1rem;">✅ ${level.outro}</h3>
      <p><strong>Ejemplos Prácticos:</strong></p>
      <ul style="margin-left: 2rem; margin-bottom: 1rem; color: var(--text-muted);">
        ${detailsHtml}
      </ul>
      <div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid var(--warning); padding: 10px; border-radius: 4px;">
        <strong>💡 ${level.outroTip}</strong>
      </div>
    `;
    
    levelWrapper.appendChild(theorySummary);
  }

  // Bind lógica del desafío actual (le enviamos un callback que se ejecuta al triunfar)
  let validado = false;
  level.setup(levelWrapper, () => {
    if (!validado) {
      validado = true;
      unlockNext();
      
      // Mostrar la zona de summary/teoría del success
      const summary = levelWrapper.querySelector('.theory-summary');
      if(summary) summary.classList.remove('hidden');

      // Animación al area interactiva
      const interArea = levelWrapper.querySelector('.interactive-area');
      if(interArea) interArea.classList.add('success-state');
    }
  });
}

function unlockNext() {
  if (currentLevelIndex === 0) {
    // Para el nivel cero solo avanzamos directo sin banner extra
    advanceLevel();
    return;
  }
  
  // Mostrar feedback banner
  feedbackBanner.classList.remove('hidden');
  setTimeout(() => {
    feedbackBanner.classList.add('show');
  }, 10);
}

function advanceLevel() {
  currentLevelIndex++;
  renderLevel(currentLevelIndex);
}

// Escuchar botón siguiente del banner general
nextBtn.addEventListener('click', advanceLevel);

function renderEndScreen() {
  // Ocultar barras
  progressContainer.classList.add('hidden');
  
  gameContainer.innerHTML = `
    <div class="card animate-fade-in" style="text-align: center; max-width: 600px; margin: 0 auto; padding: 4rem 2rem;">
      <span style="font-size: 6rem;">🏆</span>
      <h1 class="level-title" style="margin-top: 1rem;">¡Misión CSS Completada!</h1>
      <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 2rem;">
        Lograste recorrer desde variables hasta Container Queries y Nesting. ¡Estás un paso más cerca de ser un frontend senior!
      </p>
      <button class="btn btn-primary" onclick="location.reload()">Empezar de Nuevo</button>
    </div>
  `;
}

// Iniciar app en el nivel 0
document.addEventListener('DOMContentLoaded', () => {
  try {
    renderLevel(currentLevelIndex);
  } catch (err) {
    document.body.innerHTML = `<div style="padding: 20px; background: red; color: white;"><h1>Error al iniciar</h1><p>${err.message}</p><pre>${err.stack}</pre></div>`;
  }
});
