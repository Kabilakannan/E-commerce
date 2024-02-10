import React from 'react'
import {Navbar,Container,FormControl, Badge,Dropdown,Nav, Button} from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { CartState } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai'
import "./style.css"
function Header() {
  const {state:{cart},dispatch,productDispatch,}=CartState();
  return (
   <Navbar bg="dark" variant='dark' style={{height:"80px"}}>
      <Container>
         <Navbar.Brand>
            <Link to="/">Shopping Cart</Link>
         </Navbar.Brand>
         <Navbar.Text>
           <FormControl style={{width:500}} placeholder="search a product"  onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}/>
         </Navbar.Text>
       <Nav>
        <Dropdown alignRight>
          <Dropdown.Toggle variant="success">
            <FaShoppingCart/>
           <Badge>{cart.length}</Badge>
          </Dropdown.Toggle>

        <Dropdown.Menu style={{minwidth:370}}>
          {cart.length>0?(
            <>
            {
              cart.map(prod=>(
                <span className="carditem" key={prod.id}>
                  <img src={prod.image} alt={prod.name} className="cardImg"/>
                  <div className="cardDetails">
                      <span>{prod.name}</span>
                      <span>${prod.price.split(".")[0]}</span>
                  </div>
                  <AiFillDelete
                  fontSize="20px"
                  onClick={()=>{
                    dispatch({
                      type:"REMOVE_TO_CART",
                      payload:prod
                    })
                  }}/>
                </span>
              ))
            }
            </>
          ):(<span style={{padding:10}}>Cart is Empty</span>)}
        <Link to="/cart">
          <Button style={{width:"95%",margin:"0 10px"}}>
            Go to Cart
          </Button>
        </Link>
        </Dropdown.Menu>
      </Dropdown>
      </Nav>
      </Container>
   </Navbar>
  )
}

export default Header
