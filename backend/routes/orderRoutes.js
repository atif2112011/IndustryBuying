const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/Auth');
const { getUserOrders, createOrder, getOrderById, updateOrderStatus, deleteOrder, uploadInvoiceDirect, getAllOrders, updateOrder, getUserInvoices } = require('../controllers/orderController');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() });


router.post(
  '/:id/invoice-upload',authMiddleware,
  upload.single('invoice'), // upload via multer to get req.file.buffer
  uploadInvoiceDirect
);
router.get("/all",getAllOrders)
router.get('/',authMiddleware,getUserOrders);
router.get('/invoice',authMiddleware,getUserInvoices)

router.post("/",authMiddleware,createOrder);


router.get("/:id",authMiddleware,getOrderById)
router.put("/:id",upload.single('invoice'),updateOrder)

router.delete("/:id",authMiddleware,deleteOrder)



module.exports = router;