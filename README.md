# Universidad Nacional de Tierra del Fuego - UNTDF

## Flexbox y Grid, layouts para CSS moderno

Este es un ejemplo de diferentes layouts utilizando Flexbox y Grid, dos tecnologías de diseño web modernas. Los ejemplos fueron creados por la cátedra de Desarrollo Web de la UNTDF, como parte de un curso de desarrollo Frontend.

Los layouts presentados son responsive y se recomienda navegarlos con el inspector del browser emulando diferentes dispositivos: teléfonos, tablets, notebooks y escritorio.

Para ver los ejemplos, abrir los archivos `flex.html` y `grid.html` en un navegador.

Desarrollado por Federico Gonzalez Brizzio, profesor adjunto de la UNTDF.

# Demostraciones de CSS Flexbox y Grid

Este repositorio contiene demostraciones educativas interactivas para aprender **CSS Flexbox** y **CSS Grid**, dos de las tecnologías de diseño web más importantes y modernas.

## 🎯 Objetivo Educativo

El propósito de este proyecto es proporcionar ejemplos prácticos y claros que ayuden a los estudiantes a:

- Comprender las diferencias fundamentales entre Flexbox y Grid
- Aprender cuándo usar cada tecnología según el contexto
- Visualizar cómo funcionan las propiedades en tiempo real
- Desarrollar layouts responsivos para diferentes dispositivos
- Dominar las mejores prácticas de diseño web moderno

## 📁 Estructura del Proyecto

```
/
├── flex.html          # Demostración de CSS Flexbox
├── flex.css           # Estilos específicos de Flexbox
├── grid.html          # Demostración de CSS Grid
├── grid.css           # Estilos específicos de Grid
├── common.css         # Estilos compartidos y variables
└── README.md          # Este archivo
```

## 🔧 Arquitectura de Estilos

### `common.css` - Estilos Compartidos
- **Variables CSS** para colores consistentes
- **Estilos base** (reset, tipografía, layout general)
- **Componentes comunes** (navegación, tarjetas, secciones)
- **Breakpoints responsivos** compartidos
- **Estilos de impresión**

### `flex.css` - Específico de Flexbox
- Solo propiedades relacionadas con **Flexbox**
- Comentarios educativos explicando cada propiedad
- Ejemplos progresivos de complejidad creciente
- Demostraciones de comportamiento responsivo

### `grid.css` - Específico de Grid
- Solo propiedades relacionadas con **CSS Grid**
- Comentarios educativos explicando cada concepto
- Ejemplos de layouts complejos con `grid-template-areas`
- Demostraciones de `auto-fit` vs `auto-fill`

## 📚 Conceptos Cubiertos:
- **Contenedor Flex básico**: `display: flex`
- **Dirección**: `flex-direction` (row, column)
- **Envolvimiento**: `flex-wrap`
- **Justificación**: `justify-content` (center, space-between, space-around)
- **Alineación**: `align-items`
- **Propiedades de items**: `flex: grow shrink basis`
- **Gap moderno**: Espaciado con `gap`

- **Contenedor Grid básico**: `display: grid`
- **Definición de columnas**: `grid-template-columns`
- **Definición de filas**: `grid-template-rows`
- **Áreas nombradas**: `grid-template-areas`
- **Spanning**: `grid-column: span 2`, `grid-row: span 2`
- **Auto-placement**: `auto-fit` vs `auto-fill`
- **Gap en Grid**: Espaciado bidimensional

## 📱 Diseño Responsive

Ambas demostraciones incluyen breakpoints para:

- **📱 Móviles** (320px - 767px): Layouts apilados verticalmente
- **📟 Tablets** (768px - 1023px): Layouts balanceados
- **💻 Laptops** (1024px - 1439px): Layouts multi-columna
- **🖥️ Desktop** (1440px+): Layouts amplios con espaciado generoso

## 🔍 Diferencias Clave: Flexbox vs Grid

### 🔄 **Flexbox - Layout Unidimensional**
- **Mejor para**: Componentes y layouts de una dimensión
- **Casos de uso**: Navegación, distribución de botones, centrado
- **Fortaleza**: Control sobre distribución de espacio y alineación
- **Filosofía**: "Cómo deben comportarse los items en un contenedor"

### 📊 **Grid - Layout Bidimensional**
- **Mejor para**: Layouts de página completa y sistemas complejos
- **Casos de uso**: Headers, sidebars, galerías, layouts de aplicación
- **Fortaleza**: Control preciso sobre filas y columnas simultáneamente
- **Filosofía**: "Cómo debe estructurarse toda la página"

## 💡 Consejos de Aprendizaje

1. Comenzar con `flex.html` - es más intuitivo
2. Prestar atención a los comentarios en el código
3. Redimensionar la ventana del navegador para ver el comportamiento responsivo
4. Usar las herramientas de desarrollo del navegador para inspeccionar

### 🚀 **Continuar con grid**
1. Comparar cómo ambas tecnologías resuelven el mismo problema
2. Experimentar modificando las propiedades en el inspector
3. Intentar recrear los layouts usando la otra tecnología
4. Analizar cuándo una tecnología es más apropiada que la otra

## 🛠️ Herramientas Recomendadas

### Recursos Online
- [CSS Grid Garden](https://cssgridgarden.com/) - Juego para aprender Grid
- [Flexbox Froggy](https://flexboxfroggy.com/) - Juego para aprender Flexbox
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación oficial

## 📄 Licencia

Este proyecto está bajo licencia educativa libre. Podés usar, modificar y distribuir el contenido para fines educativos.
