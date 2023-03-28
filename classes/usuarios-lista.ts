import { Usuario } from "./usuario";

export class UsuariosLista {
    private lista: Usuario[] = [];


    // Se inicializa usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // Se coloca el nombre al usuario recién creado
    public setName(id: string, nombre: string) {
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

    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    // Se obtiene un usuario

    public getUsuario( id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuarios en sala particular

    public getUsuariosSala(sala: string) {
        return this.lista.filter( usuario => usuario.sala === sala);
    }


    public borrarUsuario(id: string) {
        const tempUsr = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);

        console.log(this.lista);

        return tempUsr;
    }


}