# Universidad Nacional de Tierra del Fuego - UNTDF

## Flexbox y Grid, layouts para CSS moderno con Tailwind CSS

Este es un ejemplo de diferentes layouts utilizando Flexbox y Grid, dos tecnologías de diseño web modernas, implementadas con **Tailwind CSS**, un framework de CSS basado en clases utilitarias. Los ejemplos fueron creados por la cátedra de Desarrollo Web de la UNTDF, como parte de un curso de desarrollo Frontend.

Los layouts presentados son responsive y se recomienda navegarlos con el inspector del browser emulando diferentes dispositivos: teléfonos, tablets, notebooks y escritorio.

**Herramientas utilizadas:**
- **Vite**: Herramienta de desarrollo rápida que proporciona un servidor de desarrollo con recarga en caliente
- **npm**: Gestor de paquetes de Node.js para instalar y manejar dependencias del proyecto
- **Tailwind CSS**: Framework de CSS que permite crear diseños mediante clases utilitarias predefinidas

Para ver los ejemplos:
1. Instalar dependencias: `npm install`
2. Ejecutar el servidor de desarrollo: `npm run dev`
3. Abrir los archivos `flexbox-tailwind.html` y `grid-tailwind.html` en el navegador

Desarrollado por Federico Gonzalez Brizzio, profesor adjunto de la UNTDF.

# Demostraciones de CSS Flexbox y Grid con Tailwind CSS

Este repositorio contiene demostraciones educativas interactivas para aprender **CSS Flexbox** y **CSS Grid** implementadas con **Tailwind CSS**, dos de las tecnologías de diseño web más importantes y modernas.

## 🎯 Objetivo Educativo

El propósito de este proyecto es proporcionar ejemplos prácticos y claros que ayuden a los estudiantes a:

- Comprender las diferencias fundamentales entre Flexbox y Grid
- Aprender cuándo usar cada tecnología según el contexto
- Visualizar cómo funcionan las propiedades en tiempo real
- Desarrollar layouts responsivos para diferentes dispositivos
- Dominar las mejores prácticas de diseño web moderno
- Entender cómo Tailwind CSS simplifica la implementación de layouts complejos

## 🔧 Arquitectura con Tailwind CSS

### Tailwind CSS - Framework de CSS Utilitario
- **Clases utilitarias** para estilos inline declarativos
- **Diseño responsivo** con prefijos de breakpoint (`sm:`, `md:`, `lg:`)
- **Sistema de espaciado** consistente con escalas predefinidas
- **Customización** mediante configuración de Tailwind

### Vite - Herramienta de Desarrollo
- **Servidor de desarrollo** rápido con Hot Module Replacement
- **Compilación optimizada** para producción
- **Soporte nativo** para Tailwind CSS y PostCSS

### npm - Gestor de Paquetes
- **Instalación de dependencias** (Tailwind CSS, Vite)
- **Scripts de desarrollo** y compilación
- **Gestión de versiones** de las herramientas del proyecto

## 📚 Conceptos Cubiertos con Tailwind CSS:

### Flexbox con Clases Utilitarias:
- **Contenedor Flex**: `flex`, `inline-flex`
- **Dirección**: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
- **Envolvimiento**: `flex-wrap`, `flex-nowrap`
- **Justificación**: `justify-center`, `justify-between`, `justify-around`, `justify-evenly`
- **Alineación**: `items-center`, `items-start`, `items-end`
- **Crecimiento y contracción**: `flex-1`, `flex-auto`, `flex-none`
- **Espaciado moderno**: `gap-4`, `gap-8` para espaciado entre items

### Grid con Clases Utilitarias:
- **Contenedor Grid**: `grid`, `inline-grid`
- **Definición de columnas**: `grid-cols-3`, `grid-cols-12`, `grid-cols-[custom]`
- **Definición de filas**: `grid-rows-3`, `grid-rows-[custom]`
- **Spanning de items**: `col-span-2`, `row-span-3`
- **Colocación precisa**: `col-start-2`, `row-start-3`
- **Auto-placement responsivo**: Clases personalizadas para `auto-fit` y `auto-fill`
- **Espaciado bidimensional**: `gap-4`, `gap-x-2`, `gap-y-6`

