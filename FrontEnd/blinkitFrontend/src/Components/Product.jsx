import React from "react";
import HomeHeader from "./HomeHeader";
import milkPacket from "../Components/TempComponents/8f2eb870-8e57-43f2-b770-e23a2d9a2163.jpg"
import { useParams,Link } from "react-router-dom";
import fifteenMins from "./Photos/15-mins.jpg"
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { AddToCart, AddToCartNumber,AddToCartDiv,InitialAddToCart} from "./StyledComponents/BodyStyledComponents";
import {BodyDiv,LeftDiv,WhySHopFromBlinkit,WhyBlinkItDesc,CartDivButton,WhyBlinkitImg,WhyBlinkItDiv,ProductDetailsDiv,InclusiveOfAllTaxes,ProductPrice,DeliveryTimeStaticp,ProductUnit,Delivery15mins,ProductName,DeliveryStaticTime,Slash,RoutingElementLast,RoutingElements,ReRoutingDiv,ProductImage,LeftDivBottom,RightDiv,LeftDIvH2,LeftDivP} from "./StyledComponents/ProductStyledComponents"
import tenmindel from "./Photos/ProductPagePics/10_minute_delivery.jpg"
import bestPrices from "./Photos/ProductPagePics/Best_Prices_Offers.jpg"
import wideAssortment from "./Photos/ProductPagePics/Wide_Assortment.jpg"
import { Footer } from "./Footer";

