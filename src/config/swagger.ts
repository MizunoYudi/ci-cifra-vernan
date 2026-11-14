export const swaggerConfig = {
    swaggerDefinition: {
        openapi: '3.2.1',
        info: {
            title: 'API Cifra de Vernan',
            version: '1.0.0',
            description: 'API para criptografar e Decriptografar mensagens por meio da cifra de Vernan',
        },
    },
    apis: ['./src/routes/*.ts'],
}