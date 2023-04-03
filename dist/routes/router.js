"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
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
    const payload = {
        from,
        body
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        body,
        from,
        id
    });
});
router.post('/mensajes', (req, res) => {
    const { body, from } = req.body;
    const server = server_1.default.instance;
    const payload = {
        from,
        body
    };
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        body,
        from
    });
});
// Se obtienen los ids de los sockets conectados
router.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const server = server_1.default.instance;
    yield server.io.fetchSockets().then((resp) => {
        const ids = [];
        resp.forEach((socket) => {
            ids.push(socket.id);
        });
        res.json({ ok: true, users: ids });
    });
}));
// Obtener usuarios y detalles
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        users: sockets_1.listaUsuarios.getLista()
    });
});
exports.default = router;
