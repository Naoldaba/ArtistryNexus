import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ArtistryNexus',
            version: '1.0.0',
            description: 'This API contains endpoints for ArtistryNexus, a web app for Artists to showcase their work',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5050}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
export default specs;
