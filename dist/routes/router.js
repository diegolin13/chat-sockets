"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        msg: 'okis'
    });
});
router.post('/mensajes/:id', (req, res) => {
    const { body, from } = req.body;
    const id = req.params.id;
    res.json({
        ok: true,
        body,
        from,
        id
    });
});
exports.default = router;
