export class CifraVernam {
    public cifrar(textoClaro: string, chave: string): string {
        this.validar(textoClaro, chave, false);
        return this.aplicarCifraVernam(textoClaro, chave, false);
    }

    public decifrar(textoClaro: string, chave: string): string {
        this.validar(textoClaro, chave, true);
        return this.aplicarCifraVernam(textoClaro, chave, true);
    }

    private validar(textoClaro: string, chave: string, decifrar: boolean): void {
        this.mensagemChaveVazia(textoClaro, chave);
        if(decifrar) 
            this.mensagemBinarioValida(textoClaro, chave);
        this.validarChave(textoClaro, chave, decifrar);
    }

    private mensagemBinarioValida(textoClaro: string, chave: string): void {
        if(textoClaro.length < 8 || textoClaro.length % 8 !== 0 || this.ehBinario(textoClaro))
            throw new Error("Mensagem invalida. Preencha com um valor em binário com 8 bits");
    }

    private ehBinario(texto: string): boolean {
        for(let i in texto.split(""))
            if(parseInt(i) !== 0 || parseInt(i) !== 1) 
                return false
        return true
    }

    private mensagemChaveVazia(textoClaro: string, chave: string): void {
        if (textoClaro == "" || chave == "") {
            throw new Error("Mensagem ou Chave vazia, preencha corretamente");
        }
    }

    private validarChave(textoClaro: string, chave: string, decifrar: boolean): void {
        if (decifrar)
            if (chave.length >= textoClaro.length/8)
                return
            else
                throw new Error("A chave deve ser do mesmo tamanho da mensagem em binario em 8 bits ou maior");
        else
            if (chave.length >= textoClaro.length)
                return
            else
                throw new Error("A chave deve ser do mesmo tamanho da mensagem ou maior");
    }

    private aplicarCifraVernam(texto: string, chave: string, decifrar: boolean): string {
        const textoClaroBinario: string[] = this.converterTextoClaro(texto, decifrar);
        const chaveBinario: string[] = this.converterParaArrayBinario(chave);
        if(decifrar)
                return this.decodificar(textoClaroBinario, chaveBinario);
        return this.codificar(textoClaroBinario, chaveBinario);
    }

    private converterTextoClaro(textoClaro: string, binario: boolean): string[] {
        if(binario) 
            return this.converterBinarioParaArrayBinario(textoClaro);
        return this.converterParaArrayBinario(textoClaro);
    }

    private converterBinarioParaArrayBinario(textoClaroBinario: string): string[] {
        let arrayBinario: string[] = [];
        for(let i = 0; i < textoClaroBinario.length; i += 8)
            arrayBinario.push(textoClaroBinario.slice(i, i+8));
        return arrayBinario;
    }

    private converterParaArrayBinario(texto: string): string[] {
        const arrayBinario: string[] = texto.split('').map((char: string) => char.charCodeAt(0).toString(2).padStart(8, '0'));
        return arrayBinario;
    }

    private codificar(textoClaro: string[], chave: string[]): string {
        const textoBinarioCodificado: string[] = [];
        for (let i = 0; i < textoClaro.length; i++)
            textoBinarioCodificado.push(this.aplicarXOR(textoClaro[i], chave[i]));
        return textoBinarioCodificado.join("");
    }

    private decodificar(textoCifrado: string[], chave: string[]): string {
        const textoBinarioCodificado: string[] = [];
        for (let i = 0; i < textoCifrado.length; i++)
            textoBinarioCodificado.push(this.aplicarXOR(textoCifrado[i], chave[i]));
        return this.converterParaTexto(textoBinarioCodificado);
    }

    private aplicarXOR(charTexto: string, charChave: string): string {
        const charTextoArray = charTexto.split("");
        const charChaveArray = charChave.split("");
        let binarioConvertido = "";
        for (let i = 0; i < 8; i++) {
            if (parseInt(charTextoArray[i], 2) !== parseInt(charChaveArray[i], 2))
                binarioConvertido += "1";
            else
                binarioConvertido += "0";
        }
        return binarioConvertido;
    }

    private converterParaTexto(texto: string[]): string {
        const arrayASCII: number[] = texto.map((binario: string) => parseInt(binario, 2));
        return arrayASCII.map((charCode: number) => String.fromCharCode(charCode)).join("");
    }
}