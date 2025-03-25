
import { createGlobalStyle,styled } from 'styled-components';
import keyframes from 'styled-components';
const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Helvetica';
        src: url('./Fonts/Helvetica Bold.TTF') format('truetype'); 
        font-weight: normal;
        font-style: normal;
    }
`;
const scrollUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const scrollDown = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CustomHeader = styled.header`

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color:white;
  margin:0;
  position: fixed;
    width: 97.5%;
  top:0;
  left:0;
 
`
const LogoDivImg = styled.img`
height: 60px;
 
`
const LogoDiv = styled.div`
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`

const LocationDrop = styled.select`
    border: 0;
`

const DeliveryTime = styled.p`
    font-weight: bold;
    font-size: 18px;
    font-family: Helvetica; 
    color:black;
    padding: 0;
    margin-bottom: 6px;
    margin-top: 4px;
`
const SearchBarDemo = styled.input`
  width: 400px;
  height: 40px;
  border: 0;
  background-color: #F8F8F8;
  margin-right: 10px;
  padding-left: 40px; /* Space for the search icon */
  font-size: 14px; /* Adjust font size as needed */
  outline: none; /* Remove default outline */
`;


const placeholderAnimation = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;
const AnimatedPlaceholder = styled.div`
  position: absolute; /* Position it above the input */
  left: 40px; /* Align with the input padding */
  top: 10px; /* Adjust top position */
  font-size: 16px; /* Same as input font size */
  color: grey;
  transition: all 0.3s ease;
  animation: ${placeholderAnimation} 0.5s forwards;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const SearchBarDemoAround = styled.div`
  display: flex;
  background-color: #F8F8F8;
  border-radius: 10px;
  position: relative; /* Position relative to contain absolute children */
`;
const SearchImg = styled.img`
    height: 15px;
    width: 15px;
    margin-top: 14px;
    margin-left: 10px;
    margin-right: 10px;
`

const AccountDropDown = styled.select`
    height: 40px;
    width: 100px;
    border: 0;
    font-size: 18px;
`

const Cart= styled.button`
border:0;
height: 45px;
width: 80px;
 font-size: 15px;
  border-radius: 10px;
margin-top:2px;
 background-color:  #0C831F;
 color:white;
 cursor: pointer;
 margin-left:0;
 font: 15px Helvetica;
 font-weight: bold;
 padding-left:0;


`
const CartDiv = styled.div`
background-color:  #0C831F;
height: 50px;
width: 120px;
 margin-right: 20px;
  border-radius: 10px;
  display:flex;

  `

const CartImg = styled.img`
height: 30px;
margin-top:9px;
margin-left: 8px;
margin-right:0;
`
const SearchPageSearchBar = styled.input`
width: 850px;
height: 40px;
border: 0;
background-color: #F8F8F8;
margin-right: 10px;
`
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 400px;
  background-color: white;
  box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.5);
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
  overflow-y: auto;
