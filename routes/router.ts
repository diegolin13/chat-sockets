import { Request, Response, Router } from "express";

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
    res.json({
        ok: true,
        body,
        from,
        id
    });
});


export default router;