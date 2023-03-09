import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react'

function Products() {
    let [products, setProducts] = useState([]);
    let [quantitytotal, setQuantityTotal] = useState(0);

    function increaseQuantity(e, id) {
        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {

                product.quantity += 1;
            }
            return product;
        })
        setProducts(myproducts);
        //console.log(products.category, products.price);
    }

    function decreaseQuantity(e, id) {
        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {
                if (product.quantity > 0)
                    product.quantity -= 1;
            }
            return product;
        })
        setProducts(myproducts);
    }

    useEffect((e) => {
        axios.get("https://fakestoreapi.com/products").then((response) => {
            // console.log(response.data);
            let myproducts = response.data.map((product, i) => {
                return { ...product, quantity: 0 }
            });
            setProducts(myproducts);
        }, (err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        let allquantity = 0;

        products.forEach(product => {
            allquantity += product.quantity
        });
        setQuantityTotal(allquantity);

        let cartproducts = products.filter((product, i) => {
            if (product.quantity > 0)
                return product;
        });
      
        localStorage.setItem("cartproducts", JSON.stringify(cartproducts));
        // console.log(allquantity);
    }, [products]);


    return (
        <div className='row'>
            <div className='row mt-3 bg-dark p-2'>
                <div className='col-lg-10 '>
                    <h4 className=' text-white'>Continue Shopping<i className="fa-solid fa-arrow-right"></i> </h4>
                </div>    
                <div className="col-lg-2 text-end">
                    <Link to={'/cart'}><button className='text-end bg-dark text-white rounded'>
                    <h2><i className="fa fa-shopping-cart height-200px float-right" aria-hidden="true">{quantitytotal}</i></h2>
                    </button></Link>
                </div>
            </div>
            <hr />

            <div className='col-lg-12 d-flex flex-wrap'>
                {
                    products.map((product, i) => (
                        <div className='col-lg-4' key={i}>
                            <div className="card m-2" >
                                <div className="card-body">
                                    {/* <span>{product.id}</span> */}
                                    <h5 className="card-title">{product.category}</h5>
                                    <div className='text-center' ><img src={product.image} width={100} height={100}></img></div>
                                    <div className='row mt-2'>
                                        <h6 className="col-lg-3 card-text text-start">${product.price}</h6>

                                        <div className='col-lg-6 text-center'>
                                            <button className='btn btn-warning' onClick={(e) => { decreaseQuantity(e, product.id) }}>-</button>
                                            <span>&nbsp;&nbsp;&nbsp; {product.quantity}  &nbsp;&nbsp;</span>
                                            <button className='btn btn-warning' onClick={(e) => { increaseQuantity(e, product.id) }}>+</button>
                                        </div>
                                        <h6 className="col-lg-3 card-text text-end">${product.price * product.quantity}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Products;
