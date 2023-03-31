import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    private static _instance: Server;

    private constructor() {        
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('escuchando sockets');
        this.io.on('connect', cliente => {

            // agregar a lista de usuarios conectados el cliente
            socket.addNewUser(cliente.id);

            // Desconectar
            socket.desconectar(cliente, this.io);

            // Recibir mensaje
            socket.mensaje(cliente, this.io);

            // Registrar Usuario
            socket.loginWs(cliente, this.io);

            // ObtenerUsuarios
            socket.getUsers(cliente, this.io);

            //Mensajes privados
            socket.privateMessage(cliente, this.io);

            // notificaciones
            socket.updateNotifications(cliente);
        });
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }
}