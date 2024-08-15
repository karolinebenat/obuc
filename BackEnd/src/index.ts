import * as dotenv from 'dotenv';
import { app } from './shared/app';
import router from './routes';
import { authMiddleware } from './middlewares/authenticate';

dotenv.config();

const port = process.env.PORT || 3333;

app.use(router);

app.get('/api/protected-route', authMiddleware, (req, res) => {
    res.json({ message: 'Você está autorizado!' });
});

app.listen(port, () => {
    console.log('Escutando a porta ' + port);
});