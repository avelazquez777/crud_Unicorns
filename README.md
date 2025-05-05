# 🦄 Unicorn Manager

Una aplicación web para gestionar unicornios y productos con operaciones CRUD. Esta aplicación en React ofrece una interfaz fácil de usar para crear, leer, actualizar y eliminar unicornios y productos.

---

## 📋 Funcionalidades

### Gestión de Unicornios
- Crear, ver, editar y eliminar unicornios  
- Almacenar datos de unicornios con API externa (CRUD CRUD)  
- Caché local con sincronización periódica con la API  

### Gestión de Productos
- Crear, ver, editar y eliminar productos  
- Persistencia mediante localStorage  
- Validación de formularios  

### Interfaz de Usuario
- Diseño limpio y responsivo  
- Validación de formularios con Formik y Yup  
- Navegación con React Router  

---

## 🚀 Comenzando

### Requisitos previos
- Node.js (v14 o superior)  
- npm o yarn  

### Instalación

1. Clona el repositorio:

```
git clone https://github.com/avelazquez777/crud_Unicorns.git
cd unicorn-manager
```

2. Instala las dependencias:

```
npm install
```
# o
```
yarn install
```

3. Actualiza la clave de API de CRUD CRUD:

- Obtén una clave gratuita desde [CRUD CRUD](https://crudcrud.com)  
- Reemplaza el valor de `crudCrudApiKey` en `src/context/unicornContext.jsx` con tu clave de API:

```
const crudCrudApiKey = 'YOUR_API_KEY_HERE';
```

4. Inicia el servidor de desarrollo:
   
```
npm run dev
```
# o
```
yarn dev
```

5. Abre tu navegador y navega a `http://localhost:5173` (o al puerto que aparezca en tu terminal)

---

## 💻 Uso

### Gestión de Unicornios

- **Ver Unicornios:** Navega a "Unicornios" en la barra de navegación  
- **Crear Unicornio:** Haz clic en el botón "Crear nuevo unicornio"  
- **Editar Unicornio:** Haz clic en el botón "Editar" de cualquier unicornio en la lista  
- **Eliminar Unicornio:** Haz clic en el botón "Eliminar" de cualquier unicornio en la lista  
- **Actualizar Datos:** Haz clic en "Actualizar datos" para sincronizar con la API  

### Gestión de Productos

- **Ver Productos:** Navega a "Productos" en la barra de navegación  
- **Crear Producto:** Haz clic en el botón "Agregar nuevo producto"  
- **Editar Producto:** Haz clic en el botón "Editar" de cualquier producto en la lista  
- **Eliminar Producto:** Haz clic en el botón "Eliminar" de cualquier producto en la lista  

---

## 🛠️ Tech Stack

- **React:** Librería de interfaz de usuario  
- **React Router:** Navegación  
- **Context API:** Gestión de estado  
- **Formik & Yup:** Manejo y validación de formularios  
- **CRUD CRUD API:** Backend para datos de unicornios  
- **LocalStorage:** Persistencia de datos para productos y unicornios sin conexión  

---

## 📝 Notas

- La clave gratuita de la API de CRUD CRUD expira después de 1 día o 100 *Requests* (cada vez que se actualizan los datos de unicornios, se crea, edita o elimina un unicornio, cuenta como un *Request*). Asegúrate de actualizarla cuando sea necesario.  
- Los datos de productos se almacenan únicamente en el `localStorage` del navegador sin persistencia en backend.  
- Los datos de unicornios se almacenan tanto en la API como en `localStorage` para acceso sin conexión.  

---

## 📁 Estructura del Proyecto

```
src/
├── App.jsx                  # Componente principal de la aplicación
├── component/
│   ├── products/            # Componentes para la gestión de productos
│   │   ├── index.jsx        # Rutas de productos
│   │   ├── productData.js   # Funciones para el manejo de datos de productos
│   │   ├── productForm.jsx  # Formulario para crear/editar productos
│   │   └── productsView.jsx # Vista de la lista de productos
│   └── unicorns/            # Componentes para la gestión de unicornios
│       ├── index.jsx        # Rutas de unicornios
│       ├── unicornForm.jsx  # Formulario para crear/editar unicornios
│       ├── unicornsView.jsx # Vista de la lista de unicornios
│       └── useUnicornForm.js # Custom hook para el formulario de unicornios
├── context/
│   └── unicornContext.jsx   # Proveedor de contexto para unicornios
├── home.jsx                 # Componente de la página de inicio
├── navbar.jsx               # Componente de la barra de navegación
└── styles/
    └── unicorn.css          # Estilos para la aplicación
```

---

## ✨ Créditos

**Velazquez Alejo**  
Powered by **React** + Magia de Unicornios ✨🦄


---

## ✨ Créditos
Velazquez Alejo
Powered by React + Magia de Unicornios ✨🦄
