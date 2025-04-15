import React, { useEffect, useState } from "react";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import {
  CartHeaderDiv,
  CartHeading,
  CloseButton,
  CartContent,
  ProductDivInCart,
  DeliveryDiv,
  TimeImage,
  DeliveryTimeH3,
  DeliveryTimeP,
  ProductSubDivInCart,
  ProductImgInCart,FeedinIndiaHeading,
  ProductDetailsInCart,
  ProductDetailsP,
  AddProductDiv,
  ButtonToAddCart,
 
  BillingDiv,
  Billh4,
  EachDivInBilling,
  Billp,
  TotalBillDiv,
  FeedingIndiaDiv,
  FeedingIndiaImg,
  FeedingIndiaP,
  FeedingIndiaMoneyDiv,
  FeedingIndiaMoneyp,
  TipYourDeliveryPartnerDiv,
  TipHeading,
  KindnessP,
  AddTipContainer,
  AddTipDiv,
  AddTipImg,
  CheckOutDiv,LoginLast,
  FinalCheckOut,
  TotalPriceP,Savings,
  ProceedP,CartSavings,
  Overlay,
  Sidebar
} from "./StyledComponents/HeaderStyledComponents"; // importing required components
import FeedingImg from "../Components/Photos/feeding_india_icon_v6.jpg";
import TimePic from "../Components/Photos/15-mins-filled.png";
import emoji1 from "../Components/Photos/emojie1.jpg";
import emoji2 from "../Components/Photos/emoji2.jpg";
import emoji3 from "../Components/Photos/emoji3.png";
import emoji4 from "../Components/Photos/emoji4.jpg";
import milkPacket from "../Components/TempComponents/8f2eb870-8e57-43f2-b770-e23a2d9a2163.jpg";
import {
    AddToCart,
    AddToCartNumber,
  } from "./StyledComponents/BodyStyledComponents";
import { Link } from "react-router-dom";



