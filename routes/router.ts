import { Request, Response, Router } from "express";
import Server from "../classes/server";

const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        msg: 'okis'
    });
});


router.post('/mensajes/:id', (req: Request, res: Response) => {
    const {body, from} = req.body;
    const id = req.params.id;

    const payload = {
        from,
        body
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        body,
        from,
        id
    });
});


router.post('/mensajes', (req: Request, res: Response) => {
    const {body, from} = req.body;
    const server = Server.instance;
    const payload = {
        from,
        body
    }

    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        body,
        from
    });
});


export default router;