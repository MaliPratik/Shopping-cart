import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Cart() {

  let navigate = useNavigate();

  let [cartproducts, setCartproducts] = useState([]);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("cartproducts") != null) {
      setCartproducts(JSON.parse(localStorage.getItem("cartproducts")));
    }
    else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let alltotal = 0;

    cartproducts.forEach(product => {
      alltotal += product.quantity * product.price;
    });
    setTotal(alltotal);

    // let myproducts = products.filter((product, i) => {
    //   return product.quantity > 0;
    // });
    // setOrder({ ...order, products: myproducts, amount: alltotal });
  }, [cartproducts]);

 
  return (
    <div className='row '>
      <div className='row mt-3 p-2 bg-white'>
                <div className='col-lg-10 '>
                    <h4 className=''>Checkout<i className="fa-solid fa-arrow-right"></i> </h4>
                </div>    
                <div className="col-lg-2 text-end">
                    <Link to={'/order'}><button className='btn btn-warning shadow text-white rounded'>
                    <h4>Order</h4>
                    </button></Link>
                </div>
            </div>
            <hr />
      <div className='col-lg-12 bg-white p-3 shadow-1'>
        <table className="table rounded">
          <thead>
            <tr  className='text-center '>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              cartproducts.map((product, i) => (
                <tr>
                <td  className='text-center '><img src={product.image} width={100} height={100}/></td>
                  <td  className='text-center '>{product.price}</td>
                  <th  className='text-center '>{product.quantity}</th>
                  <td  className='text-center '>${product.price * product.quantity}</td>
                </tr>
              ))
            }
          </tbody>
          
          <tfoot>
            <tr>
              <td className='text-end ' colSpan={3}><b>All Total Price : </b></td>
              <td className='text-center'><b>${total.toFixed(2)}</b></td>
            </tr>
            </tfoot>
        </table >  
        
      </div >
    </div >
  )
}

export default Cart
