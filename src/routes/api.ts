import express from 'express';
import { CifraVernam } from '../service/CifraVernam'

const apiRouter = express.Router();
const cifraVernam = new CifraVernam();

/**
 * @swagger
 * /cifrar:
 *   post:
 *     summary: Criptografa a mensagem pela cifra de Vernam.
 *     description: Criptografa a mensagem pela Cifra de Vernam, retornando em texto binario em 8 bits.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - textoClaro
 *               - chave
 *             properties:
 *               texto:
 *                 type: string
 *                 description: mensagem clara.
 *               chave:
 *                 type: string
 *                 description: chave.
 *             example:
 *               textoClaro: "Mensagem"
 *               chave: "abcdefgh"
 *     responses:
 *       200:
 *         description: Mensagem criptografada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textoCifrado:
 *                   type: string
 *                   description: Mensagem criptografada.
 *             example:
 *               textoCifrado: "0010110000000111000011010001011100000100000000010000001000000101"
 *       400:
 *         description: Erro ao cifrar mensagem.
 */
apiRouter.post('/cifrar', (req, res) => {
    try{
        const mensagemCifrada: string = cifraVernam.cifrar(req.body.textoClaro, req.body.chave);
        res.status(200).json({ textoCifrado: `${mensagemCifrada}` });
    } catch(err: any) {
        console.log(err);
        res.status(400).json({ erro: `${err.message}`});
    }
});

/**
 * @swagger
 * /decifrar:
 *   post:
 *     summary: Descriptografa a mensagem pela cifra de Vernam.
 *     description: Descriptografa a mensagem, em binario de 8 bits utilizando a cifra de vernam.
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
 *                 description: mensagem criptografada em binario.
 *               chave:
 *                 type: string
 *                 description: chave.
 *             example:
 *               textoCifrado: "0010110000000111000011010001011100000100000000010000001000000101"
 *               chave: "abcdefgh"
 *     responses:
 *       200:
 *         description: Mensagem descriptografada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 textoClaro:
 *                   type: string
 *                   description: Mensagem descriptografada.
 *             example:
 *               textoClaro: "Mensagem"
 *       400:
 *         description: Erro ao cifrar mensagem.
 */
apiRouter.post('/decifrar', (req, res) => {
    try{
        const mensagemClara: string = cifraVernam.decifrar(req.body.textoCifrado, req.body.chave);
        res.status(200).json({ textoClaro: `${mensagemClara}` });
    } catch(err: any) {
        console.log(err);
        res.status(400).json({ erro: `${err.message}`});
    }
});

module.exports = apiRouter;

export default apiRouter;