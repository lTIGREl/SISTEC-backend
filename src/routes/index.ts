import express from 'express';

import UsersRouter from './users.router';
import RoomsRouter from './rooms.router';

const endpoints = {
    baseApi: '/api',
    users: '/users',
    rooms: '/rooms'
}

function routerApi(app: any){
    const router = express.Router();
    app.use(endpoints.baseApi, router);
    router.use(endpoints.users, UsersRouter);
    router.use(endpoints.rooms, RoomsRouter);
}

module.exports = {routerApi, endpoints};