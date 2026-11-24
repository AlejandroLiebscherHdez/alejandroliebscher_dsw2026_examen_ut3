## Cómo se instala y arranca tu proyecto

El proyecto se instala mediante un **fork** que le haremos al profesor creamos un nuevo proyecto propio y ``añadimos de colaborador al profesor``, luego en nuestros documentos donde queramos guardar el proyecto hacemos un git clone del proyecto y por último dentro de la carpeta simulacro copiamos el código de nuestro backend **(Los-Gallos)** dentro de la carpeta **simulacro**, luego para poder finalizar la `instalación al completo` necesitamos descargar las dependencias mediante **npm install** y ya tendremos todo lo necesario para poder arrancarlo que antes de hacerlo se recomienda usar **npm run typecheck** y **npm run eslint**

## Dónde se configura el puerto y cómo llega ese valor hasta el arranque del servidor

El proyecto lo configuramos dentro del archivo **.env** que lo tendremos que crear al ``copiar el codigo del backend``, mediante la carpeta **config** que contiene dentro el archivo **env.ts** es donde llega el valor para ``el arranque del servidor`` el cual exporta la constante **env.ts**, se encarga de que en caso de que el env no tenga un valor o el node un nombre ``ponerle uno por defecto para que no salten errores``.

## Por qué se sube a GitHub el .env.example y se excluye .env

Porque el **.env** es el archivo que contiene nuestra ``información interna``, no queremos que puedan verla, por eso utilizamos el **.env.example** que sirve para mostrar en **github** lo que vamos a usar dentro del proyecto ``sin mostrarles el valor``.