## 📱 Diseño Responsive con Tailwind CSS

Ambas demostraciones utilizan los breakpoints responsivos de Tailwind:

- **📱 Móviles** (hasta 640px): `sm:` - Layouts apilados, texto pequeño
- **📟 Tablets** (640px - 768px): `md:` - Layouts balanceados, 2-3 columnas
- **💻 Laptops** (768px - 1024px): `lg:` - Layouts multi-columna completos
- **🖥️ Desktop** (1024px+): `xl:` - Layouts amplios con espaciado generoso

Las clases responsivas de Tailwind permiten control preciso:
- `flex-col md:flex-row` - Columna en móvil, fila en tablet+
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` - Grid responsivo progresivo
- `gap-2 md:gap-4 lg:gap-8` - Espaciado que crece con el tamaño de pantalla

## 🔍 Diferencias Clave: Flexbox vs Grid con Tailwind CSS

### 🔄 **Flexbox - Layout Unidimensional**
- **Mejor para**: Componentes y layouts de una dimensión
- **Casos de uso**: Navegación, distribución de botones, centrado
- **Clases Tailwind**: `flex`, `justify-between`, `items-center`, `gap-4`
- **Fortaleza**: Control sobre distribución de espacio y alineación con clases simples
- **Filosofía**: "Cómo deben comportarse los items en un contenedor con clases declarativas"

### 📊 **Grid - Layout Bidimensional**
- **Mejor para**: Layouts de página completa y sistemas complejos
- **Casos de uso**: Headers, sidebars, galerías, layouts de aplicación
- **Clases Tailwind**: `grid`, `grid-cols-12`, `col-span-3`, `gap-6`
- **Fortaleza**: Control preciso sobre filas y columnas con clases específicas
- **Filosofía**: "Cómo debe estructurarse toda la página con control bidimensional"

## 💡 Consejos de Aprendizaje

1. **Empezar con el setup**: Ejecutar `npm install` y `npm run dev`
2. **Comenzar con `flexbox-tailwind.html`** - es más intuitivo para principiantes
3. **Prestar atención a las clases Tailwind** en los elementos HTML
4. **Redimensionar la ventana** del navegador para ver el comportamiento responsivo
5. **Usar las herramientas de desarrollo** para inspeccionar las clases aplicadas

### 🚀 **Continuar con Grid**
1. **Comparar implementaciones**: Cómo Flexbox vs Grid resuelven problemas similares
2. **Experimentar con clases**: Modificar clases Tailwind directamente en el inspector
3. **Intentar recrear layouts**: Usar la tecnología opuesta para el mismo resultado
4. **Analizar cuándo usar cada uno**: Contexto determina la mejor herramienta
5. **Explorar documentación**: [Tailwind CSS Documentation](https://tailwindcss.com) para clases avanzadas

## 🛠️ Herramientas Recomendadas

### Documentación y Recursos
- [Tailwind CSS Documentation](https://tailwindcss.com) - Documentación oficial completa
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Extensión de VS Code
- [CSS Grid Garden](https://cssgridgarden.com/) - Juego para aprender Grid
- [Flexbox Froggy](https://flexboxfroggy.com/) - Juego para aprender Flexbox
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación de CSS fundamentals

### Herramientas de Desarrollo
- **Vite**: Desarrollo rápido con recarga en caliente
- **npm**: Gestión de dependencias y scripts de proyecto
- **Tailwind CSS IntelliSense**: Autocompletado y vista previa de clases

## 📄 Licencia

Este proyecto está bajo licencia educativa libre. Podés usar, modificar y distribuir el contenido para fines educativos.
