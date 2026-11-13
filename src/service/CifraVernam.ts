export class CifraVernam {
    public cifrar(textoClaro: string, chave: string): string {
        this.validar(textoClaro, chave);
        return this.aplicarCifraVernam(textoClaro, chave);
    }

    private validar(textoClaro: string, chave: string): void{
        this.validarChave(textoClaro, chave);
        this.mensagemChaveVazia(textoClaro,chave);
    }

    private validarChave(textoClaro: string, chave: string): void {
        if(textoClaro.length > chave.length) {
            throw new Error("A chave deve ser do mesmo tamanho da mensagem ou maior");
        }
    }

    private mensagemChaveVazia(textoClaro: string, chave: string): void {
        if(textoClaro == "" || chave == ""){
            throw new Error("Mensagem ou Chave vazia, preencha corretamente");
        }
    }

    private aplicarCifraVernam(textoClaro: string, chave: string): string {
        const textoClaroBinario: string[] = this.converterParaArrayBinario(textoClaro);
        const chaveBinario: string[] = this.converterParaArrayBinario(chave);
        const textoCifradoBinario: string[] = this.codificar(textoClaroBinario, chaveBinario)
        return this.converterParaTexto(textoCifradoBinario);
    } 

    private converterParaArrayBinario(texto: string): string[] {
        const arrayBinario: number[] = texto.split('').map((char: string) => char.charCodeAt().toString(2).padStart(8 , '0'));
        return arrayBinario;
    }

    private codificar(textoClaro: string[], chave: string[]): string[]{
        const textoBinarioCodificado: string[] = [];
        for(let i = 0; i < textoClaro.length; i++)
            textoBinarioCodificado.push(this.aplicarXOR(textoClaro[i], chave[i]));
        return textoBinarioCodificado;
    }

    private aplicarXOR(charTexto: string, charChave: string): string {
        const charTextoArray = charTexto.split("");
        const charChaveArray = charChave.split("");
        let binarioConvertido = "";
        for(let i = 0; i < 8; i++){
            if(parseInt(charTextoArray[i],2) !== parseInt(charChaveArray[i],2))
                binarioConvertido += "1";
            else
                binarioConvertido += "0";
        }
        return binarioConvertido;
    }

    private converterParaTexto(texto: string[]): number[] {
        const arrayASCII: number[] = texto.map((binario: string) => parseInt(binario, 2));
        const textoConvertido: string = arrayASCII.map((charCode: number) => String.fromCodePoint(charCode)).toString();
        return textoConvertido.replaceAll(",", "");
    }
}