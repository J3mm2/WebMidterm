import { mongo } from './services/db.js';
import topicRoutes from './routes/event.js';
import historyRoutes from './routes/history.js';

const app = express();
const { connecting } = db;
const topicroutes = topicRoutes;
const historyroutes = historyRoutes;

app.use(express.json());

connecting().then(() => {
    app.use('/users', topicroutes);
    app.use('/history', historyroutes);

    // establishes connection to server through port 8800
    app.listen(8800, () => {
        console.log('Server running on port 8800');
    });
});