export function Product({isLoggedIn,setShowLoginDialog,setIsLoggedIn,showLoginDialog}){
    const {productName}= useParams();
   
    const queryClient = useQueryClient();
   
    console.log(productName,"name")
    const fetchData1 = async () => {
        const response = await fetch("http://localhost:5017/api/blinkit/Category/category");
        const data = await response.json();  
        return data;
    };

    const { isLoading:loadingForCat, isError:errorForCat, data:dataForCats } = useQuery({
         queryKey: ["fetchingfrombackendForCats"], 
         queryFn: fetchData1 
    });

    const fetchProduct = async (productName) => {
        const response = await fetch(
          `https://localhost:7081/api/BlinkIt/product?productName=${productName}`
        
        );
      
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        
        return response.json();
      };
      

      const { data: CurrentProduct,isLoading:LoadingForCurrProduct } = useQuery({
        queryKey: ["product", productName],
        queryFn: () => fetchProduct(productName), 
      
      });;



      const fetchDataForCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
        return storedCart;
    };
    
          
        const { isLoading: loadingForCart, data: dataForCart } = useQuery({
            queryKey: ["fetchingfrombackendForCart"],
            queryFn: fetchDataForCart,
        });


       const handleAddToCart = (product) => {
          
          const storedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
          
          const existingProduct = storedCart.find(item => item.product_name === product.product_name);
          
          let updatedCart;
          if (existingProduct) {
              updatedCart = storedCart.map(item => 
                  item.product_name === product.product_name ? { ...item, quantity: item.quantity + 1 } : item
              );
          } else {
              updatedCart = [...storedCart, { product_name: product.product_name, quantity: 1 }];
          }
          
          localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
          queryClient.invalidateQueries(["fetchingfrombackendForCart"]);   
      };
      
      const handleRemoveFromCart = (product) => {
          const storedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
  
          const existingProduct = storedCart.find(item => item.product_name === product.product_name);
          
          let updatedCart;
  
          if (existingProduct && existingProduct.quantity > 1) {
              updatedCart = storedCart.map(item => 
                  item.product_name === product.product_name ? { ...item, quantity: item.quantity - 1 } : item
              );
          } else {
              updatedCart = storedCart.filter(item => item.product_name !== product.product_name);
          }
          localStorage.setItem('cartProducts', JSON.stringify(updatedCart));
          queryClient.invalidateQueries(["fetchingfrombackendForCart"]);
          
      };


    if (loadingForCart || loadingForCat || LoadingForCurrProduct){
        return("Wait!! its Loading");
    }


    const getProductQuantity = (productId) => {
        const productInCart = dataForCart?.find(item => item.product_name === productId);
        return productInCart ? productInCart.quantity : 0;
    };

    console.log(CurrentProduct,5000)
    
    const matchingCategory = dataForCats &&  dataForCats.find(cat => cat._id === CurrentProduct.category_id);
    CurrentProduct.category_name = matchingCategory.category_name;
    

    return(
        <>
        <HomeHeader isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog}/> 
        <BodyDiv>
            <div>
            <LeftDiv>
            {CurrentProduct.photo_url != null ? (<ProductImage src={`data:image/jpeg;base64,${CurrentProduct.photo_url}`} alt="Image" />) : (

<ProductImage src={milkPacket} alt="productImage" />
)}
            </LeftDiv>

            <LeftDivBottom>
                <LeftDIvH2>Product Details</LeftDIvH2>
                <LeftDivP>{CurrentProduct.product_name}</LeftDivP>
                <h3>Unit</h3>
                <p>{CurrentProduct.unit}</p>
                <h3>Key Features</h3>
                <LeftDivP>Helps in digestion.</LeftDivP>
                    <LeftDivP>Improves your immunity.</LeftDivP>
                    <LeftDivP>Makes your bones strong.</LeftDivP>
                    <LeftDivP>Prevents premature wrinkle on skin.</LeftDivP>
                <h3>FSSAI License</h3>
                <LeftDivP>10014042001375</LeftDivP>
                <h3>Shelf Life</h3>
                <LeftDivP>15 days</LeftDivP>
                <h3>Manufacturer Details</h3>
                <LeftDivP>Hatsun Agro Product Ltd., Salem, Tamil Nadu - 636 106Hatsun Agro Product Ltd., Salem, Tamil Nadu - 636 106</LeftDivP>
                <h3>Marketed By</h3>
                <LeftDivP>Hatsun Agro Product Ltd. No. 14, TNHB 'A' Road, Sholinganallur, Chennai, Tamil Nadu - 600 119.Hatsun Agro Product Ltd. No. 14, TNHB 'A' Road, Sholinganallur, Chennai, Tamil Nadu - 600 119.</LeftDivP>
            </LeftDivBottom>
            </div>

            <RightDiv>
                <ReRoutingDiv>
                    <Link to="/" style={{ textDecoration: 'none',color: 'black' }} >
                    <RoutingElements>Home</RoutingElements>
                    </Link>
                    <Slash>/</Slash>
                    <Link to={`/category/${CurrentProduct.category_name}`} style={{ textDecoration: 'none',color: 'black' }} >
                    <RoutingElements>{CurrentProduct.category_name}</RoutingElements>
                    </Link>
                    <Slash>/</Slash>

                    <RoutingElementLast>{CurrentProduct.product_name}</RoutingElementLast>
                </ReRoutingDiv>
                
                <ProductName>{CurrentProduct.product_name}</ProductName>
                <DeliveryStaticTime>
                <Delivery15mins src={fifteenMins} />
                <DeliveryTimeStaticp>8MINS</DeliveryTimeStaticp>
                </DeliveryStaticTime>
                <hr></hr>
                <ProductDetailsDiv>
                    <div>
                        <ProductUnit>One {CurrentProduct.unit}</ProductUnit>
                        <ProductPrice>MRP ₹{CurrentProduct.price}</ProductPrice>
                        <InclusiveOfAllTaxes>{"(Inclusive of all taxes)"}</InclusiveOfAllTaxes>
                    </div>
                    <CartDivButton>
                    {CurrentProduct.stock <= getProductQuantity(CurrentProduct.product_name) && (
      <p style={{ color: 'red' }}>Stock Over</p>
    )}
                        <AddToCartDiv>    
                        {getProductQuantity(CurrentProduct.product_name) === 0 ? (
                        <InitialAddToCart
                          type="button"
                          onClick={() => handleAddToCart(CurrentProduct)}
                          value="Add"
                        />
                      ) : (
                        <>
                          <AddToCart
                            type="button"
                            onClick={() => handleRemoveFromCart(CurrentProduct)}
                            value="-"
                          />
                          <AddToCartNumber>
                            {getProductQuantity(CurrentProduct.product_name)}
                          </AddToCartNumber>
                          <AddToCart type="button" value="+" />
                        </>
                      )}
                        </AddToCartDiv>
                    </CartDivButton>
                </ProductDetailsDiv>

                <div>
                    <WhySHopFromBlinkit>Why shop from blinkit?</WhySHopFromBlinkit>
                    
                    <WhyBlinkItDiv>
                           
                            <WhyBlinkitImg src={tenmindel}  alt="10mindelivery" />
                           
                        <WhyBlinkItDesc>
                            <ProductUnit>Superfast Delivery</ProductUnit>
                            <InclusiveOfAllTaxes>Get your order delivered to your doorstep at the earliest from dark stores near you.</InclusiveOfAllTaxes>
                        </WhyBlinkItDesc>
                    </WhyBlinkItDiv>
                    <WhyBlinkItDiv>
                    
                                <WhyBlinkitImg src={bestPrices}  alt="10mindelivery" />
                    
                        <WhyBlinkItDesc>
                        <ProductUnit>Best Prices & Offers</ProductUnit>
                        <InclusiveOfAllTaxes>Best price destination with offers directly from the manufacturers.</InclusiveOfAllTaxes>
                        </WhyBlinkItDesc>
                    </WhyBlinkItDiv>
                    <WhyBlinkItDiv>
                        
                            <WhyBlinkitImg src={wideAssortment}  alt="10mindelivery" />
                        
                        <WhyBlinkItDesc>
                            <ProductUnit>Wide Assortment</ProductUnit>
                            <InclusiveOfAllTaxes>Choose from 5000+ products across food, personal care, household & other categories.</InclusiveOfAllTaxes>
                        </WhyBlinkItDesc>
                    </WhyBlinkItDiv>
                </div>
            </RightDiv>
        </BodyDiv>
        <Footer />
        </>
    )
}