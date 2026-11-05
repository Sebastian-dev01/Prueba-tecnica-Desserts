# Desserts Store

Aplicación web de una tienda de postres desarrollada con React y TypeScript. Permite explorar un catálogo, buscar y filtrar productos por categoría, consultar sus detalles y gestionar un carrito de compras. También incluye una sección de administración para crear, editar y eliminar productos mediante una API REST local construida con `json-server`.

> **Alcance del proyecto:** la aplicación consume exclusivamente la API local de `json-server`; no depende de APIs comerciales externas para obtener productos o categorías.

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [API local](#api-local)
- [Modelo de datos](#modelo-de-datos)
- [Decisiones técnicas](#decisiones-técnicas)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Consideraciones conocidas](#consideraciones-conocidas)

## Características

### Catálogo de productos

- Listado de postres desde la API local.
- Búsqueda por nombre con debounce.
- Filtro por categoría.
- Paginación de 8 productos por página.
- Indicadores de carga mediante skeletons.
- Mensajes para estados vacíos y errores de consulta.

### Detalle de producto

- Vista individual de cada producto.
- Imágenes adaptadas a distintos tamaños de pantalla mediante `picture` y `source`.
- Nombre, precio y categoría del producto.
- Acceso a la edición y eliminación desde el detalle.

### Administración de productos (CRUD)

- Crear productos mediante `POST`.
- Listar productos mediante `GET`.
- Consultar un producto mediante `GET /products/:id`.
- Editar productos mediante `PUT`.
- Eliminar productos mediante `DELETE`, previa confirmación.
- Invalidación de consultas de TanStack Query después de las mutaciones.

Los formularios utilizan React Hook Form y Zod. El mismo componente de formulario se reutiliza para crear y editar productos, recibiendo `defaultValues` cuando se edita un registro.

### Carrito de compras

- Agregar productos al carrito.
- Incrementar y disminuir cantidades.
- Quitar productos.
- Calcular subtotales y total de la orden.
- Persistir el carrito en `localStorage` mediante Zustand Persist.
- Mostrar el carrito en un drawer.
- Confirmar la orden mediante un modal y vaciar el carrito al iniciar una nueva orden.

### Categorías

- Consulta del recurso `/categories`.
- Relación entre productos y categorías mediante `categoryId`.
- Visualización del nombre de la categoría en el catálogo, el detalle y el formulario.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React | Construcción de interfaces y componentes |
| TypeScript | Tipado estático |
| Vite | Desarrollo y compilación |
| Tailwind CSS | Estilos y diseño responsive |
| React Router | Navegación y rutas |
| Axios | Comunicación HTTP con la API local |
| TanStack Query | Consultas, caché, estados asíncronos y mutaciones |
| Zustand | Estado global del carrito |
| Zustand Persist | Persistencia del carrito en `localStorage` |
| React Hook Form | Gestión de formularios |
| Zod | Validación de datos |
| @hookform/resolvers | Integración de Zod con React Hook Form |
| json-server | API REST local de desarrollo |

## Requisitos

- Node.js en una versión compatible con Vite 8.
- pnpm.
- Git (opcional, para clonar el repositorio).

## Instalación

Clona el repositorio y entra en el directorio del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd Prueba-Tecnica-Desserts
```

Instala las dependencias:

```bash
pnpm install
```

## Ejecución en desarrollo

La aplicación necesita dos procesos ejecutándose al mismo tiempo: el servidor de datos y el servidor de Vite.

**Terminal 1 — API local:**

```bash
pnpm server
```

Este comando inicia `json-server` usando `db.json` en el puerto `3000`.

**Terminal 2 — aplicación React:**

```bash
pnpm dev
```

Abre la dirección que muestra Vite, normalmente:

```text
http://localhost:5173
```

La API local queda disponible en:

```text
http://localhost:3000
```

Para que la aplicación pueda consultar productos y categorías, `json-server` debe permanecer ejecutándose mientras se utiliza el frontend.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia Vite en modo desarrollo |
| `pnpm server` | Inicia json-server con `db.json` en el puerto 3000 |
| `pnpm build` | Ejecuta la comprobación de TypeScript y genera la compilación de producción |
| `pnpm preview` | Sirve localmente la compilación de producción |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto |

## Estructura del proyecto

```text
src/
├── components/
│   ├── CartDrawer/
│   ├── ConfirmDeleteModal/
│   ├── ConfirmOrderModal/
│   ├── ProductCard/
│   ├── ProductForm/
│   ├── ProductSkeletons/
│   ├── QuantityStepper/
│   └── header/
├── data/
├── hooks/
│   ├── mutations/
│   ├── queryKeys.ts
│   ├── useCategories.ts
│   ├── useDebounce.ts
│   ├── useProduct.ts
│   └── useProducts.ts
├── layouts/
│   └── MainLayout/
├── pages/
│   ├── CreateProductPage/
│   ├── EditProductPage/
│   ├── HomePage/
│   ├── NotFoundPage/
│   └── ProductDetailPage/
├── schemas/
│   └── dessertSchema.ts
├── services/
│   └── productService.ts
├── stores/
│   └── cartStore.ts
├── types/
│   ├── cart.types.ts
│   ├── category.types.ts
│   └── dessert.types.ts
├── App.tsx
├── index.css
└── main.tsx

public/
db.json
```

Cada directorio tiene una responsabilidad principal:

- **components:** piezas reutilizables de interfaz.
- **pages:** vistas asociadas a rutas.
- **layouts:** estructura compartida entre páginas.
- **hooks:** lógica reutilizable y conexión con TanStack Query.
- **services:** funciones que realizan las peticiones HTTP.
- **schemas:** reglas de validación con Zod.
- **stores:** estado global administrado con Zustand.
- **types:** tipos e interfaces compartidos.
- **data:** datos auxiliares del proyecto.

## API local

La instancia de Axios utiliza como dirección base:

```text
http://localhost:3000
```

### Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/products` | Lista productos |
| GET | `/products/:id` | Obtiene el detalle de un producto |
| POST | `/products` | Crea un producto |
| PUT | `/products/:id` | Reemplaza los datos de un producto |
| DELETE | `/products/:id` | Elimina un producto |
| GET | `/categories` | Lista categorías |
| GET | `/categories/:id` | Obtiene una categoría |

### Búsqueda, filtros y paginación

La consulta de productos admite búsqueda por nombre, filtro por categoría y paginación. La aplicación solicita 8 registros por página.

Ejemplo de primera página:

```http
GET http://localhost:3000/products?_page=1&_per_page=8
```

Ejemplo con filtro por categoría:

```http
GET http://localhost:3000/products?categoryId=3&_page=1&_per_page=8
```

Ejemplo de búsqueda por nombre:

```http
GET http://localhost:3000/products?name:contains=macaron&_page=1&_per_page=8
```

La respuesta paginada de json-server v1 contiene metadatos (`first`, `prev`, `next`, `last`, `pages` e `items`) y el arreglo de registros dentro de `data`.

### Base de datos

Los datos de desarrollo se encuentran en `db.json`. El archivo contiene dos colecciones principales:

- `products`: productos disponibles en la tienda.
- `categories`: categorías asociadas a los productos.

Los productos se relacionan con las categorías mediante `categoryId`, que corresponde al `id` de una categoría.

Para añadir datos de prueba, edita `db.json` o utiliza los formularios de administración de la aplicación.

## Modelo de datos

La estructura principal de un producto es:

```ts
type DessertImage = {
  desktop: string;
  mobile: string;
  tablet: string;
  thumbnail: string;
};

type Dessert = {
  id: string | number;
  name: string;
  categoryId: number;
  price: number;
  image: DessertImage;
};
```

La categoría utiliza esta estructura:

```ts
type Category = {
  id: string | number;
  name: string;
};
```

Se admite `string | number` para los identificadores porque json-server v1 puede generar IDs de tipo string. Al comparar IDs de productos y categorías, la interfaz normaliza sus valores para evitar diferencias entre tipos.

## Decisiones técnicas

### Separación entre servicios y consultas

Las funciones de `productService.ts` se encargan de realizar las peticiones HTTP con Axios. Los hooks utilizan TanStack Query para ejecutar consultas, administrar estados asíncronos y mantener los datos en caché.

### Claves de consulta

Las claves se centralizan en `queryKeys.ts`. Las listas incluyen filtros y parámetros de paginación; los detalles incluyen el identificador del producto. Esto permite invalidar las consultas relacionadas después de una mutación.

### Mutaciones e invalidación de caché

Las operaciones de creación, actualización y eliminación se implementan con `useMutation`. Después de una operación exitosa se invalidan las consultas de productos correspondientes para que TanStack Query pueda actualizarlas.

### Estado del carrito

Zustand administra el carrito y su middleware `persist` conserva su contenido en `localStorage`, de modo que los elementos se mantienen al recargar la aplicación.

### Formularios y validación

React Hook Form administra los campos y el envío del formulario. Zod define las reglas de validación y `zodResolver` conecta ambas herramientas. El formulario de producto se reutiliza para creación y edición; en edición se inicializa con los datos del producto.

### API local

`json-server` proporciona una API REST local para el ejercicio. La aplicación no necesita consumir servicios externos para obtener el catálogo ni las categorías.

## Rutas de la aplicación

| Ruta | Vista |
|---|---|
| `/` | Catálogo de productos |
| `/producto/:id` | Detalle de producto |
| `/admin/productos/nuevo` | Formulario de creación |
| `/admin/productos/:id/editar` | Formulario de edición |

La eliminación se inicia desde la vista de detalle mediante un modal de confirmación.

## Consideraciones conocidas

- Las rutas de administración son accesibles sin autenticación. Esto es aceptable para una prueba técnica local, pero no debe considerarse un control de acceso para una tienda en producción.
- La URL de Axios apunta actualmente a `http://localhost:3000`. Para desplegar el frontend, será necesario publicar también la API o disponer de un backend accesible y configurar la URL correspondiente para producción.
- El archivo `db.json` funciona como base de datos de desarrollo. No sustituye una base de datos ni un backend preparado para producción.
- Antes de la entrega final, ejecutar `pnpm build` y `pnpm lint`, y verificar manualmente los flujos de creación, edición, eliminación, carrito y paginación.

## Estado del proyecto

Proyecto desarrollado como práctica técnica para trabajar con React, TypeScript, consumo de API REST local, gestión de estado, formularios y arquitectura frontend por funcionalidades.
