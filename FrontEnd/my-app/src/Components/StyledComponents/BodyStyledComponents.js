import { createGlobalStyle,styled } from 'styled-components';
const GlobalStyles = createGlobalStyle`
   @font-face {
      font-family: 'Okra-medium';
      src: url('./Fonts/Context Reprise Medium SSi Medium.TTF') format('truetype'); /* Adjust the path as needed */
      
  }
`;
const Add1 = styled.img`
padding-top: 80px;
width: 100%;
`
const Add2 = styled.img`
width: 350px;
margin-left: 20px
`

const AddDiv = styled.div`
margin-top: 30px;
display: flex;
`

const CatDiv = styled.div`
display: flex;
flex-wrap: wrap;
margin-left: 0;
margin-top: 30px;
`

const CatSubDiv = styled.div`
display:flex;
flex-direction: column; 
align-items: center;
margin-right: 20px;
width: 100px;
`

const CatDataDiv = styled.div`
display:flex;
flex-direction: column;
`

const Catdata = styled.p`
font:15px Helvetica;
`

const CatImg = styled.img`
width: 102px;
`

const ProductImage = styled.img`
width: 140px;
height: 140px;
`

const ProductsCategoryWise = styled.div`
display: flex;
overflow-x:auto;
`

const EachProductDiv = styled.div`
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    margin:10px;
    justify-content:center;
    align-items:center;
    flex-basis: 200px;
    flex-shrink: 0;   
    border-radius:10px;
    background-color:white;
`

const ProductImageDiv = styled.div`
display:flex;
justify-content:center;
`

const ProductName = styled.p`
margin-left:10px;
font-weight: bold;
font: 13px Helvetica;
color: #1F1F1F;
`

const ProductUnit = styled.div`
margin-top: 30px;
margin-left: 10px;
color: grey;
`

const PriceDiv = styled.div`
font-weight: bold;
font-size: 13px;  
margin-left: 10px;
margin-top:10px;
`

const BottomDivInProduct = styled.div`
display:flex;

`

const AddToCartDiv = styled.div`
display:flex;
background-color:  #0C831F;
margin-left:90px;
margin-top:20px;  
margin-bottom: 5px;   
border-radius:5px;
justify-content:center;
align-items:center;
`


const FooterDiv = styled.div`
display:flex;
flex-direction:column;x
margin-top: 100px;
`

const UsefulLinksDiv = styled.div`
display:flex;
padding-left:10px;
`

const UseFulLinksSubDiv = styled.div`
width: 140px;
font-size: 15px;
 color: #666666;
`

const FooterDivHeading = styled.div`
display:flex;
margin-top: 80px;
`

const UseFulLinksHeading = styled.h3`
margin-right: 350px;
margin-left:10px;
font-family: Helvetica;
`

const CategoreisP = styled.h3`
font-family: Helvetica;
`

const categoriesLinkDiv = styled.div`
display:flex;
`

const CategoriesSubDiv = styled.div`
width: 140px;
font-size: 15px;
margin-left: 35px;
color: #666666;
`

const LinksToPages = styled.div`
background-color: #FAFAFA;
height: 50px;
display:flex;
`

const UseLessInfo = styled.p`
color: #666666;
margin-left: 130px;
margin-top:22px;
font-size:13px;
`

const DownloadApp = styled.p`
margin-left: 90px;
margin-top:20px;
`

const PlayStore = styled.img`
height: 30px;
margin-left: 30px;
margin-top: 13px;
`
const LastLine = styled.p`
color: #666666;
font-size:14px;
`


const AddToCart = styled.input`
background-color:  #0C831F;
border:0;
color:white;
height:25px;
border-radius:5px;
cursor:pointer;
`


const AddToCartNumber = styled.p`
background-color:  #0C831F;
height:25px;
color:white;
width:15px;
justify-content:center;
align-items:center;
margin-top:0px;
padding-top:6px;
margin-left:6px;
margin-bottom:0;
`
 

const CategoryDIvisionAll = styled.div`
display:flex;
justify-content:space-between;
margin-top:20px;
`

const CategoryNameStart = styled.h2`
font-family: "Helvetica"; 
margin-bottom:5px;
margin-top:10px;
`

const SeeAllP = styled.p`
color:  #0C831F;
font-family: "Helvetica"; 
`


const InitialAddToCart = styled.input`
border: 1px solid #0C831F;
background-color: #F9FCFA;
width:54px;
height:30px;
border-radius:5px;
color:#0C831F;
cursor:pointer;
`

const DiscountPriceDiv = styled.div`
display:flex;
`

const DiscountBanner = styled.div`
font-size:10px;
font-weight:bold;
width:25px;
color:white;
background-color:#87CEFA;
height:28px;
padding-left:5px;
`

const DiscountedPrice = styled.p`
  margin-left: 5px;
  font-size: 13px;
`;
const OriginalPrice = styled.p`
  color: #999; /* Gray color for the original price */
  text-decoration: line-through; /* Strikethrough effect */
  font-size: 13px; /* Adjust the font size if needed */
  margin-top: ;
`;


const NewImage = styled.img`

`
export {Add1,Add2,OriginalPrice,NewImage,DiscountedPrice,CategoreisP,DiscountBanner,DiscountPriceDiv,InitialAddToCart,SeeAllP,CategoryNameStart,CategoryDIvisionAll,AddDiv,CatDiv,CatImg,Catdata,LastLine,CatSubDiv,AddToCartNumber,AddToCart,CatDataDiv,PlayStore,ProductImage,UseLessInfo,DownloadApp,UseFulLinksHeading,CategoriesSubDiv,LinksToPages,ProductsCategoryWise,FooterDivHeading,UseFulLinksSubDiv,FooterDiv,UsefulLinksDiv,ProductUnit,AddToCartDiv,BottomDivInProduct,EachProductDiv,ProductImageDiv,ProductName,PriceDiv};