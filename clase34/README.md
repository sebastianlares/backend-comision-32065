# Server

## Heroku Logs

- Los logs de heroku pueden verificarse en el archivo heroku-logs.txt.
- Estos fueron generados con el comando: heroku logs --tail

## Info & Info-zip

Se agregó una ruta /info-zip, para verificar el tamaño de la respuesta comprimida.

- Tamaño de la respuesta sin comprimir => 2.4 kb.
- Tamaño de la respuesta comprimida => 1.3 kb.

## Inicio Servidor

### Para iniciar el servidor se debe ejecutar con node

```sh
node ./index.js
```

El servidor puede recibir como argumentos:

- mode: FORK o CLUSTER. Alias -m
- port: 8090. Alias -p

```sh
node ./index.js --port=8081 --mode=CLUSTER
node ./index.js --port=8082 --mode=FORK
node ./index.js -p=8081 -m=CLUSTER
node ./index.js -p=8082 -m=FORK
```

### Iniciar el servidor con nodemon

El servidor puede recibir los mismos argumentos

```sh
nodemon ./index.js --port=8081 --mode=CLUSTER
nodemon ./index.js --port=8082 --mode=FORK
```

# Ejecución con forever

### Verificar de tener forever instalado.

```
Correr forever start

forever start ./index.js --port=8081 --watch
forever start ./index.js --port=8082 --watch
forever start ./index.js --port=8083 --watch
```

## Comandos forever

### Para listar los procesos

```sh
forever list
```

### Para terminar los procesos

```sh
forever stopall
```

# Ejecución con pm2

### Verificar de tener instalado pm2.

## Modo fork

```
Correr pm2 start

pm2 start ./index.js --name=servidor --watch -- --port=8081
```

## Modo cluster

```
pm2 start ./index.js --name=servidor --watch -i max -- --port=8081
```

## Comandos pm2

### Para listar los procesos

```sh
pm2 list
```

### Para terminar los procesos

```sh
pm2 delete all
```

# Nginx

### Renombrar el archivo **nginx.conf.A-USAR** por **nginx.conf** y ubicarlo en la carpeta conf de nginx y luego ejecutar nginx. Nginx debería estar levantando el servidor en el puerto 80.

## Modo cluster nativo

### Iinciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor1 --watch -- --port=8081 --mode=CLUSTER
```

### El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080. Iniciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor2 --watch
```

### Los servidores deberían estar corriendo en los puertos 8080 y 8081.

## Modo clusters gestionados desde nginx

### Iniciar el servidor con pm2:

```sh
pm2 start ./index.js --name=servidor1 --watch
```

### Se corren 4 servidores, en los puertos 8082, 8083, 8084 y 8085.

```sh
pm2 start ./index.js --name=servidor2 --watch -- --port=8082
pm2 start ./index.js --name=servidor3 --watch -- --port=8083
pm2 start ./index.js --name=servidor4 --watch -- --port=8084
pm2 start ./index.js --name=servidor5 --watch -- --port=8085
```

### Los servidores deberían estar corriendo en los puertos 8080, 8082, 8083, 8084 y 8085.
