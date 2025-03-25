import styled from "styled-components";

const BodyDiv = styled.div`
display:flex;
margin-top:100px;

`

const LeftDiv = styled.div`
display:flex;
flex-direction:column;
box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
padding-left:120px;
padding-right:170px;

`
const LeftDivBottom = styled.div`
padding-top:30px;
box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
`
const ProductImage = styled.img`
width: 400px;
`

const RightDiv = styled.div`
width:1180px;
padding-left:40px;
padding-top:30px;  
// position:fixed;
`

const LeftDIvH2 = styled.h2`
margin-top: 0px;
`
const LeftDivP = styled.p`
color: #666666;
padding-bottom:10px;
`

const ReRoutingDiv = styled.div`
display:flex;
`

const RoutingElements = styled.p`
font-size:13px;
margin-right:4px;
margin-bottom:0;
`

const Slash = styled.p`
margin-top:12.5px;
margin-right:6px;
margin-bottom:0;
`

const RoutingElementLast = styled(RoutingElements)`
color: #666666;
`


const ProductName = styled.h2`
margin-top:7px;
margin-bottom:10px;
`

const DeliveryStaticTime = styled.div`
display:flex;
background-color:#D3D3D3;
width:70px;
border-radius:5px;
margin-bottom:15px;
`

const Delivery15mins = styled.img`
width:20px;
height:20px;
`

const DeliveryTimeStaticp = styled.p`
margin-top:2.5px;
margin-bottom:0;
font-size:14px;
`


const ProductUnit = styled.p`
color: #4d4d4d;
// width:100px;
margin-bottom:2px;
font-size:14px;
`

const ProductPrice = styled.p`
width:100px;
margin-top:8px;
margin-bottom:4px;
font-size:15px;
`

const InclusiveOfAllTaxes = styled.p`
color: #999999;
font-size:13px;
margin-top:2px;
`


const CartDivButton = styled.div`
width:150px;
margin-left:180px;
`

const ProductDetailsDiv = styled.div`
display:flex;

`

const WhyBlinkItDiv = styled.div`
display:flex;
`

const WhyBlinkitImg = styled.img`
width:60px;
margin-top:15px;
`

const WhyBlinkItDesc = styled.div`
padding-left:20px;
padding-top:10px;
`

const WhySHopFromBlinkit = styled.h3`
margin-bottom:5px;
`
export {BodyDiv,WhyBlinkitImg,WhySHopFromBlinkit,WhyBlinkItDiv,ProductDetailsDiv,CartDivButton,ProductPrice,InclusiveOfAllTaxes,ProductUnit,DeliveryTimeStaticp,Delivery15mins,DeliveryStaticTime,Slash,ProductName,RoutingElementLast,WhyBlinkItDesc,RoutingElements,ReRoutingDiv,LeftDivP,LeftDIvH2,LeftDivBottom,RightDiv,LeftDiv,ProductImage}