import riddlesRouter from './riddlesR.js';

export default function configRoutes(app) {
    app.use('/riddles', riddlesRouter); 
};

