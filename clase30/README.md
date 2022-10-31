# Server

Para iniciar el servidor se debe ejecutar con node

```sh
node ./index.js
```

El servidor puede recibir como argumentos:

- **modo**: puede correrse en modo **FORK** o **CLUSTER**, en caso de no especificar se ejecutará en **modo FORK por default**.

**Ejemplos:**

```sh
node ./index.js --port=8081 --mode=CLUSTER
node ./index.js --port=8082 --mode=FORK
node ./index.js -p=8081 -m=CLUSTER
node ./index.js -p=8082 -m=FORK
```

### Ejecución con **nodemon**

Al ejecutar con nodemon se pueden especificar exactamente los mismos argumentos que al ejecutar con node.

- **modo**: puede correrse en modo **FORK** o **CLUSTER**, en caso de no especificar se ejecutará en **modo FORK por default**.

**Ejemplos:**

```sh
nodemon ./index.js --port=8081 --mode=CLUSTER
nodemon ./index.js --port=8082 --mode=FORK
```

### Ejecución con **forever**

Hay que asegurarse tener **forever** instalado. Para instalarlo globalmente correr:

```sh
npm i forever -g
```

Para ejecutar con forever se debe correr **forever start**

```sh
forever start ./index.js --port=8081 --watch
forever start ./index.js --port=8082 --watch
forever start ./index.js --port=8083 --watch
```

Para listar los procesos por sistema operativo se agrega el parámetro **list**:

```sh
forever list
```

Para terminar los procesos correr forever agregando el parámetro **stopall**:

```sh
forever stopall
```

### Ejecución con **PM2**

Hay que asegurarse tener **PM2** instalado.

````
##### Modo fork
Para ejecutar con PM2 se debe correr **pm2 start**.

Ejemplo:
```sh
pm2 start ./index.js --name=servidor --watch -- --port=8081
````

##### Modo cluster

Para correr en modo cluster se debe agregar **-i** y la cantidad de procesos. Si se pasa como parámetro **-i max** se corren tantos procesos como procesadores tenga el CPU.

```sh
pm2 start ./index.js --name=servidor --watch -i max -- --port=8081
```

**Nota**: este modo de ejecución para este servidor generará escuchas sobre el mismo puerto generando conflictos.
Para listar los procesos por sistema operativo se agrega el parámetro **list**:

```sh
pm2 list
```

Para terminar los procesos correr forever agregando el parámetro **delete**. Se puede definir el proceso a eliminar o borrar todos con **all**

```sh
pm2 delete all
```

### Ejecución con **Nginx**

Renombrar el archivo **nginx.conf.A-USAR** por **nginx.conf** y ubicarlo en la carpeta conf de nginx y luego ejecutar nginx. Nginx debería estar levantando el servidor en el puerto 80.

##### Modo cluster nativo

Iinciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor1 --watch -- --port=8081 --mode=CLUSTER
```

El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080. Iniciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor2 --watch
```

Los servidores deberían estar corriendo en los puertos 8080 y 8081.

##### Modo clusters gestionados desde nginx

Iniciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor1 --watch
```

Se corren 4 servidores, en los puertos 8082, 8083, 8084 y 8085.

```sh
pm2 start ./index.js --name=servidor2 --watch -- --port=8082
pm2 start ./index.js --name=servidor3 --watch -- --port=8083
pm2 start ./index.js --name=servidor4 --watch -- --port=8084
pm2 start ./index.js --name=servidor5 --watch -- --port=8085
```

Los servidores deberían estar corriendo en los puertos 8080, 8082, 8083, 8084 y 8085.
