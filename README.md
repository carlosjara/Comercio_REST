# Comercio_REST
Servidor Modelo Control

### Descripcion

En este servidor se podran encontrar todos los fuentes (nodejs express, handlebars y mysql) asociados a servicios REST y a conexion con la base de datos MySQL, se busca dar detallada explicacion de cada carpeta.

#### persistence

En esta carpeta se encuentra configurados el acceso a la BD

Modelo BD (carpeta md_folder)

![alt text](md_folder/snj_tpaga.png)

De igual manera se encuentran las peticiones de base de datos por cada tipo de transaccion, libros (books.js), carrito (cart.js), finalizacion de compra (end_of.js), usuarios (users.js) y conexion con BD (conn.js).

#### routes

En esta carpeta se encuentran los servicios (get,post) que pueden ser consumidos.

#### views

En esta carpeta se encuentran los templates con handlebars por defecto en caso de que se desee consumir urls (si son rederizados).

#### [app.js](https://github.com/carlosjara/Comercio_REST/blob/master/app.js)

En este archivo se encuentra la configuracion principal de este servidor, el puerto de acceso y configuracion de handlebars para visualizacion de templates a mostrar.


#### [Package.json](https://github.com/carlosjara/Comercio_REST/blob/master/package.json)

Se encuentran los complementos usandos en este desarrollo, al ejecutar el comando
```html
npm install
```
se crearala la carpeta node_modules en donde estan la fuentes de todos estos complementos.