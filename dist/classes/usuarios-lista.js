"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Se inicializa usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    // Se coloca el nombre al usuario recién creado
    setName(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('==========SETEANDO NOMBRE====================');
        console.log(this.lista);
    }
    // Se obtiene la lista de los usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    // Se obtiene un usuario
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    // Obtener usuarios en sala particular
    getUsuariosSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    borrarUsuario(id) {
        const tempUsr = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        console.log(this.lista);
        return tempUsr;
    }
    updateNotificaciones(id, notificaciones) {
        this.lista.forEach((user) => {
            if (user.id === id) {
                user.notificaciones = notificaciones;
            }
        });
        console.log(this.lista);
    }
}
exports.UsuariosLista = UsuariosLista;
