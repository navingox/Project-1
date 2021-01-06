const router = require('express').Router();
const pool = require('../../config/database');

router.get('/', (req, res) => {   
    const orderlastusername = "navin@gmail.com";
    const orderGetItemQuery = `select * from products where imageId IN (select orderProductId from orders where username = '${orderlastusername}')`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(orderGetItemQuery, (err, result) => {

            if (err) { console.log(err); }

            if ((result.length > 0)) {
                res.status(200).json({
                    data: result
                })
            } else {
                res.status(200).json({ "data": "NoOrders" });
            }
            connection.release();
        })
    })
})



router.post('/addToCart', (req, res) => {   

    const {orderImageId}=req.body.orderData;

    const orderAddToCartlastusername = "navin@gmail.com";
    const orderItemQuery = `insert into orders values ('${orderAddToCartlastusername}','${orderImageId}')`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(orderItemQuery, (err, result) => {

            if (err) { console.log(err); }

            res.status(200).json({
                data: "Added To Cart"
            })
            connection.release();
        })
    })
})


router.delete('/deleteItems/:id', (req, res) => {   

    const deleteProductId=req.params.id;
    
    const orderAddToCartlastusername = "navin@gmail.com";
    const deleteItemQuery = `delete from  orders where orderProductId =' ${deleteProductId}' and username= '${orderAddToCartlastusername}'`;

    pool.getConnection((err, connection) => {
        if (err) console.log(err);
        connection.query(deleteItemQuery, (err, result) => {

            if (err) { console.log(err); }

            res.status(200).json({
                data: "Product Removed"
            })
            connection.release();
        })
    })
})

module.exports = router;