const { server, app } = require('./app');
import { myDataSource } from './src/app-data-source';
import { createDatabase, createTables } from './script';
require('./script');
createDatabase().then(() => {
    createTables().then(() => {

        myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })
        
        server.listen(app.get('port'), () => {
            console.log(`Server is running on port ${app.get('port')}`);
        })
    });
});