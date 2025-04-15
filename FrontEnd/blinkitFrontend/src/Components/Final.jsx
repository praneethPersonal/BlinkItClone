import React,{useEffect,useState} from "react";
import logo from "../Components/Photos/download.png";
import { CustomHeader,LogoDivImg } from "./StyledComponents/HeaderStyledComponents";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import OrderPic from "./Photos/orderpage.jpg"
import {EachItem,OrderPicImg,FinalPageContainer,ThankYouMessage,CartItemsContainer,ItemName,ItemQuantity,ItemPrice,TotalItemPrice,TotalPriceContainer} from "./StyledComponents/FinalPageStyledCOmponents"

export function FinalPage(){

    const [cartItems, setCartItems] = useState([]);
    const [currentAddress, setCurrentAddress] = useState('');

  useEffect(() => {
    // Retrieve currentAddress from localStorage when the component mounts
    const address = localStorage.getItem('currentAddress');
    if (address) {
      setCurrentAddress(address);
    }
  }, []);
    const fetchData = async () => {
        const response = await fetch("http://localhost:5017/api/blinkit/Product/products");
        const data = await response.json();  
        return data;
    };
    const { isLoading:loadingForProds, isError:errorForProds, data:dataForProds } = useQuery({ queryKey: ["fetchingfrombackendForProdsInSearchBar"], queryFn:fetchData});


    // Fetch cart items from localStorage (or API)
    useEffect(() => {
      // Assuming the cart items are stored in localStorage
      const storedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
      setCartItems(storedCart);
    }, []);
  
    // Calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
          const product = dataForProds.find((prod) => prod.product_name === cartItem.product_name);
          return product ? total + product.price * cartItem.quantity : total;
        }, 0);
      };

    if (loadingForProds){
        return "Wait Its Loading!!!"
    }

    const mergedCartItems = cartItems.map((cartItem) => {
      const product = dataForProds.find((prod) => prod.product_name === cartItem.product_name);
        if (product) {
          return {
            ...product,   // Spread the product details (name, price)
            quantity: cartItem.quantity,  // Add the quantity from cartItem
          };
        }
        return null; // In case no matching product is found (for safety)
      }).filter(item => item ); // Filter out any null values
      console.log(dataForProds)

      
      const handleUpdateStockOnLogout = async () => {
        // Retrieve cart items from localStorage
     
      
        // Loop through cart items and update stock
        for (const item of cartItems) {
          const product = dataForProds.find((prod) => prod.product_name === item.product_name); // Find the product by ID
          if (product) {
            const newStock = product.stock - item.quantity; // Calculate new stock
      
            // Make POST request to update stock
            try {
              const response = await fetch("https://localhost:7081/api/BlinkIt/updateStock", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productName: item.product_name,
                  newStock: Math.max(newStock, 0) // Ensure newStock is not negative
                }),
              });
      
              if (!response.ok) {
                throw new Error(`Failed to update stock for ${item.productId}`);
              }
              console.log(`Stock updated for product ${item.productId}`);
            } catch (error) {
              console.error("Error updating stock:", error);
            }
          }
        }
      
        // Clear cart from localStorage
        localStorage.removeItem('cartProducts');
      };

return(
    <>
    <CustomHeader>
        <Link to="/" onClick={handleUpdateStockOnLogout}>
        <div>
          <LogoDivImg src={logo} alt="Logo" />
        </div>
      </Link>
    </CustomHeader>
     <FinalPageContainer>
     <ThankYouMessage>Thanks for shopping with BlinkIt!</ThankYouMessage>
     {currentAddress && (
        <p>Delivering to: {currentAddress}</p>
      )}
     
     <CartItemsContainer>
  
        {mergedCartItems.map((item, index) => (
            <EachItem key={index}>
            <OrderPicImg src={OrderPic} alt="order" />

              <ItemName>{item.product_name}</ItemName>
              <ItemQuantity>Quantity: {item.quantity}</ItemQuantity>
              <ItemPrice>Price: ₹{item.price}</ItemPrice>
              <TotalItemPrice>Total: ₹{item.price * item.quantity}</TotalItemPrice>
            </EachItem>
          ))}
          <TotalPriceContainer>
          Total Price: ₹{calculateTotalPrice()}
        </TotalPriceContainer>
      </CartItemsContainer>
    </FinalPageContainer>
    </>
    
)

}