"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje = exports.desconectar = void 0;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Client Disconnected');
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
    });
};
exports.mensaje = mensaje;
