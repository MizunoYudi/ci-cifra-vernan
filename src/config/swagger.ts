export const swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.2.1',
        info: {
            title: 'API Cifra de Vernan',
            version: '0.0.1',
            description: 'API para criptografar e Decriptografar mensagens por meio da cifra de Vernan',
        },
    },
    apis: ['./src/routes/*.ts'],
}