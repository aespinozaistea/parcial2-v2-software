(function () {
  "use strict";

  var productos = [
    {
      nombre: "Audífonos inalámbricos",
      categoria: "Audio",
      imagen: "img/audifonos.svg",
      cantidad: 12,
      color: "Negro",
      colorHex: "#263445",
      precio: 45999
    },
    {
      nombre: "Teclado mecánico",
      categoria: "Periféricos",
      imagen: "img/teclado.svg",
      cantidad: 7,
      color: "Blanco",
      colorHex: "#f8fafc",
      precio: 62999
    },
    {
      nombre: "Mouse ergonómico",
      categoria: "Periféricos",
      imagen: "img/mouse.svg",
      cantidad: 25,
      color: "Gris",
      colorHex: "#64748b",
      precio: 21999
    },
    {
      nombre: "Monitor 24 pulgadas",
      categoria: "Pantallas",
      imagen: "img/monitor.svg",
      cantidad: 4,
      color: "Negro",
      colorHex: "#1f2933",
      precio: 189999
    },
    {
      nombre: "Mochila para notebook",
      categoria: "Accesorios",
      imagen: "img/mochila.svg",
      cantidad: 18,
      color: "Azul",
      colorHex: "#1d4ed8",
      precio: 34999
    },
    {
      nombre: "Altavoz portátil",
      categoria: "Audio",
      imagen: "img/altavoz.svg",
      cantidad: 0,
      color: "Rojo",
      colorHex: "#dc2626",
      precio: 28999
    }
  ];

  var formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  });

  var listado = document.getElementById("listado-productos");
  var mensajeVacio = document.getElementById("mensaje-vacio");
  var buscador = document.getElementById("buscador");
  var orden = document.getElementById("orden");

  function crearDato(titulo, valor) {
    var contenedor = document.createElement("div");
    var termino = document.createElement("dt");
    var definicion = document.createElement("dd");

    termino.textContent = titulo;
    definicion.textContent = valor;
    contenedor.appendChild(termino);
    contenedor.appendChild(definicion);

    return contenedor;
  }

  function obtenerStock(producto) {
    if (producto.cantidad === 0) {
      return { texto: "Sin stock", clase: "agotado" };
    }
    if (producto.cantidad <= 5) {
      return { texto: "Últimas unidades", clase: "bajo" };
    }
    return { texto: producto.cantidad + " disponibles", clase: "disponible" };
  }

  function crearTarjeta(producto) {
    var articulo = document.createElement("article");
    var imagenContenedor = document.createElement("div");
    var imagen = document.createElement("img");
    var etiquetaStock = document.createElement("span");
    var detalle = document.createElement("div");
    var categoria = document.createElement("p");
    var titulo = document.createElement("h3");
    var datos = document.createElement("dl");
    var datoColor = crearDato("Color", producto.color);
    var valorColor = datoColor.querySelector("dd");
    var muestraColor = document.createElement("span");
    var precio = document.createElement("p");

    var stock = obtenerStock(producto);

    articulo.className = "tarjeta-producto";
    imagenContenedor.className = "imagen-producto";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";
    etiquetaStock.className = "etiqueta-stock " + stock.clase;
    etiquetaStock.textContent = stock.texto;

    imagenContenedor.appendChild(imagen);
    imagenContenedor.appendChild(etiquetaStock);

    detalle.className = "detalle-producto";
    categoria.className = "categoria";
    categoria.textContent = producto.categoria;
    titulo.textContent = producto.nombre;

    muestraColor.className = "muestra-color";
    muestraColor.style.backgroundColor = producto.colorHex;
    muestraColor.setAttribute("aria-hidden", "true");
    valorColor.insertBefore(muestraColor, valorColor.firstChild);

    datos.className = "datos-producto";
    datos.appendChild(crearDato("Cantidad disponible", producto.cantidad + " unidades"));
    datos.appendChild(datoColor);

    precio.className = "precio";
    precio.textContent = formateadorPrecio.format(producto.precio);

    detalle.appendChild(categoria);
    detalle.appendChild(titulo);
    detalle.appendChild(datos);
    detalle.appendChild(precio);

    articulo.appendChild(imagenContenedor);
    articulo.appendChild(detalle);

    return articulo;
  }

  function renderizar(listaProductos) {
    listado.replaceChildren();

    listaProductos.forEach(function (producto) {
      listado.appendChild(crearTarjeta(producto));
    });

    mensajeVacio.hidden = listaProductos.length !== 0;
  }

  function ordenar(lista, criterio) {
    var copia = lista.slice();

    if (criterio === "precio-asc") {
      copia.sort(function (a, b) { return a.precio - b.precio; });
    } else if (criterio === "precio-desc") {
      copia.sort(function (a, b) { return b.precio - a.precio; });
    } else if (criterio === "nombre") {
      copia.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, "es"); });
    }

    return copia;
  }

  function actualizarCatalogo() {
    var texto = buscador.value.trim().toLowerCase();

    var resultados = productos.filter(function (producto) {
      return producto.nombre.toLowerCase().indexOf(texto) !== -1 ||
        producto.categoria.toLowerCase().indexOf(texto) !== -1;
    });

    renderizar(ordenar(resultados, orden.value));
  }

  buscador.addEventListener("input", actualizarCatalogo);
  orden.addEventListener("change", actualizarCatalogo);
  renderizar(productos);
})();
