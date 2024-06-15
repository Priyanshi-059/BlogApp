import express from 'express';
import { signup , signin, google} from '../controllers/auth.controller.js';

const router = express.Router();


// this is just to post the request
router.post('/signup',signup);

router.post('/signin',signin);

router.post('/google', google)

export default router;