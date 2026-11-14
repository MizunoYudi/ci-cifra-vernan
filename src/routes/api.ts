import express from 'express';
import { CifraVernam } from '../service/CifraVernam'

const apiRouter = express.Router();
const cifraVernam = new CifraVernam();

/**
 * @swagger
 * /cifrar:
 *   post:
 *     summary: Criptografa a mensagem pela cifra de Vernam.
 *     description: Criptografa a mensagem pela Cifra de Vernam, retornando em texto (Pode retornar caracteres em unicode, pois a aplicação da cifra pode retornar caracteres da tabela ASCII que não são iluistraveis).
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
 *               textoCifrado: ",\u0007\r\u0017\u0004\u0001\u0002\u0005"
 *       400:
 *         description: Erro ao cifrar mensagem.
 */
apiRouter.post('/cifrar', (req, res) => {
    try{
        const mensagemCifrada: string = cifraVernam.cifraVernam(req.body.textoClaro, req.body.chave);
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
 *     description: Descriptografa a mensagem utilizando a cifra de vernam. É possível inserir characteres em unicode que o mesmo irá descriptografar da mesma maneira.
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
 *             example:
 *               textoCifrado: ",\u0007\r\u0017\u0004\u0001\u0002\u0005"
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
        const mensagemClara: string = cifraVernam.cifraVernam(req.body.textoCifrado, req.body.chave);
        res.status(200).json({ textoClaro: `${mensagemClara}` });
    } catch(err: any) {
        console.log(err);
        res.status(400).json({ erro: `${err.message}`});
    }
});

module.exports = apiRouter;

export default apiRouter;