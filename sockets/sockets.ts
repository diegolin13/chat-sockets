import socketIO, { Socket } from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';

const listaUsuarios = new UsuariosLista();

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        listaUsuarios.borrarUsuario(cliente.id);
    });
}

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    // Recibimos el mensaje
    cliente.on('mensaje', (payload: {from: string, body:string}) => {
        console.log('Mensaje recibido', payload);
        // Se emite el mensaje recibido a los demas usuarios
        io.emit('mensaje-nuevo', payload);
    });
}


export const loginWs = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('config-usuario', (payload: {nombre: string}, callback) => {
        listaUsuarios.setName(cliente.id, payload.nombre);
        callback({
            ok: true,
            resp: "Usuario: " + payload.nombre + " " + "recibido"
        });
    });
}

export const addNewUser = (idCliente: string) => {
    const nuevoUsuario = new Usuario(idCliente);
    listaUsuarios.agregar(nuevoUsuario);
}