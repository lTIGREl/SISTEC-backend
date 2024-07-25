import { createConnection } from 'typeorm';
const { server, app } = require('./app');

createConnection().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log('Occurs', error);
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});