import express from 'express';

import UsersRouter from './users.router';
import RoomsRouter from './rooms.router';
import InfoRouter from './info.router';

const endpoints = {
    baseApi: '/api',
    users: '/users',
    rooms: '/rooms',
    info: '/info'
}

function routerApi(app: any){
    const router = express.Router();
    app.use(endpoints.baseApi, router);
    router.use(endpoints.users, UsersRouter);
    router.use(endpoints.rooms, RoomsRouter);
    router.use(endpoints.info, InfoRouter);
}

module.exports = {routerApi, endpoints};