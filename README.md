# 🚀 Estructura Inicial y Flujo de Navegación del Proyecto

Este proyecto corresponde a la etapa inicial de desarrollo, donde se define la arquitectura de archivos base y la lógica de navegación entre las pantallas principales del sistema.

---

## 📂 1. Estructura de Archivos y Carpetas

A continuación se detalla la organización de los archivos en la raíz del proyecto para mantener un código limpio y modular:

```text
Alke-Wallet/
├── assets/
|
├── css/
│   └── styles.css      # Estilos visuales globales de la aplicación
│
├── js/
│   ├── auth.js         # Lógica de autenticación (Login/Validaciones)
│   └── navigation.js   # Control de redirecciones y sesiones
│
├── index.html          # Punto de entrada principal (Enrutador)
├── login.html          # Pantalla de inicio de sesión
├── menu.html           # Pantalla del menú principal
└── README.md           # Documentación del proyecto

```

## 📂 2. Flujo de Navegación

El usuario interactúa con la aplicación siguiendo un camino lógico y controlado según su estado de autenticación:

index.html (Acceso Principal): Funciona como el "enrutador" automático. Verifica si existe una sesión activa.

Si el usuario no está logueado -> Redirige a login.html.

Si el usuario ya está logueado -> Redirige a menu.html.

login.html (Autenticación): Contiene el formulario de ingreso. Al introducir credenciales válidas, guarda el estado de la sesión y redirige a menu.html.

menu.html (Panel Principal): Es el centro de la aplicación. 



## 📊 3. Diagrama Visual

graph TD
    index.html -->|¿Sesión activa? NO| login.html
    index.html -->|¿Sesión activa? SÍ| menu.html
    login.html -->|Login Exitoso| menu.html
    menu.html -->|Cerrar Sesión| login.html



## 🛠️ 4. Tecnologías Utilizadas

HTML5: Estructuración de las pantallas base.

CSS3: Estilos de diseño (por implementar).

JavaScript: Por definir.

jQuery: Por definir.

Bootstrap: Por definir.

