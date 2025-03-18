import { Express } from 'express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: Options = {
    definition: {
        openapi: '3.1.1',
        info: {
            title: 'Lexis API',
            version: '1.0.0',
            description: 'Documentação da API do Sistema de Gerenciamento de Bibliotecas Lexis',
        },
        servers: [
            {
                url: 'https://lexis-backend.onrender.com/api',
                description: 'Servidor de Produção',
            },
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor de Desenvolvimento',
            },
        ],
    },
    apis: [
        './src/routes/*.ts',
        './src/models/*.ts',
        './src/controllers/*.ts',
    ],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(specs);
    });
};

export default setupSwagger;
