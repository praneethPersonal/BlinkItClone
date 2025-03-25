import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "./Home";
import { Search } from "./Search";
import { CategoryPage } from "./CategoryPage";
import { Product } from './Product';
import { ProfilePage } from './Profile';
import { FinalPage } from './Final';
import { SellerPersona } from './Seller';
import { useState } from 'react';
export function BlinkItRouter(){

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showLoginDialog, setShowLoginDialog] = useState(false);

    return(
        <Router>
            <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog}/>} />
         <Route path="/search" element={<Search isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog} />} />
         <Route path="/category/:categoryName" element={<CategoryPage isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog} />} />
         <Route path = "/:productName" element={<Product isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog} />} />
         <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog}/>} />  
         <Route path = "/final" element={<FinalPage />}      />
         <Route path="/seller" element= {<SellerPersona />} />
        </Routes>
    </Router>
    )
}