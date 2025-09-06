import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array('images'), authSeller, addProduct); // add product
productRouter.get('/list', productList); // get all products
productRouter.get('/id', productById); // get single product
productRouter.post('/stock', authSeller, changeStock); // change


export default productRouter;