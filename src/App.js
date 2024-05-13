
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Payment from './Components/Payment';

function App() {
  return (
     <BrowserRouter>
     <Header/>
     <div>
      <Routes>
       <Route path="/" exact element={<Home />} />
       <Route path="/cart" element={<Cart/>} />
       <Route path="/Payment" elemnt={<Payment/>} />
       </Routes>
     </div>
     </BrowserRouter>
    
  );
}

export default App;
