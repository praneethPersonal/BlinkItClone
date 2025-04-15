import React, { useState } from "react";
import SearchHeader from "./SearchHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { EachProductDiv,ProductImageDiv,ProductImage,ProductName,ProductUnit,BottomDivInProduct,PriceDiv,AddToCartDiv,AddToCart,AddToCartNumber,DiscountBanner,InitialAddToCart,DiscountedPrice,OriginalPrice,DiscountPriceDiv } from "./StyledComponents/BodyStyledComponents";
import milkPacket from "../Components/TempComponents/8f2eb870-8e57-43f2-b770-e23a2d9a2163.jpg"
import { SearchBodyDiv,ToShowResults ,SearchedFor} from "./StyledComponents/SearchBodyStyled";
import { Link } from "react-router-dom";

export function Search({isLoggedIn, setShowLoginDialog,setIsLoggedIn,showLoginDialog}) {
    const queryClient = useQueryClient();
    const [searchedValue, setSearchedValue] = useState("");
    

    const fetchData = async () => {
        const response = await fetch("http://localhost:5017/api/blinkit/Product/products");
        const data = await response.json();  
        return data;
    };

    const { isLoading:loadingForProds, isError:errorForProds, data:dataForProds } = useQuery({ queryKey: ["fetchingfrombackendForProdsInSearchBar"], queryFn:fetchData});
    
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
          
          // Check if product already exists in the cart
          const existingProduct = storedCart.find(item => item.product_name === product.product_name);
          
          let updatedCart;
          if (existingProduct) {
              // If the product exists, increase its quantity
              updatedCart = storedCart.map(item => 
                  item.product_name === product.product_name ? { ...item, quantity: item.quantity + 1 } : item
              );
          } else {
              
              updatedCart = [...storedCart, { product_name: product.product_name, quantity: 1 }];
          }
          
          // Save the updated cart to localStorage
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
  

  const getProductQuantity = (productId) => {
    const productInCart = dataForCart?.find(item => item.product_name === productId);
    return productInCart ? productInCart.quantity : 0;
};
if(loadingForProds){
    return(
        <p>Wait!! Its Loading</p>
    )
}

    
    const SearchProducts = dataForProds && dataForProds.map(iter => {
            if ( searchedValue !== "" && iter.product_name.toLowerCase().includes(searchedValue.toLowerCase())){

                return (
                    <EachProductDiv key={iter._id}>
                    {getProductQuantity(iter.product_name) >= iter.stock ? (
                     <div style={{ position: 'relative', textAlign: 'center' }}>
                     {/* Stock Over indicator */}
                     <p style={{
       position: 'absolute',
       top: '20%', // Adjust this to position vertically
       left: '50%', // Center horizontally
       transform: 'translate(-50%, -50%) rotate(-45deg)', // Center and rotate
       backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
       color: '#D9D9D9',
       fontSize: '27px',
       padding: '10px',
       zIndex: 1, // Ensure it sits above other content
     }}>
       Stock Over
     </p>
                   
                     <ProductImageDiv>
                     {iter.photo_url != null ? (<ProductImage src={`data:image/jpeg;base64,${iter.photo_url}`} alt="Image" />) : (

<ProductImage src={milkPacket} alt="productImage" />
)}
                     </ProductImageDiv>
                   
                     <Link
                       to={`/${iter.product_name}`}
                       style={{ textDecoration: "none", color: "black" }}
                     >
                       <ProductName>{iter.product_name}</ProductName>
                     </Link>
                   
                     <ProductUnit>one {iter.unit}</ProductUnit>
                     
                     <BottomDivInProduct>
                       <PriceDiv>
                         <p>₹{iter.price}</p>
                       </PriceDiv>
                       <AddToCartDiv>
                         {getProductQuantity(iter.product_name) === 0 ? (
                           <InitialAddToCart
                             type="button"
                             onClick={() => handleAddToCart(iter)}
                             value="Add"
                           />
                         ) : (
                           <>
                             <AddToCart
                               type="button"
                               onClick={() => handleRemoveFromCart(iter)}
                               value="-"
                             />
                             <AddToCartNumber>
                               {getProductQuantity(iter.product_name)}
                             </AddToCartNumber>
                             <AddToCart type="button" value="+" />
                           </>
                         )}
                       </AddToCartDiv>
                     </BottomDivInProduct>
                   </div>
                    ) : (
                      <>
                        <ProductImageDiv>
                          {iter.discountedPrice !== null && (
                            <DiscountBanner>
                              {Math.round(
                                ((iter.price - iter.discountedPrice) / iter.price) *
                                  100
                              )}
                              % OFF
                            </DiscountBanner>
                          )}
                          {iter.photo_url != null ? (<ProductImage src={`data:image/jpeg;base64,${iter.photo_url}`} alt="Image" />) : (

<ProductImage src={milkPacket} alt="productImage" />
)}
                        </ProductImageDiv>
    
                        <Link
                          to={`/${iter.product_name}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <ProductName>{iter.product_name}</ProductName>
                        </Link>
                        <ProductUnit>one {iter.unit}</ProductUnit>
                        <BottomDivInProduct>
                          <PriceDiv>
                            {/* Check if discountedPrice is not null and show original price with strikethrough */}
                            {iter.discountedPrice !== null ? (
                              <DiscountPriceDiv>
                                <OriginalPrice>₹{iter.price}</OriginalPrice>
                                <DiscountedPrice>
                                  ₹{iter.discountedPrice}
                                </DiscountedPrice>
                              </DiscountPriceDiv>
                            ) : (
                              <p>₹{iter.price}</p> // Show original price when discountedPrice is null
                            )}
                          </PriceDiv>
                          <AddToCartDiv>
                            {getProductQuantity(iter.product_name) === 0 ? (
                              <InitialAddToCart
                                type="button"
                                onClick={() => handleAddToCart(iter)}
                                value="Add"
                              />
                            ) : (
                              <>
                                <AddToCart
                                  type="button"
                                  onClick={() => handleRemoveFromCart(iter)}
                                  value="-"
                                />
                                <AddToCartNumber>
                                  {getProductQuantity(iter.product_name)}
                                </AddToCartNumber>
                                <AddToCart
                                  type="button"
                                  onClick={() => handleAddToCart(iter)}
                                  value="+"
                                />
                              </>
                            )}
                          </AddToCartDiv>
                        </BottomDivInProduct>
                      </>
                    )}
                  </EachProductDiv>
                )
            }
    }).filter(it=>it)
    
   
  return (
    <>
      <SearchHeader setSearchedValue={setSearchedValue} isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog}  setIsLoggedIn={setIsLoggedIn}/>
        <ToShowResults>
            {searchedValue !== "" ? <SearchedFor>Showing results for "{searchedValue}"</SearchedFor>:""}
        </ToShowResults>

      <SearchBodyDiv>
      {SearchProducts}
      </SearchBodyDiv>
    </>
  );

}

