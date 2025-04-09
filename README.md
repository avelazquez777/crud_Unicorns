🦄 Unicorn CRUD App (React + crudcrud.com)

Este proyecto es una aplicación simple en React que permite **crear**, **leer**, **actualizar** y **eliminar** unicornios mágicos usando la API gratuita de [crudcrud.com](https://crudcrud.com/).

---

## 🚀 Funcionalidades

- 📄 Listado de unicornios
- ➕ Crear un nuevo unicornio
- 🗑️ Eliminar unicornios
- 🎨 Fondo animado con un GIF
- Navegación entre rutas con `react-router-dom`

---

## 🛠️ Tecnologías usadas

- React
- React Router DOM
- CSS
- fetch API
- [crudcrud.com](https://crudcrud.com/) (API para almacenamiento temporal)

---

## 🧾 Estructura de archivos principal

```
src/
├── App.css
├── App.jsx
├── assets
│   └── react.svg
├── home.jsx
├── icon
│   └── caUnicorn.gif
├── index.css
├── main.jsx
├── styles
│   └── unicorn.css
└── unicorns
    ├── index.jsx
    ├── unicornsContainer.jsx
    ├── unicornsCreate.jsx
    └── unicornsView.jsx

```

---

## 📦 Instalación

1. Cloná el repositorio:

```bash
git clone https://github.com/tu_usuario/unicorn-crud.git
cd unicorn-crud
```

2. Instalá las dependencias:

```bash
npm install
```

3. Iniciá la app:

```bash
npm run dev
```

---

## 📡 API base (crudcrud)

Reemplazá la variable `baseURL` en tus archivos `.jsx` con tu propia API URL de [crudcrud.com](https://crudcrud.com/).

```js
const baseURL = "[https://crudcrud.com/api/TU_API_KEY](https://crudcrud.com/api/845cb6ca98d547db9af07aa0024b439f)/unicornios";
```

Recordá que la URL de `crudcrud.com` **expira a los 24h si no usás una cuenta registrada**.

---

## 🖼️ Agregar un fondo animado con un GIF

1. Guardá tu GIF en `src/assets/fondo.gif`
2. En tu archivo `unicorn.css`, agregá:

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-image: url('src/icon/caUnicorn.gif'); /* GIF de unicornio */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
```

---

## 📝 Notas

- El campo `age` es validado para que sea un número positivo.
- Todos los campos son obligatorios excepto la edad (pero debe ser un número si se completa).
- Después de crear un unicornio, se redirige automáticamente a la lista.
- El botón "Cancelar" en el formulario vuelve a la lista sin guardar cambios.

---

## ✨ Créditos

Hecho con amor por Ravinale Axel y Velazquez Alejo 🧑‍💻  
Powered by React + Magia de Unicornios ✨🦄
