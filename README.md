# Frontend E-commerce - UNTDF

## Universidad Nacional de Tierra del Fuego

Este proyecto educativo presenta diferentes tecnologías de desarrollo web moderno usando como base React JS y la API de e-commerce [https://ecommerce.fedegonzalez.com/docs](https://ecommerce.fedegonzalez.com/docs) hecha por la materia de Desarrollo Web 2.

Se muestra cómo desarrollar una plataforma web de un supermercado y es un ejemplo académico de apoyo a la enseñanza para facilitar el aprendizaje de los estudiantes de la **Tecnicatura Universitaria en Desarrollo de Aplicaciones**.

## 📋 Descripción

Aplicación web de e-commerce construida con React y Vite que permite:

- 🛍️ Visualizar catálogo de productos
- 🔍 Ver detalles de productos individuales
- 🛒 Gestionar carrito de compras
- 👨‍💼 Panel de administración para gestión de productos (CRUD completo)
- 📁 Organización por categorías y etiquetas

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción y desarrollo rápido
- **React Router** - Enrutamiento para aplicaciones React
- **Context API** - Gestión de estado global (carrito de compras)
- **CSS Modules** - Estilos con alcance de componente

## 📦 Estructura del Proyecto

```
frontend-wip/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Cart.jsx         # Carrito de compras
│   │   ├── CartSummary.jsx  # Resumen del carrito
│   │   ├── Home.jsx         # Página principal
│   │   ├── ProductDetail.jsx   # Detalle de producto
│   │   ├── ProductItem.jsx     # Item individual de producto
│   │   ├── ProductList.jsx     # Lista de productos
│   │   └── admin/              # Módulo de administración
│   │       ├── AdminLayout.jsx
│   │       ├── ProductCRUD.jsx
│   │       ├── ProductForm.jsx
│   │       ├── ProductFormPage.jsx
│   │       ├── ProductList.jsx
│   │       └── ProductTable.jsx
│   ├── context/
│   │   └── CartContext.jsx  # Contexto global del carrito
│   ├── config/
│   │   └── api.js           # Configuración de la API
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Punto de entrada
│   └── style.css            # Estilos globales
├── index.html
├── package.json
└── vite.config.ts
```

## 🔧 Instalación y Configuración

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/fedegonzal/untdf-frontend.git
   cd frontend-wip
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Luego edita el archivo `.env` y configura tu token personal:
   ```env
   VITE_API_BASE_URL=https://ecommerce.fedegonzalez.com
   VITE_API_TOKEN=tu_token_unico
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   La aplicación estará disponible en `http://localhost:5173`

## 🔑 API REST - Gestión de E-commerce

Esta API fue desarrollada para que los estudiantes de la **Tecnicatura Universitaria en Desarrollo de Aplicaciones** de la Universidad Nacional de Tierra del Fuego puedan practicar con el desarrollo de Frontend y el consumo de APIs REST.

### Características principales:

* **Productos**: Gestión completa de productos con título, descripción, precio, categoría, imágenes y etiquetas
* **Categorías**: Organización de productos por categorías con imagen descriptiva
* **Etiquetas**: Sistema de etiquetado para clasificación adicional
* **Autenticación**: Sistema de tokens para aislar datos entre estudiantes
* **Subida de archivos**: Gestión de imágenes para productos y categorías

### Autenticación

Todos los endpoints requieren un token Bearer en el header `Authorization`:

```http
Authorization: Bearer tu_token_unico
```

### Documentación de la API

Para más información sobre los endpoints disponibles, consulta la documentación completa en:
[https://ecommerce.fedegonzalez.com/docs](https://ecommerce.fedegonzalez.com/docs)

## 📚 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter (si está configurado)

## 🎓 Propósito Educativo

Este proyecto fue creado con fines educativos para enseñar:

1. **Desarrollo con React**: Componentes, hooks, props, y estado
2. **Consumo de APIs REST**: Peticiones HTTP, manejo de respuestas
3. **Gestión de estado**: Context API para estado global
4. **Enrutamiento**: React Router para navegación
5. **CRUD completo**: Crear, leer, actualizar y eliminar productos
6. **Autenticación**: Uso de tokens Bearer
7. **Diseño de interfaz**: Maquetación y estilos con CSS

## 👨‍🏫 Autor

**Prof. Federico Gonzalez Brizzio**  
Docente - Universidad Nacional de Tierra del Fuego  
📧 fgonzalez@untdf.edu.ar  
🌐 [https://www.untdf.edu.ar/](https://www.untdf.edu.ar/)

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo LICENSE.

## 🤝 Contribuciones

Este es un proyecto educativo. Los estudiantes son bienvenidos a:

- Reportar bugs
- Sugerir mejoras
- Hacer fork del proyecto para sus propios experimentos
- Contribuir con pull requests

## 📞 Soporte

Para dudas o consultas relacionadas con el proyecto, contacta a:
- **Email**: fgonzalez@untdf.edu.ar
- **Documentación API**: [https://ecommerce.fedegonzalez.com/docs](https://ecommerce.fedegonzalez.com/docs)

---

**Universidad Nacional de Tierra del Fuego - UNTDF**  
*Tecnicatura Universitaria en Desarrollo de Aplicaciones*
