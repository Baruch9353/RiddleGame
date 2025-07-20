import riddlesRouter from './riddlesR.js';
import playersRouter from './playersR.js';

export default function configRoutes(app) {
    app.use('/riddles', riddlesRouter); 
    app.use('/players', playersRouter);
};

