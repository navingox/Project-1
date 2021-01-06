import React, { useState, useEffect ,useContext} from 'react'
import Bottombar from './Bottombar';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CartContext } from '../context/CartContext';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
});

const Cart = () => {
    const classes = useStyles();
    const [orderedProducts, SetorderedProducts] = useState([]);
    const [refreshCart,SetrefreshCart]=useState("change");
    
      const[Item,setItem] = useContext(CartContext);


    const Prices=orderedProducts.map(o=>{
        return parseInt(o.price);
    }).reduce(function(total, amount){
        return total + amount;
      },0);

     

    useEffect(() => {
        getOrderProducts();
        
    }, [refreshCart]);

    const getOrderProducts = async () => {
        await Axios.get("http://localhost:8000/orders").then(res => {
            console.log(res.data.data);
            SetorderedProducts(res.data.data);
            setItem(res.data.data.length);
        })
        
    }
 
    const handleDeleteCart=async (deleteImageId)=>{
          await Axios.delete(`http://localhost:8000/orders/deleteItems/${deleteImageId}`).then(res=>{
               console.log(res.data);
               SetrefreshCart("refreshthecart");
               setItem(orderedProducts.length);
           })        
    }
   
    return (
        <div>
            <h1>Cart Page</h1>
            <h4>Items in Cart</h4>
            <div className="container p-2">
                <div className="row ">
                    <div className="col text-center">
                        {
                          refreshCart&& orderedProducts.map((order,index) => (
                                <div key={index} className="cartComponent">
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt={order.productName}
                                                height="100%"
                                                image={order.productImagePath}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {order.productName}
                                                </Typography>
                                                {/* <Typography variant="body2" color="textSecondary" component="p">
                                                 
                                                </Typography> */}
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary">
                                                Price: ${order.price}
                                            </Button>
                                            <Button size="small"   style={{color:"red"}} onClick={()=>handleDeleteCart(order.imageId)}>
                                                  Remove
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <h1 className="btn btn-success rounded-pill p-2 mt-5">TotalPrice : ${Prices}</h1>
                <div className="cartTotal" >
                </div>
            </div>
            <Bottombar />
        </div>
        
    );
}

export default Cart;
