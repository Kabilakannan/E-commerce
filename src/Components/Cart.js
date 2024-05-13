import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Button, Col, Image, ListGroup, Row,Form} from 'react-bootstrap';
import Rating1 from './Rating1';
import { AiFillDelete } from 'react-icons/ai';
import {Link} from 'react-router-dom'
function Cart() {
  const {state:{cart},dispatch}=CartState();
  const[total,setTotal]=useState();

  useEffect(()=>{
    setTotal(cart.reduce((acc,curr)=>acc+Number(curr.price)*curr.qty,0))
  },
    [cart])

  return (
  <div className="home"> 
        <div className="productContainer">
          <ListGroup>
             {cart.map(prod=>(
                <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col md={2}>
                       <Image src={prod.image} fluid rounded></Image>
                    </Col>
                    <Col md={2}>
                       <span>{prod.name}</span>
                    </Col>
                    <Col md={2}>${Number(prod.price)/80}</Col>
                    <Col md={2}>
                       <Rating1 rating={prod.ratings}/>
                    </Col>
                    <Col md={2}>
                      <Form.Control as="select" value={prod.qty} 
                      onChange={(e)=>(
                        dispatch({
                          type:"CHANGE_CART_QTY",
                          payload:{
                            id:prod.id,
                            qty: e.target.value
                          }
                        })
                      )}>
                           {[...Array(prod.inStock).keys()].map((x)=>{
                            return <option key={x+1}>{x+1}</option>
                           })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                       <Button type="button" variant="light" onClick={()=>(dispatch({type:"REMOVE_TO_CART",payload:prod}))}>
                        <AiFillDelete  fontSize="20px"/>
                       </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
             ))}
          </ListGroup>
        </div>
        <div className="filters summary">
            <span className="title">Subtotal ({cart.length}) Items</span>
            <span style={{fontWeight:700,fontSize:20}}>Total: $ {Number(total)/80}</span>
             <Link to="/Payemnt">
            <Button type="button" disable={cart.length===0}>
                 Proceed to pay
            </Button>
            </Link>
        </div>
  </div>
  )
}

export default Cart