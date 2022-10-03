const socket = io.connect();

const formAgregarProducto = document.getElementById('formAgregarProducto');
formAgregarProducto.addEventListener('submit', e => {
  e.preventDefault();
  const producto = {
    title: formAgregarProducto[0].value,
    price: formAgregarProducto[1].value,
    photo: formAgregarProducto[2].value,
  };
  socket.emit('update', producto);
  formAgregarProducto.reset();
});

socket.on('productos', productos => {
  makeHtmlTable(productos).then(html => {
    document.getElementById('productos').innerHTML = html;
  });
});

function makeHtmlTable(productos) {
  return fetch('plantillas/tabla-productos.hbs')
    .then(respuesta => respuesta.text())
    .then(plantilla => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

const userSchema = new normalizr.schema.Entity('user');
const messageSchema = new normalizr.schema.Entity('message', {
  author: userSchema,
});
const messagesListSchema = new normalizr.schema.Entity('messagesList', {
  messages: [messageSchema],
});

const inputUsername = document.getElementById('username');
const inputMensaje = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje');
formPublicarMensaje.addEventListener('submit', e => {
  e.preventDefault();

  const mensaje = {
    author: {
      id: inputUsername.value,
      email: inputUsername.value,
      nombre: document.getElementById('firstname').value,
      apellido: document.getElementById('lastname').value,
      edad: document.getElementById('age').value,
      alias: document.getElementById('alias').value,
      avatar: document.getElementById('avatar').value,
    },
    text: inputMensaje.value,
    id: Math.floor(Math.random() * 1000),
  };
  const normalizedMessage = normalizr.normalize(mensaje, messageSchema);
  socket.emit('nuevoMensaje', normalizedMessage);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});

socket.on('mensajes', messages => {
  console.log(messages);

  const denormalizedMessages = normalizr.denormalize(messages.result, messagesListSchema, messages.entities);
  const normalizedMessagesLength = JSON.stringify(messages).length;
  const messagesLength = JSON.stringify(denormalizedMessages).length;
  const porcentaje = (normalizedMessagesLength * 100) / messagesLength;
  const porcentajeEl = document.getElementById('compresion-info');
  porcentajeEl.innerText = porcentaje.toFixed(2);

  const html = makeHtmlList(denormalizedMessages?.messages);
  document.getElementById('mensajes').innerHTML = html;
});

function makeHtmlList(mensajes) {
  return mensajes
    .map(mensaje => {
      return `
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.timestamp}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `;
    })
    .join(' ');
}

inputUsername.addEventListener('input', () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener('input', () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
