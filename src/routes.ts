import { greetingController } from '@src/controllers/greeting.controller';
import express from 'express';

export default (app: express.Application) => {
    app.route('/greeting').get(greetingController.getGreeting);
};
