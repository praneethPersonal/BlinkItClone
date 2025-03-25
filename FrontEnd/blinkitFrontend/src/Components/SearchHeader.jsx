import React,{useState} from "react";
import logo from "../Components/Photos/download.png"
import searchLogo from "../Components/Photos/searchLogo.png"
import CartImage from "../Components/Photos/newCart.png"
import { LogoDivImg,LogoDiv ,CartImg,CartDiv,SearchPageSearchBar,SearchBarDemoAround,SearchImg,Cart} from "./StyledComponents/HeaderStyledComponents";
import {
  CustomHeader
} from "./StyledComponents/HeaderStyledComponents";
import { Link } from "react-router-dom";
import { CartSideBar } from "./Cart";

function SearchHeader({setSearchedValue,isLoggedIn, setShowLoginDialog,setIsLoggedIn}){

  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleSearchChange = (e) => {
    setSearchedValue(e.target.value); 
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CustomHeader>
      <Link to="/">
      <LogoDiv>
        <LogoDivImg src={logo} alt="Logo" />
      </LogoDiv>
      </Link>
      

      <SearchBarDemoAround>
        <SearchImg src = {searchLogo} alt="lens"/>
        <SearchPageSearchBar type="text" placeholder="Search 'Apple'" onChange={handleSearchChange} />
      </SearchBarDemoAround>

      <CartDiv>
        <CartImg src={CartImage} alt = "CartImage" />
        <Cart onClick={toggleCart}>My Cart</Cart>
        </CartDiv>
        <CartSideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn}/>
    </CustomHeader>
  );
};

export default SearchHeader;
