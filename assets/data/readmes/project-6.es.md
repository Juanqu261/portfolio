# Adagioz & Harmonie Frontend

Esta es la aplicación frontend en Angular 19 para el catálogo de fragancias de lujo Adagioz & Harmonie. Funciona como una vitrina editorial ultra-premium, diseñada para capturar la esencia de una boutique reseller de gama alta.

## Decisiones de arquitectura y estilo

La dirección de diseño sigue el concepto **"Flacon Brut" (Modern Avant-Garde)** para evocar un lujo exclusivo.
Pilares clave:

*   **Protocolo de color (60-30-10 Dark Mode)**:
    *   **60% Charcoal Foundation**: `#121212` / `#1A1A1A` para fondos profundos y misteriosos.
    *   **30% Deep Purple**: Base `#2B1B3D`, Glow `#4A2D6B`, Light `#6B3FA0` — utilizados para fondos, bordes e iconos respectivamente.
    *   **10% Brushed Silver**: `#E5E4E2` para tipografía arquitectónica y acentos estructurales.
*   **Tipografía**: combinación de *Cormorant Garamond* (titulares masivos, en cursiva) y *Outfit* (cuerpo limpio y legible).
*   **Animaciones**: impulsadas por **GSAP** (GreenSock) y ScrollTrigger para fade-ins cinemáticos lentos y reveals escalonados al hacer scroll.
*   **Estilos**: CSS personalizado combinado con utilidades de Tailwind CSS.

## Configuración del sitio (`public/site.config.json`)

Un único archivo JSON gobierna todo el merchandising de la app. Editar este archivo controla:

*   **`spottedProduct`**: el slug del producto destacado como hero en la home.
*   **`catalogRecommendations`**: array de hasta 10 slugs mostrados en la vista "open book" del Catálogo.
*   **`collections`**: array de colecciones (slug, nombre, descripción, productos). Agregar o quitar una entrada crea o elimina por completo la vista correspondiente.

Los slugs de producto deben coincidir con la salida de `formatNameForUrl()` (minúsculas, separadas por guiones) sobre los nombres reales del backend.

## Funcionalidades y componentes principales

La app opera estrictamente bajo la regla de negocio **"Catalog Mode"**. No se manejan ventas directas; en su lugar, los usuarios son redirigidos limpiamente a endpoints externos oficiales mediante rutas SEO-friendly (`/products/:name`).

Módulos importantes:

*   **`HomeComponent`**: landing con la presentación de marca y un hero de **producto destacado** controlado por `site.config.json`.
*   **`CollectionListComponent`** (`/collections`): grid de tarjetas de colección leídas del JSON. Cada tarjeta enlaza a `/collections/:slug`.
*   **`CollectionDetailComponent`** (`/collections/:slug`): página de colección individual que solo muestra los productos asignados en el config. Redirige a `/collections` si el slug no existe.
*   **`CatalogComponent`** (`/catalog`): vitrina curada tipo "libro abierto" con hasta 10 productos recomendados desde `catalogRecommendations`.
*   **`ProductDetailComponent` (PDP)**: experiencia de inmersión con un layout de "Tensión Extrema". El flacon queda pineado mientras el copy editorial hace scroll. Incluye representaciones visuales de la estructura olfativa (notas de Salida, Corazón y Fondo).
*   **`NavbarComponent` / `FooterComponent`** *(compartidos)*: ambos son componentes standalone montados globalmente en `app.component.html`, encima y debajo del `<router-outlet>`. Persisten en todas las rutas — **no** los agregues a las plantillas de cada página.

## Decisiones de implementación clave

*   **Routing de productos** usa `/products/:name` (slugs SEO-friendly). El PDP **no** consulta un endpoint de búsqueda del backend. En su lugar, trae un batch de productos y mapea el slug de la URL al producto correcto en memoria vía `formatNameForUrl(product.name)`. Es intencional — la búsqueda del backend tenía matching de strings con pérdida.
*   **Vistas dirigidas por config**: las colecciones, las recomendaciones del catálogo y el producto destacado se gestionan desde `src/assets/site.config.json`. El `SiteConfigService` carga y cachea este config como signals de Angular.

## Servidor de desarrollo

Ejecuta `ng serve` para levantar el dev server. Navega a `http://localhost:4200/`. La aplicación se recarga automáticamente al cambiar cualquier archivo fuente. Nota: la API del backend debe correr en paralelo para servir los datos del catálogo.
