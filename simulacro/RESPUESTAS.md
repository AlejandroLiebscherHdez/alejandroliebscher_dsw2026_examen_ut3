## Cómo se instala y arranca tu proyecto

El proyecto se instala mediante un **fork** que le haremos al profesor creamos un nuevo proyecto propio y ``añadimos de colaborador al profesor``, luego en nuestros documentos donde queramos guardar el proyecto hacemos un git clone del proyecto y por último dentro de la carpeta simulacro copiamos el código de nuestro backend **(Los-Gallos)** dentro de la carpeta **simulacro**, luego para poder finalizar la `instalación al completo` necesitamos descargar las dependencias mediante **npm install** y ya tendremos todo lo necesario para poder arrancarlo que antes de hacerlo se recomienda usar **npm run typecheck** y **npm run eslint**

## Dónde se configura el puerto y cómo llega ese valor hasta el arranque del servidor

El proyecto lo configuramos dentro del archivo **.env** que lo tendremos que crear al ``copiar el codigo del backend``, mediante la carpeta **config** que contiene dentro el archivo **env.ts** es donde llega el valor para ``el arranque del servidor`` el cual exporta la constante **env.ts**, se encarga de que en caso de que el env no tenga un valor o el node un nombre ``ponerle uno por defecto para que no salten errores``.

## Por qué se sube a GitHub el .env.example y se excluye .env

Porque el **.env** es el archivo que contiene nuestra ``información interna``, no queremos que puedan verla, por eso utilizamos el **.env.example** que sirve para mostrar en **github** lo que vamos a usar dentro del proyecto ``sin mostrarles el valor``.

### 3. Nuevo tipo de error

Hemos creado `ResourceNotFoundError` para cuando intentamos consultar un documento que no existe.

El error se genera en `documentsController.ts`, dentro de la función `getById`, cuando no encuentra el documento solicitado.

Después, con `next(err)`, se pasa al archivo `errorHandler.ts`, que devuelve una respuesta 404 en formato JSON con el mensaje y el identificador del documento.

### 4. Validación del título

En la función update de documentsController.ts comprobamos que el título sea un texto válido y no esté vacío.

Si el título es incorrecto, respondemos directamente con un 400 y terminamos la función con return, sin llamar al servicio ni modificar el documento.

La diferencia con el ejercicio anterior es que allí lanzábamos un error y lo pasábamos a errorHandler con next(err). Aquí respondemos directamente desde el controlador.

### 5. Configuración del logger

Hemos añadido la variable LOG para poder activar y desactivar los registros de las peticiones.

Cuando ponemos LOG=ON, el servidor registra cada petición. Cuando ponemos LOG=OFF, deja de mostrar esos registros, pero las rutas siguen funcionando normalmente.

Esto ocurre porque desactivar el logger no impide que Express continúe procesando las peticiones. Además, el manejador de errores sigue registrando los errores por separado.

### 6. Avisos del centro

Hemos creado un nuevo recurso llamado notices para gestionar los avisos del centro.

Hemos separado el código en rutas, controladores y servicios, igual que hicimos anteriormente con documents.

El servicio guarda los avisos en un array en memoria. El controlador comprueba los datos y devuelve las respuestas, mientras que las rutas indican qué función se ejecuta en cada petición.

También hemos añadido cinco avisos iniciales y las funciones para listarlos con paginación y búsqueda, consultar uno, crear nuevos avisos y modificarlos.

## Segunda parte: ejercicios 7 a 12

### 7. Paginación y búsqueda

En `noticesController.list` leemos `page`, `limit` y `search` de `req.query` y validamos que `page` y `limit` sean enteros positivos. El valor predeterminado es `page=1`, `limit=2`. `noticesService.list` filtra títulos con `filter()` e `includes()` (sin distinguir mayúsculas), calcula el total filtrado y después utiliza `slice()` para la página. Si no hay coincidencias, `data` es un array vacío y se responde 200.

### 8. Crear, consultar y modificar avisos

En `noticesController.create` se valida el `title` y la descripción opcional antes de llamar al servicio. Si la descripción se omite, se pasa `''`. En `getById` y en `update`, si el ID no existe, se lanza `ResourceNotFoundError`. En PATCH se comprueban todos los campos antes de actualizar, por lo que un campo inválido no cambia ningún dato. `noticesService.update` conserva los campos omitidos. Los errores `AppError` y `ResourceNotFoundError` se convierten en HTTP en `errorHandler.ts`.

### 9. Desarrollo y producción

El archivo `errorHandler.ts` consulta `env.NODE_ENV`. En desarrollo, para un error inesperado se puede devolver `err.message` y el log incluye `stack`. En producción, el mensaje de un error inesperado se sustituye por `An unexpected error occurred` y la traza no se incluye en el log. Los errores esperados 400 y 404 conservan sus respuestas. **Esta explicación describe el código: para acreditar la prueba, hay que ejecutar ambas configuraciones y guardar las capturas reales de Bruno y consola.**

### 10. Orden de middlewares (no dejar los fallos puestos)

Si se coloca `notFound` antes de las rutas, una petición válida puede recibir 404 porque se responde antes de llegar al router. Si se elimina `next()` del `logger`, la petición puede quedarse pendiente porque nadie continúa ni responde. Se restaura el orden normal: `requestId`, `logger` cuando LOG está activo, `express.json()`, rutas, `notFound`, `errorHandler`. **Se deben probar y documentar los cambios temporales en la propia máquina.**

### 11. Recorridos

- GET documento existente: ruta → controlador → servicio → HTTP 200.
- GET documento inexistente: ruta → controlador → `ResourceNotFoundError` → `catch`/`next(err)` → `errorHandler` → HTTP 404.
- URL inexistente: ninguna ruta responde → `notFound` → HTTP 404.
- POST aviso inválido: controlador → `AppError` → `catch`/`next(err)` → `errorHandler` → HTTP 400.
- JSON mal formado: `express.json()` produce error → `errorHandler` → HTTP 400.
- PATCH documento con título inválido: controlador → `res.status(400).json(...)` → `return` sin llamar al servicio.

### 12. Entrega

Ejecutar `npm run typecheck`, `npm run lint` y probar las rutas originales y las nuevas con Bruno. Incluir `RESPUESTAS.md`, `.env.example`, la colección de Bruno y las evidencias realmente capturadas. No subir `.env` ni `node_modules`.
