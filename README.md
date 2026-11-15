# ILUMINATE ✳
**Ilumina cada día**

Primera versión de la tienda online de ILUMINATE. Sitio estático responsive, preparado para publicación gratuita en Netlify.

## Incluye
- Identidad visual femenina y elegante con cinco colecciones: maquillaje, uñas, vestidos de baño, ropa básica femenina y regalos personalizados.
- Catálogo con filtros y buscador, sin inventar productos ni precios.
- Sección de combos en preparación (sin ofertas ficticias).
- Constructor de idea de kit personalizado con resumen local copiable; no es pedido ni cotización.
- Navegación accesible, responsive, sin frameworks ni servidor.

## Publicar en Netlify
1. En Netlify, seleccionar **Add new project → Import an existing project → GitHub**.
2. Autorizar el acceso al repositorio `iluminate-store/iluminate-store`.
3. Seleccionar la rama `main`.
4. No usar comando de compilación. **Publish directory:** `.` (ya definido en netlify.toml).
5. Publicar. Netlify asignará un subdominio gratuito, que podrás personalizar si está disponible.

## Añadir catálogo real
El archivo `catalog.js` contiene `products: []` y `combos: []`. No insertar datos inventados. Para usar productos reales, editar el arreglo `products` con entradas del siguiente esquema:

```js
{
  id: "identificador-unico",
  name: "Nombre real del artículo",
  category: "maquillaje", // maquillaje | unas | vestidos-de-bano | ropa-basica | regalos
  description: "Descripción verificada",
  priceCOP: 0, // sustituir por precio real confirmado en pesos colombianos
  image: "/assets/nombre-real.webp", // archivo local que exista realmente
  available: true // solo si la disponibilidad fue confirmada
}
```

La interfaz muestra exclusivamente productos `available: true` con `priceCOP` numérico válido. El catálogo está vacío deliberadamente hasta confirmar información. Para imágenes, crear el directorio `assets/` y subir archivos optimizados. No usar fotos de terceros sin autorización.

## Pendiente antes de vender
- Confirmar productos, precios, inventario e imágenes.
- Definir contacto oficial, políticas de entrega, devoluciones, tratamiento de datos y términos comerciales.
- Seleccionar plataforma de pagos y desarrollar un checkout seguro; **esta versión no acepta pagos ni genera pedidos**.
- Definir proceso operativo de combos y kits, y sus cotizaciones.
- Probar flujos con datos reales antes de abrir al público.

## Archivos
`index.html` estructura y contenido · `styles.css` diseño · `catalog.js` datos futuros · `app.js` interacciones · `netlify.toml` configuración de despliegue.
