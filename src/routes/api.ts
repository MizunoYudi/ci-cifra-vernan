import express from 'express';
import { CifraVernam } from '../service/CifraVernam'

const apiRouter = express.Router();
const cifraVernam = new CifraVernam();

/**
 * @swagger
 * /cifrar:
 *   post:
 *     summary: Criptografa a mensagem enviada.
 *     description: Criptografa a mensagem enviada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *               - chave
 *             properties:
 *               texto:
 *                 type: string
 *                 description: mensagem clara.
 *               chave:
 *                 type: string
 *                 description: chave.
 *     responses:
 *       201:
 *         description: mensagem criptografada.
 *       400:
 *         description: erro ao cifrar mensagem.
 */
apiRouter.post('/cifrar', (req, res) => {
    const mensagemCifrada: string = cifraVernam.cifrar(req.body.texto, req.body.chave);
    res.status(200).json({ texto: `${mensagemCifrada}` });
});

/**
 * @swagger
 * /decifrar:
 *   post:
 *     summary: Descriptografa a mensagem enviada.
 *     description: Descriptografa a mensagem enviada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textoCifrado
 *               - chave
 *             properties:
 *               textoCifrado:
 *                 type: string
 *                 description: mensagem criptografada.
 *               chave:
 *                 type: string
 *                 description: chave.
 *     responses:
 *       201:
 *         description: mensagem descriptografada.
 *       400:
 *         description: erro ao cifrar mensagem.
 */
apiRouter.post('/decifrar', (req, res) => {
    res.status(200).json({ texto: `${req.body.textoCifrado}` });
});

module.exports = apiRouter;

export default apiRouter;