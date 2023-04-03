"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotifications = exports.privateMessage = exports.getUsers = exports.addNewUser = exports.loginWs = exports.mensaje = exports.desconectar = exports.listaUsuarios = void 0;
const usuario_1 = require("../classes/usuario");
const usuarios_lista_1 = require("../classes/usuarios-lista");
exports.listaUsuarios = new usuarios_lista_1.UsuariosLista();
const desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.listaUsuarios.borrarUsuario(cliente.id);
        io.emit('active-users', exports.listaUsuarios.getLista());
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente, io) => {
    // Recibimos el mensaje
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        // Se emite el mensaje recibido a los demas usuarios
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
const loginWs = (cliente, io) => {
    cliente.on('config-usuario', (payload, callback) => {
        exports.listaUsuarios.setName(cliente.id, payload.nombre);
        io.emit('active-users', exports.listaUsuarios.getLista());
        callback({
            ok: true,
            resp: "Usuario: " + payload.nombre + " " + "recibido",
        });
    });
};
exports.loginWs = loginWs;
const addNewUser = (idCliente) => {
    const nuevoUsuario = new usuario_1.Usuario(idCliente);
    exports.listaUsuarios.agregar(nuevoUsuario);
};
exports.addNewUser = addNewUser;
const getUsers = (cliente, io) => {
    cliente.on('get-users', () => {
        io.to(cliente.id).emit('active-users', exports.listaUsuarios.getLista());
    });
};
exports.getUsers = getUsers;
const privateMessage = (cliente, io) => {
    cliente.on('private-message', (payload) => {
        payload['idFrom'] = cliente.id;
        payload.to.push(cliente.id);
        io.in(payload.to).emit('mensaje-nuevo', payload);
    });
};
exports.privateMessage = privateMessage;
const updateNotifications = (cliente) => {
    cliente.on('update-notificaciones', (payload) => {
        exports.listaUsuarios.updateNotificaciones(payload.id, payload.notificaciones);
    });
};
exports.updateNotifications = updateNotifications;