`;

const Overlay = styled.div`
  display: ${(props) => (props.IsOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;
`;

const CartContent = styled.div`
  display:flex;
  flex-direction:column;
  background-color:#f0f0f0;  
`;

const CartHeading = styled.h3`
margin-left:20px;
font-family:Helvetica;

`

const CartHeaderDiv = styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
background-color:white;
`
const CloseButton = styled.button`
  margin:0;
  background-color:white;
  border: 0;
  cursor: pointer;
margin-right:30px;
font-size:15px;
`;

const TipYourDeliveryPartnerDiv = styled.div`
margin: 20px 10px 10px 10px;
border-radius: 10px;
background-color:white;
font-size:13px;
display:flex;
flex-direction:column;
padding-left:10px;
padding-bottom:10px;

`

const AddTipDiv = styled.div`
  width: 70px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  margin-right:15px;
  border-radius: 10px;
  display:flex;
  color: #666666;
  cursor:pointer;
    border: 1px solid ${(props) => (props.isActive ? '#0C831F' : 'transparent')}; 
`

const AddTipImg = styled.img`
width: 20px;
margin:10px 10px 10px 10px;
`
const AddTipContainer = styled.div`
display:flex;
flex-direction:row;
`
const TipHeading = styled.h3`
margin-bottom:5px;
font-family: Verdana;
`
const KindnessP = styled.p`
color: #666666;
margin-top: 5px;

font: 12px Helvetica;
`

const ProductDivInCart = styled.div`
background-color:white;
margin: 10px 10px 0 15px;
border-radius: 10px;
`

const ProductSubDivInCart = styled.div`
display:flex;
margin-bottom:10px;

`

const ProductImgInCart = styled.img`
width:70px;
height:70px;
margin-top:15px;
box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
border-radius: 10px;
margin-left:10px;
`

const ProductDetailsInCart = styled.div`
font-size:13px;
color: #666666;
padding-left: 15px;
margin-top:13px;
`

const AddProductDiv = styled.div`
margin-top:20px;
margin-right:20px;
`

const ProductDetailsP = styled.p`
margin-bottom:0;
margin-top:8px;
`

const ButtonToAddCart = styled.div`
display:flex;
background-color:  #0C831F;
margin-left:70px;
margin-top:20px;  
margin-bottom: 5px;   
border-radius:5px;
justify-content:center;
align-items:center;
`

const DeliveryDiv = styled.div`
display: flex;
`

const TimeImage = styled.img`
margin-top: 20px;
margin-left:15px;
margin-right:20px;
width: 50px;
height: 50px;
`
const DeliveryTimeH3 = styled.h3`
margin-bottom:0;
margin-top:20px;
font: 15px Verdana;
`

const DeliveryTimeP = styled.p`
margin-top:5px;
color: #666666;
font-size: 14px;
`


const BillingDiv = styled.div`
padding-top:10px;
display:flex;
flex-direction:column;
background-color: white;
margin: 20px 10px 0 15px;
padding-left:8px;
border-radius:10px;
`

const EachDivInBilling = styled.div`

display:flex;
justify-content:space-between;
margin-right:30px;
margin-left:10px;
`

const Billp = styled.p`
margin-top:5px;
margin-bottom:5px;
font-size:13px;
`

const Billh4 = styled.h4`
margin-bottom:5px;
margin-left:7px;
margin-top: 5px;
font-size: 13px;
font-family:  Verdana;

`
const FeedinIndiaHeading = styled.h4`
font-size: 13px;
font-family:  Verdana;
margin-bottom:0;
margin-top:13px;
`
const TotalBillDiv = styled.div`
display:flex;
justify-content:space-between;
margin-right:30px;
`

const FeedingIndiaDiv = styled.div`
background-color: white;
margin: 20px 10px 0 15px;
padding-left:6px;
border-radius:10px;
display:flex;
`

const FeedingIndiaImg = styled.img`
width: 50px;
height: 50px;
margin-top: 20px;
margin-left:10px;
margin-right:20px;
margin-bottom: 10px;
`
const FeedingIndiaP = styled.p`
color: #666666;
font:11px Helvetica;
 margin-top: 5px;

`
const FeedingIndiaMoneyDiv = styled.div`
display:flex;
margin-right:7px;
`

const FeedingIndiaMoneyp = styled.p`
margin-top:30px;
`

const CancellationPolicyDiv = styled.div`
display:flex;
flex-direction:column;
background-color: white;
margin: 20px 10px 0 15px;
padding-left:20px;
border-radius:10px;
`

const CancellationHeading = styled.h4`
margin-bottom:0px;
margin-top:10px;
`
const CancellationContent = styled.p`
margin-top:5px;
color: #666666;
font-size:12px;
`

const CheckOutDiv = styled.div`
position: sticky;
 bottom: 0;
background-color: white; 
padding: "10px";
`

const FinalCheckOut = styled.div`
border-radius:10px;
margin: 10px 10px 10px 10px ;
display:flex;
justify-content: space-between;
background-color:#0C831F; 
color:white;
padding-left:25px;
font-family: Helvetica;
cursor: pointer;
height: 66px;
`

const TotalPriceP = styled.p`
margin-bottom:10px;
margin-top:10px;
`
const ProceedP = styled.p`
margin-right:30px;
margin-top:23px;
cursor:pointer;
`




const LoginDialogDiv = styled.div`
  background: white;
  padding: 10px 80px 10px 80px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 2001;
  display:flex;
  flex-direction:column;
  width:400px;
  height:300px;
  align-items:center;
`


const LoginDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* High z-index to ensure it stays on top */
`;


const LoginButton = styled.button`
border:0;
background-color:white;
font-size:15px;
color:#666666;
cursor:pointer;
`

const LoginLogo = styled.img`
width:64px;
margin-left:190px;
`
const FirstContainer = styled.div`
display: flex;
  align-items: center;
  width:550px;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
   border: 1px solid #ccc;
   border-radius: 10px;
   margin-left: 60px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font: 16px, Helvetica;
 border:0;
 margin-right:10px;

  
`;


const IndiaLastMinh2 = styled.h2`
margin-bottom:3px;
 font-family: "Helvetica"; 
`
const LoginOrSignUph3 = styled.h3`
margin-top:3px;
color: #4d4d4d;
  font-weight: normal
`

const CountryCodep = styled.p`
margin-top:12px;
margin-bottom:12px;
margin-left:7px;
font-weight:bold;
`


const BackButton = styled.button`
background-color:white;
border:0;
font-size:25px;
margin-left:10px;
cursor:pointer;
`

const ContinueButton = styled.div`
  margin-top: 17px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 13px;
  padding-bottom: 13px;
  cursor: ${({ disabled }) => (disabled ? 'normal' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#0C831F')}; /* Light grey if disabled */
  color: white;
`;
const LoginLastp = styled.p`
color: #999999;
font-size:13px; 
`


const AccountButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const BlurBackground = styled.div`
  position: fixed;
  top: 85px; /* Start blur effect below 85px */
  left: 0;
  width: 100vw;
  height: calc(100vh - 85px); 
  background: rgba(0, 0, 0, 0.5); 
  z-index: 100;

`;

const DialogBox = styled.div`
  position: absolute;
  top: 85px; /* Adjust this value based on button position */
  right: 200px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width:300px;
`;
const DialogBox2 = styled.div`
  position: absolute;
  top: 45px; /* Adjust this value based on dropdown height */
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const DialogButton = styled.button`
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const MyAccount = styled.h3`
margin-bottom: 0px;
color: #555555;
padding-left:20px;
font-family:Helvetica;
`
const PhoneNUmberp = styled.p`
margin-top:3px;
color: #555555;
padding-left:20px;
`


const ProfileElement = styled.p`
margin-top:5px;;
margin-bottom:5px;
color: #555555;
font-family: "Helvetica";
font-size:13px;
padding-left:20px;

`

const ProfileElementDiv = styled.div`
&:hover {
    background-color: #F0F0F0;
  }
    cursor:pointer;
`

const QrCodeDiv = styled.div`
display:flex;
`

const QrCode = styled.img`
width:80px;
height: 80px;
margin-left: 10px;
margin-bottom:10px;
`

const ScanText = styled.h3`
color: #555555;
padding-left:20px;
padding-right:40px;
font-family:Helvetica;
margin-top:0;
margin-bottom:0;
font-size:14px;
`

const BlueText = styled(ScanText)`
color: #1991FF;
`
const LastText = styled(ProfileElement)`
font-size:12px;
`



const Dialog = styled.div`
  position: absolute;
  top: 100%; 
  left: 190px;
  width: 200px;
  padding: 20px;
  background-color:  #f0f8ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  z-index: 10;
`;


const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;


const SavedAddress = styled.h4`
margin-top:0;
margin-bottom:0;
font: 13px Okra, Helvetica;
`

const LocationImg = styled.img`
width:40px;
height:40px;
`
const SmallAddressDiv = styled.div`
display:flex;
background-color:white;
margin-bottom:5px;
 &:hover {
    background-color: #f0f0f0;
  }
`

const AllSavedAddress = styled.div`
background-color:white;
border-radius:10px;
margin-top:10px;
padding-left:10px;
padding-top:10px;
padding-bottom:10px;
`

const AddressItem = styled.li`
  list-style: none;
  padding: 10px;
  cursor: pointer;
  color: #828282;
  font: 13px Okra, Helvetica;
 
`;

const HeaderAddress = styled.p`
margin-top:0;
cursor:pointer;
margin-bottom:0;
`


const LoginLast = styled.p`
margin-top:23px;
margin-left: 123px;
margin-bottom:0px;
`


const CartSavings = styled.div`
display:flex;
justify-content: space-between;
background-color: #DBE8FF;
margin-left: 13px;
border-radius: 10px;
margin-top: 8px;
margin-right: 13px;
margin-bottom:0;
`

const Savings = styled.p`
margin-left: 10px;
margin-right:20px;
color: #256FEF;
font: 13px Okra, Helvetica;
`

const SignUp = styled.p`
 margin-left: 10px;
font: 12px Helvetica;
cursor:pointer;
&:hover {
color: #87CEEB;
}

`

const SignUpDiv = styled.div`
display: flex;
`


const SellerInLogin = styled.p`
margin-left: 180px;
margin-bottom: 30px;
font: 12px Helvetica;
color: #1A1A1A;
&:hover {
color: #87CEEB;
}
cursor: pointer;
`


const SignUpP = styled.h3`
margin-top: 15px;
font: 17px Helvetica;
`
export {ContinueButton,SignUpP,SellerInLogin,SignUpDiv,SignUp,Savings,HeaderAddress,AnimatedPlaceholder,FeedinIndiaHeading,CartSavings,LoginLast,AllSavedAddress,AddressItem,SmallAddressDiv,LocationImg,SavedAddress,LastText,Dialog,BlurredBackground,BlueText,ScanText,QrCode,DialogBox2,QrCodeDiv,ProfileElementDiv,ProfileElement,PhoneNUmberp,MyAccount,DialogButton,AccountButton,BlurBackground,DialogBox,LoginLastp,CustomHeader,BackButton,FirstContainer,CountryCodep,LoginOrSignUph3,IndiaLastMinh2,InputField,InputContainer,LoginLogo,LoginDialogOverlay,LoginButton,LoginDialogDiv,ProceedP,FinalCheckOut,TotalPriceP,CheckOutDiv,CancellationContent,CancellationHeading,CancellationPolicyDiv,FeedingIndiaMoneyp,FeedingIndiaMoneyDiv,FeedingIndiaP,FeedingIndiaImg,TotalBillDiv,BillingDiv,Billh4,Billp,EachDivInBilling,DeliveryTimeP,DeliveryTimeH3,TimeImage,DeliveryDiv,ButtonToAddCart,ProductDetailsP,ProductDetailsInCart,AddProductDiv,ProductSubDivInCart,ProductDivInCart,ProductImgInCart,TipHeading,KindnessP,CartContent,AddTipContainer,AddTipImg,AddTipDiv,TipYourDeliveryPartnerDiv,CloseButton,CartHeaderDiv,CartHeading,LogoDivImg,Overlay,LogoDiv,Sidebar,LocationDrop,DeliveryTime,FeedingIndiaDiv,SearchBarDemo,SearchBarDemoAround,CartImg,CartDiv,SearchPageSearchBar,SearchImg,AccountDropDown,Cart};