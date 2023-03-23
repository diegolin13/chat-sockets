import socketIO, { Socket } from 'socket.io';

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Client Disconnected');
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