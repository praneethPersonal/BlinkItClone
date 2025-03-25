import styled from "styled-components";
const EachItem = styled.div`
display:flex;
justify-content:space-between;
border-bottom:2px solid #F0F0F0;
display:flex;
padding-bottom:10px;
padding-top:10px;

`
const OrderPicImg = styled.img`
width: 40px;
height:40px;
margin-top:7px;
margin-right:10px;
`

const FinalPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f8ff; /* Light bluish background */
  min-height: 100vh;
  margin-top:80px;
`;

const ThankYouMessage = styled.h1`
  font: 28px Okra, Helvetica;
  color: #2f4f4f;
  margin-bottom: 10px;
  
`;

const CartItemsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;


const ItemName = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const ItemQuantity = styled.p`
  font-size: 18px;
  color: gray;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  color: #228b22;
  margin-bottom: 0;
`;

const TotalItemPrice = styled.p`
 font-size: 18px;
`
const TotalPriceContainer = styled.div`
  margin-top: 20px;
  text-align: right;
  font-size: 20px;
  font-weight: 600;
  color: #228b22;
`;

export {EachItem,OrderPicImg,FinalPageContainer,ThankYouMessage,CartItemsContainer,ItemName,ItemQuantity,ItemPrice,TotalItemPrice,TotalPriceContainer}