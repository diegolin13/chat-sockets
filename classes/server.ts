import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

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

    escucharSockets() {
        this.io.on('connection', () => {
            console.log('Listening sockets...')
            console.log('New client connected');
        });
    }

    start(callback: any) {
        this.app.listen(this.port, callback);
    }
}