export function CartSideBar({isCartOpen,setIsCartOpen,isLoggedIn, setShowLoginDialog,setIsLoggedIn}){
    const queryClient = useQueryClient();
    const [totalPrice, setTotalPrice] = useState(0);
  const [tipAmount, setTipAmount] = useState(0); 
  const [feedingIndiaContribution, setFeedingIndiaContribution] = useState(0);
  const [savings, setSavings] = useState(0);

  const getCartProductDetails = (cartData, productData) => {
    if (!cartData || !productData) {
        return [];
    }
    return cartData
        .map((cartItem) => {
            const matchedProduct = productData.find(
                (product) => product.product_name === cartItem.product_name
            );

            if (matchedProduct) {
                return {
                    ...matchedProduct,
                    quantity: cartItem.quantity,
                };
            }
            return null;
        })
        .filter((item) => item !== null);
};



  const userId = "temp";

  const fetchCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartProducts')) || [];
    return cartData;
};


  const useFetchCartData = () => {
    return useQuery({
      queryKey: ["cart"], // The query key should be unique, using 'cart' and userId
      queryFn: () => fetchCartData(), // Pass the function to fetch the data
    });
  };
  

  const { isLoading, isError, data, error } = useFetchCartData(userId);
  // const data = fetchCartData();

  const fetchData2 = async () => {
    const response = await fetch("http://localhost:5017/api/blinkit/Product/products");
    const data = await response.json();
    return data;
  };

  const { isLoading: loadingForProds, data: dataForProds } = useQuery({
    queryKey: ["fetchingfrombackendForProds"],
    queryFn: fetchData2,
  });


  const cartProducts = getCartProductDetails(data, dataForProds);
  console.log(cartProducts,10000)


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  useEffect(() => {
    calculateTotalPrice();
  }, [cartProducts, tipAmount, feedingIndiaContribution]);

  const calculateTotalPrice = () => {
    let discounts = cartProducts.reduce((sum, item) => {
      if (item.discountedPrice != null) {
        sum += Math.floor(item.price - item.discountedPrice); 
      }
      return sum; 
    }, 0);

    setSavings(discounts)
    let cartTotal = cartProducts.reduce(
      (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
      0
    );
    let deliveryCharge = 10;
    let handlingCharge = 5; 
    let grandTotal =
      cartTotal +
      deliveryCharge +
      handlingCharge +
      tipAmount +
      feedingIndiaContribution;
    setTotalPrice(grandTotal);
  };

  if (isLoading) {
    return "Wait its loading";
  }




  const handleProceed = async () => {
    // Retrieve the cart items from localStorage
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const cartItems = cartProducts.map(product => product.product_name);

    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const jwtToken = localStorage.getItem('jwtToken');

    if (!jwtToken) {
        alert("You are not logged in!");
        return;
    }


    try {
      // Validate the JWT token before proceeding
      const validateResponse = await fetch('https://localhost:5017/api/BlinkIt/validateToken', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
          }
      });

      console.log(cartItems,"cartItems")

      if (validateResponse.ok) {
          // If the token is valid, proceed with adding products
          const addProductsResponse = await fetch('https://localhost:5017/api/BlinkIt/user/addProducts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`
              },
              body: JSON.stringify({ products: cartItems }),
          });

          if (addProductsResponse.ok) {
              // alert("Products added successfully!");
              // Clear the cart
          } else {
              alert(`Failed to add products: ${data.message || "Please try again."}`);
          }
      } else {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem('jwtToken');
          setIsLoggedIn(false);
          console.log(500)
      }
  } catch (error) {
      console.error("Error adding products:", error);
      alert("An error occurred while adding products.");
  }

};



  const numberOfProducts = cartProducts.reduce((total, product) => total + product.quantity, 0);


  const handleAddToCart = (product) => {
  
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const existingProduct = storedCart.find(
      (item) => item.product_name === product.product_name
    );

    let updatedCart;
    if (existingProduct) {
     
      updatedCart = storedCart.map((item) =>
        item.product_name === product.product_name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
 
      updatedCart = [...storedCart, { product_name: product.product_name, quantity: 1 }];
    }

 
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    queryClient.invalidateQueries(["fetchingfrombackendForCart"]);
  };


    const handleRemoveFromCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const existingProduct = storedCart.find(
      (item) => item.product_name === product.product_name
    );

    let updatedCart;

    if (existingProduct && existingProduct.quantity > 1) {
      updatedCart = storedCart.map((item) =>
        item.product_name === product.product_name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else {
      updatedCart = storedCart.filter((item) => item.product_name !== product.product_name);
    }
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    queryClient.invalidateQueries(["fetchingfrombackendForCart"]);
  };


return(
    <>
    <Overlay IsOpen={isCartOpen} onClick={toggleCart} />

      <Sidebar isOpen={isCartOpen}>
        {cartProducts.length > 0 ? (
          <CartContent>
            <CartHeaderDiv>
              <CartHeading>My Cart</CartHeading>
              <CloseButton onClick={toggleCart}>X</CloseButton>
            </CartHeaderDiv>

            {savings>0 && (
              <CartSavings>
                <Savings>Your Total Savings</Savings>
                <Savings>₹{savings}</Savings>
              </CartSavings>
            )}
            <ProductDivInCart>
              <DeliveryDiv>
                <TimeImage src={TimePic} alt="15mins" />
                <div>
                  <DeliveryTimeH3>Delivery in 10 Minutes</DeliveryTimeH3>
                  <DeliveryTimeP>Shipment of {numberOfProducts} items</DeliveryTimeP>
                </div>
              </DeliveryDiv>

              {cartProducts.map((iter) => (
                <ProductSubDivInCart key={iter._id}>
                  <ProductImgInCart src={milkPacket} alt="prodImage" />
                  <ProductDetailsInCart>
                    <ProductDetailsP>{iter.product_name}</ProductDetailsP>
                    <ProductDetailsP>1 unit of {iter.unit}</ProductDetailsP>
                    <ProductDetailsP>
                    {iter.discountedPrice != null ? (
  <div>
    <span style={{ textDecoration: "line-through", marginRight: "8px" }}>
      ₹{iter.price}
    </span>
    <span style={{ color: "#256FEF" }}>₹{iter.discountedPrice}</span>
  </div>
) : (
  <span>₹{iter.price}</span>
)}
                      
                      </ProductDetailsP>
                  </ProductDetailsInCart>
                  <AddProductDiv>
                    <ButtonToAddCart>
                      <AddToCart
                        type="button"
                        onClick={() => handleRemoveFromCart(iter)}
                        value="-"
                      />
                      <AddToCartNumber>{iter.quantity}</AddToCartNumber>
                      <AddToCart
                        type="button"
                        onClick={() => handleAddToCart(iter)}
                        value="+"
                      />
                    </ButtonToAddCart>
                  </AddProductDiv>
                </ProductSubDivInCart>
              ))}
            </ProductDivInCart>

            {/* Billing Section */}
            <BillingDiv>
              <Billh4>Bill Details</Billh4>
              <EachDivInBilling>
                <Billp>Sub Total</Billp>
                <Billp>
  {cartProducts.some(item => item.discountedPrice != null) ? (
    <>
      <span style={{ textDecoration: "line-through", marginRight: "8px" }}>
        ₹
        {cartProducts.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )}
      </span>
      <span style={{ color: "black" }}>
        ₹
        {cartProducts.reduce(
          (sum, item) => sum + (item.discountedPrice || item.price) * item.quantity,
          0
        )}
      </span>
    </>
  ) : (
    <span>₹{cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
  )}
</Billp>
              </EachDivInBilling>

              <EachDivInBilling>
                <Billp>Delivery Charge</Billp>
                <Billp>₹10</Billp>
              </EachDivInBilling>

              <EachDivInBilling>
                <Billp>Handling Charge</Billp>
                <Billp>₹5</Billp>
              </EachDivInBilling>

              <TotalBillDiv>
                <Billh4>Grand Total</Billh4>
                <Billp>₹{totalPrice}</Billp>
              </TotalBillDiv>
            </BillingDiv>

            {/* Feeding India Section */}
            <FeedingIndiaDiv>
              <FeedingIndiaImg src={FeedingImg} alt="feedingImg" />
              <div>
                <FeedinIndiaHeading>Feeding India donation</FeedinIndiaHeading>
              <FeedingIndiaP>
                Feeding India is a non-profit organization that works to reduce
                hunger and malnutrition in India.
              </FeedingIndiaP>
              </div>
              
              <FeedingIndiaMoneyDiv>
                <FeedingIndiaMoneyp>₹1</FeedingIndiaMoneyp>
                <input
                  type="checkbox"
                  checked={feedingIndiaContribution > 0}
                  onChange={(e) =>
                    setFeedingIndiaContribution(e.target.checked ? 1 : 0)
                  }
                />
              </FeedingIndiaMoneyDiv>
            </FeedingIndiaDiv>

            {/* Tip Your Delivery Partner Section */}
            <TipYourDeliveryPartnerDiv>
              <TipHeading>Tip Your Delivery Partner</TipHeading>
              <KindnessP>
               
                Your kindness means a lot! 100% of your tip will go directly to
                your delivery partner.
              </KindnessP>
              <AddTipContainer>
              <AddTipDiv
        onClick={() => setTipAmount(tipAmount === 20 ? 0 : 20)}
        isActive={tipAmount === 20}
      >
        <AddTipImg src={emoji1} alt="emoji" />
        <p>₹20</p>
      </AddTipDiv>

      <AddTipDiv
        onClick={() => setTipAmount(tipAmount === 40 ? 0 : 40)}
        isActive={tipAmount === 40}
      >
        <AddTipImg src={emoji2} alt="emoji" />
        <p>₹40</p>
      </AddTipDiv>

      <AddTipDiv
        onClick={() => setTipAmount(tipAmount === 60 ? 0 : 60)}
        isActive={tipAmount === 60}
      >
        <AddTipImg src={emoji3} alt="emoji" />
        <p>₹60</p>
      </AddTipDiv>

      <AddTipDiv
        onClick={() => setTipAmount(tipAmount === 80 ? 0 : 80)}
        isActive={tipAmount === 80}
      >
        <AddTipImg src={emoji4} alt="emoji" />
        <p>₹80</p>
      </AddTipDiv>
              </AddTipContainer>
            </TipYourDeliveryPartnerDiv>


            {isLoggedIn ? (
              
        <CheckOutDiv>
          <Link to="/final" style={{ textDecoration: "none" }} >
          <FinalCheckOut onClick={handleProceed}>
            <div>
              <TotalPriceP>₹{totalPrice}</TotalPriceP>
              <TotalPriceP>TOTAL</TotalPriceP>
            </div>
            <ProceedP >Proceed →</ProceedP>
          </FinalCheckOut>
          </Link>
        </CheckOutDiv>
      ) : (
        <CheckOutDiv>
          <FinalCheckOut onClick={() => setShowLoginDialog(true)}>
            <LoginLast>LOGIN</LoginLast>   
        </FinalCheckOut>
        </CheckOutDiv>
        
        
      )}

          </CartContent>
        ) : (
          <CartHeaderDiv>
            <CartHeading>My Cart</CartHeading>
            <CloseButton onClick={toggleCart}>X</CloseButton>
          </CartHeaderDiv>
        )}
      </Sidebar>
      </>
)

}


