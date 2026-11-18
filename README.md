# TecnoStore — aplicación web estática con Docker

- **Nombre:** Agustin Espinoza
- **Fecha:** 18/11/2026

Aplicación web simple de una tienda de tecnología hecha con **HTML, CSS y JavaScript
(vanilla, sin frameworks)**. Incluye una sección de bienvenida con la **misión** y la
**visión** de la empresa (textos de ejemplo *lorem ipsum*) y un catálogo de productos
con imágenes almacenadas localmente en la carpeta `img`. Cada producto muestra la
cantidad disponible, el color y el precio.

## Tecnologías

- HTML5, CSS3 y JavaScript nativo.
- Imágenes SVG locales en `img/`.
- Docker y Nginx (imagen base `nginx:alpine`).

## Requisitos

- Docker instalado y funcionando (`docker --version`).
- Un navegador web. No se necesita conexión a Internet para usar la app.

## Estructura de archivos

```text
.
├── index.html   # Estructura de la página: bienvenida, misión, visión y productos.
├── style.css    # Estilos responsive para móvil y escritorio.
├── app.js       # Datos de los productos y render dinámico del catálogo.
├── img/         # Imágenes locales de los productos (SVG).
├── Dockerfile   # Imagen Nginx que publica los archivos estáticos.
├── README.md    # Esta documentación.
└── .README      # Datos de autor y fecha.
```

## Construir la imagen Docker

Desde la carpeta raíz del proyecto (donde está el `Dockerfile`):

```bash
docker build -t tecnostore-app .
```

El punto final indica que se use el directorio actual como contexto de construcción.
La primera vez se descargará la imagen liviana `nginx:alpine`.

## Iniciar el contenedor

```bash
docker run --rm --name tecnostore -p 8080:80 tecnostore-app
```

- `-p 8080:80` publica el puerto 8080 de tu máquina hacia el puerto 80 del contenedor.
- `--rm` elimina el contenedor automáticamente cuando se detiene.
- La terminal queda ocupada mostrando los logs: dejala abierta.

Luego abrí en el navegador:

```text
http://localhost:8080
```

## Detener la aplicación

- Presioná **Ctrl + C** en la terminal donde corre el contenedor, o bien:
- Desde otra terminal:

```bash
docker stop tecnostore
```

## Ejecutar sin Docker

Opcionalmente podés abrir `index.html` directamente con el navegador, o levantar un
servidor estático simple desde esta carpeta:

```bash
python -m http.server 8080
```

y entrar a `http://localhost:8080`.

## Problemas frecuentes

| Síntoma | Causa / solución |
|---|---|
| `docker: command not found` | Docker no está instalado o no está en el PATH; reiniciá la terminal. |
| `port is already allocated` | El 8080 está ocupado: usá otro, p. ej. `-p 8081:80` y abrí `http://localhost:8081`. |
| Las imágenes no aparecen | Verificá que la carpeta `img/` esté junto al `Dockerfile` y que se copie en el `Dockerfile`. |
| `permission denied` en Linux | Agregá tu usuario al grupo `docker` y reiniciá la sesión. |
