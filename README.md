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
│   └── styles.css              # Estilos visuales globales de la aplicación.
│
├── js/
│   └── main.js                 # Lógica de autenticación (Login/Validaciones).
│  
│
├── index.html                  # Punto de entrada principal (Enrutador)
├── login.html                  # Pantalla de inicio de sesión.
|
├── menu.html                   # Pantalla del menú principal.
├── deposit.html                # Pantalla realizar depositos.
├── sendmoney.html              # Pantalla para realizar transferencias.
├── transactions.html           # Pantalla para ver ultimos movimientos de la cuenta.
|
└── README.md                   # Documentación del proyecto

```

## 📂 2. Flujo de Navegación

El usuario interactúa con la aplicación siguiendo un camino lógico y controlado según su estado de autenticación:

* index.html (Acceso Principal): Pantalla de bienvenida al sitio, el usuario puede interactuar con el sitio en esta etapa sin necesidad de iniciar sesión.

La barra de navegación dispone de un link a un menu, el cual cumple una funcion de modal en esta etapa, dando las opciones al usuario de iniciar sesión o registrarse
para poder acceder a los beneficios de la aplicación.

La barra de navegación tambien dispone de un boton para iniciar sesión directamente, el cual redirige al usuario a una pantalla de login.

En la sección HERO, además de información, cuenta con un llamado a la acción que invita al usuario a iniciar sesión o registrarse.

* login.html (Autenticación): Contiene el formulario de ingreso. Al introducir credenciales válidas, guarda el estado de la sesión y redirige a menu.html.

* menu.html (Panel Principal): Es el centro de la aplicación para usuarios registrados.
    El usuario puede elegir entre 4 acciones.
    - Realizar transferencias: El Usuario es redirigido a la pantalla de transferencias "sendmoney.html".
    - Depositar fondos: El usuario es redirigido a la pantalla para realizar depositos "deposit.html".
    - Ver ultimos movimientos: El usuario es redirigido a la pantalla que muestra sus ultimos movimientos "transactions.html".
    - Cerrar sesión: El usuario puede utilizar el boton de la barra de navegación para cerrar su sesión, siendo redirigido al sitio principal "index.html".

* sendmoney.html: 
    -El usuario puede interactuar con el formulario para realizar transferencias.
    -Volver al menú de usuario "menu.html".
    -Cerrar sesión y ser redirigido al sitio principal "index.html".

deposit.html: El usuario puede interactuar con el formulario para realizar depositos, volver al menú o cerrar sesión y ser redirigido al sitio principal.

transactions.html: El usuario puede visualizar su información de ultimos movimientos, volver al menú o cerrar sesión y ser redirigido al sitio principal.



## 📊 3. Diagrama Visual

```text
                                   
       [ ZONA PÚBLICA ]
      +----------------+
|-->  |   index.html   | <======================================+
|     +----------------+                                        |
|        |            |                                         |
|     (Modal)      (Boton)                                      |
|        |            |                                         |
|        v            |                                         |
|<--[Incentivo]       |                                         | 
        |             v                                         |
        |        +------------+                                 |
        ----->   | login.html |                                 |
                 +------------+                                 |
                       |                                        |
                (Login Exitoso)                                 |
                       |                                        |
                       v                                        |
               +---------------+                                |
               |   menu.html   | [ ZONA PRIVADA ]               |
               +---------------+                                |
                 /     |     \                                  |
                /      |      \                                 |
               v       v       v                                |
  +---------------+ +--------------+ +-------------------+      |
  | sendmoney.html| | deposit.html | | transactions.html |      |
  +---------------+ +--------------+ +-------------------+      |
   |             |   |            |   |                 |       |
   | (Volver)    |   | (Volver)   |   | (Volver)        |       |
   +------+------+   +-----+------+   +--------+--------+       |
          |                |                   |                |
          +----------------+-------------------+                |
          |                                                     |
          v                                                     |
  (Regresa al Panel)                                            |
                                                                |
  (Cerrar Sesión desde cualquier pantalla privada)              |
   +------------------------------------------------------------+

---

## 🛠️ 4. Tecnologías Utilizadas

HTML5: Estructuración de las pantallas base.

CSS3: Estilos de diseño (por implementar).

JavaScript: Por definir.

jQuery: Por definir.

Bootstrap: Por definir.

