const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto');
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault();
    const newProduct = createNewProduct(e);
    socket.emit('nuevo-producto', newProduct);
});

const createNewProduct = e => {
    return {
        nombre: e.target[0].value,
        precio: e.target[1].value,
        foto: e.target[2].value,
    };
};

socket.on('productos', productos => {
    const productosDiv = document.getElementById('productos');
    makeHtmlTable(productos).then(tableHtml => (productosDiv.innerHTML = tableHtml));
});

function makeHtmlTable(objetos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ objetos });
            return html;
        });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername');
const inputMensaje = document.getElementById('inputMensaje');
const btnEnviar = document.getElementById('btnEnviar');

const formPublicarMensaje = document.getElementById('formPublicarMensaje');
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault();
    console.log(inputUsername.value, inputMensaje.value);
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const newMessage = createNewMessage(inputUsername.value, inputMensaje.value);
    socket.emit('new-message', newMessage);
    formPublicarMensaje.reset();
    inputMensaje.focus();
});

const createNewMessage = (userName, message) => {
    return {
        userName,
        message,
    };
};

socket.on('messages', mensajes => {
    console.log(mensajes);
    const html = makeHtmlList(mensajes);
    document.getElementById('mensajes').innerHTML = html;
});

function makeHtmlList(mensajes) {
    const html = mensajes
        .map(elem => {
            return `<div><strong style="color: blue;">${elem.userName}</strong><span style="color: brown;">[${elem.date}]</span>:<em style="color: green;">${elem.message}</em></div>`;
        })
        .join(' ');
    return html;
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
