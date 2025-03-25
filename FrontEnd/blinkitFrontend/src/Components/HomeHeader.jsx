import React, { useState,useEffect } from "react";
import logo from "../Components/Photos/download.png";
import searchLogo from "../Components/Photos/searchLogo.png";
import CartImage from "../Components/Photos/newCart.png";
import BlinkItLogo from "./Photos/app_logo.jpg"

import {
  CustomHeader,
  LoginLogo,LoginLastp,
  LogoDivImg,SavedAddress,SignUpP,
  LocationDrop,PhoneNUmberp,SignUp,
  CartDiv,
  CartImg,FirstContainer,
  DeliveryTime,ProfileElementDiv,SmallAddressDiv,
  SearchBarDemo,BackButton,SellerInLogin,
  SearchBarDemoAround,
  SearchImg,ContinueButton,HeaderAddress,SignUpDiv,
  AccountDropDown,MyAccount,QrCodeDiv,
  Cart,CountryCodep,ProfileElement,QrCode,ScanText,LocationImg,AddressItem,AnimatedPlaceholder,
  LoginButton,IndiaLastMinh2,LoginOrSignUph3,BlueText,LastText,DialogBox2,BlurredBackground,Dialog,AllSavedAddress,
  LoginDialogDiv,LoginDialogOverlay,InputContainer,InputField,AccountButton,BlurBackground,DialogButton,DialogBox
} from "./StyledComponents/HeaderStyledComponents";
import { Link } from "react-router-dom";
import { CartSideBar } from "./Cart";
import styled from "styled-components";
import qrcode from "./Photos/qrcode.png"
import location from "./ProfilePics/location.jpg"

function HomeHeader({isLoggedIn,setShowLoginDialog,setIsLoggedIn,showLoginDialog}) {
  const placeholders = [
    "Search 'Apple'",
    "Search 'Milk'",
    "Search 'Bread'",
    "Search 'Chocolate'",
    "Search 'Butter'"
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [visible, setVisible] = useState(true);


  // const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('phoneNumber') || ''); // Retrieve phoneNumber from localStorage
  const [sellerId, setSellerId] = useState();
  const [sellerPw, setSellerPw] = useState();
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showDialog, setShowDialog] = useState(false); 
  const [addresses, setAddresses] = useState([]); 
  const [currentAddress, setCurrentAddress] = useState("Select Delivery Address");
  // Toggle the dialog box

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => {
          const currentIndex = placeholders.indexOf(prev);
          return placeholders[(currentIndex + 1) % placeholders.length];
        });
        setVisible(true);
      }, 500); // Wait for animation to complete
    }, 2000); // Change placeholder every 3 seconds

    return () => clearInterval(interval);
  }, []);



  const toggleLocationDialog = () => {
    setShowDialog(!showDialog);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const selectAddress = (address) => {
    setCurrentAddress(address); // Store the selected address in state
    localStorage.setItem('currentAddress', address); // Save the selected address in localStorage
    setShowDialog(false); // Close the dialog
  };
  // Fetch addresses from localStorage when the component mounts
  useEffect(() => {
    const storedAddresses = localStorage.getItem('addresses'); // Get addresses from localStorage
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses)); // Parse and set the addresses
    }
    const storedCurrentAddress = localStorage.getItem('currentAddress');
    if (storedCurrentAddress) {
      setCurrentAddress(storedCurrentAddress);
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      validateToken(token);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/validateToken', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isValid) {
          setIsLoggedIn(true); 
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem('jwtToken'); 
        }
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('jwtToken'); 
      }
    } catch (error) {
      console.error('Error validating token:', error);
      setIsLoggedIn(false);
      localStorage.removeItem('jwtToken'); 
    }
  };


  const handleSellerId = (e) =>{
    const newSellerId = e.target.value;
    setSellerId(newSellerId)
    localStorage.setItem("sellerId", newSellerId)
  }


  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    localStorage.setItem('phoneNumber', newPhoneNumber); // Store phoneNumber in localStorage
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSellerPw = (e) =>{
    setSellerPw(e.target.value);
  }

  const handleLoginClick = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: phoneNumber, 
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;
        console.log(data)
      
        // Store JWT token
        localStorage.setItem('jwtToken', jwtToken);
      
        setStep(1); 
        setPassword(''); 
        setShowLoginDialog(false); // Close the login dialog
        setIsLoggedIn(true); 
      } else {
        const data = await response.json(); // Get response body
        console.log(data);
        
        if (response.status === 401 && data.message === 'inValid Mobile Number!') {
          setError(true);
          setErrorMessage("Its your First Time! Please Signup")
          console.log(100)
          setTimeout(() => {
            setError(false);
            setStep(3); // Keep the user on the step to retry login
          }, 2000);
          setStep(3); 
        } else {
          setError(true);
          setErrorMessage('inValid Password!')
          setTimeout(() => {
            setError(false);
            setStep(2); // Keep the user on the step to retry login
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(true); 
      setErrorMessage("Error during Login")
      setTimeout(() => {
        setError(false); 
        setStep(2); // Keep the user on the login step
      }, 2000);

    }
  };




  const handleSignUp = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: phoneNumber, 
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;
      
       
        localStorage.setItem('jwtToken', jwtToken);
      
        setStep(1); 
        setPassword('');
        setShowLoginDialog(false); 
        setIsLoggedIn(true); 
      } else {
        const data = await response.json(); 
        console.log(data);
        if (response.status === 401 && data.message === 'Mobile number already exists. Cannot create new User.') {
          setError(true);
          setErrorMessage("Mobile number already exists. Cannot create new User.")
          setStep(3);
          setTimeout(() => {
            setError(false);
            setStep(3);
          }, 2000);
          
        } else {
          setError(true);
          setErrorMessage("invalid password")
          setTimeout(() => {
            setError(false);
            setStep(3); 
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(false); 
      setErrorMessage("Error during Login")
      setTimeout(() => {
        setError(false); 
        setStep(3); 
      }, 2000);

    }
  };



  const handleSellerLogin = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/login/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: sellerId, 
          password: sellerPw,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token; 

        localStorage.setItem('jwtTokenSeller', jwtToken);

        setStep(1); 
        setSellerPw(''); 
        setShowLoginDialog(false); 
        
        window.location.replace("/seller");

      } else {
        const data = await response.json(); 
        console.log(data);
        if (response.status === 401 && data.message === 'New user please sign up!') {
          setError(true);
          setErrorMessage("Its your First Time! Please Signup")
          setStep(5); 
        } else {
          setError(true);
          setErrorMessage("invalid Password")
          setTimeout(() => {
            setError(false);
            setStep(4);
          }, 2000);
        }
      }
    }
       catch (error) {
      console.error('Error during login:', error);
      setError(true);
      setErrorMessage("ErrorDuring Login") 
      setTimeout(() => {
        setError(""); 
        setStep(4); 
      }, 2000);
    }
  };



  const handleSellerSignUp = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/login/seller/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: sellerId, 
          password: sellerPw,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const jwtToken = data.token;
      
        
        localStorage.setItem('jwtToken', jwtToken);
      
        setStep(1); 
        setSellerPw(''); 
        setShowLoginDialog(false); 
        setIsLoggedIn(false); 
        window.location.replace("/seller");
      } else {
        const data = await response.json(); 
        console.log(data);
        if (response.status === 401 && data.message === 'Mobile number already exists. Cannot create new seller.') {
          setError(true);
          setErrorMessage("Mobile number already exists. Cannot create new Seller.")
          setStep(4);
          setTimeout(() => {
            setError(false);
            setStep(4); // Keep the user on the step to retry login
          }, 2000);
          
        } else {
          setError(true);
          setErrorMessage("invalid password")
          setTimeout(() => {
            setError(false);
            setStep(4); // Keep the user on the step to retry login
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(false); 
      setErrorMessage("Error during Login")
      setTimeout(() => {
        setError(false); 
        setStep(3); 
      }, 2000);

    }
  };

  const SellerLoginHandler = ()=>{
    setStep(4);

  }

  const signupHandler = ()=>{
    setStep(3);
  }
  const isPhoneNumberValid = phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  
  const handleContinueClick = () => {
    if (isPhoneNumberValid) {
      setStep(2); 
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  const toggleDialog = () => {
    setIsAccountDialogOpen(!isAccountDialogOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('phoneNumber');
    setIsAccountDialogOpen(false);
    window.location.href = '/';  // Redirect to homepage
  };

  const handleProfile = () => {
    setIsAccountDialogOpen(false);
    window.location.href = '/profile';  // Redirect to Profile page
  };
  return (
    <CustomHeader>
      <Link to="/">
        <div>
          <LogoDivImg src={logo} alt="Logo" />
        </div>
      </Link>


      <div>
        <DeliveryTime>Delivery in 10 minutes</DeliveryTime>
        <HeaderAddress onClick={toggleLocationDialog}>{currentAddress}</HeaderAddress>
      </div>


      {showDialog && <BlurredBackground onClick={closeDialog} isVisible={showDialog} />}
      
      <Dialog isVisible={showDialog}>
        <SavedAddress>Saved Address: </SavedAddress>
      <AllSavedAddress>
              {addresses.map((address, index) => (
                <SmallAddressDiv>
                <LocationImg src={location} alt="Location" />
                <AddressItem key={index} onClick={() => selectAddress(address)}>
                  {address}
                </AddressItem></SmallAddressDiv>
                
              ))}
            </AllSavedAddress>
      </Dialog>

      <Link to="/search" style={{ textDecoration: 'none' }}>
      <SearchBarDemoAround>
        <SearchImg src={searchLogo} alt="lens" />

        <SearchBarDemo type="text" placeholder={currentPlaceholder}/>
      </SearchBarDemoAround>
    </Link>

  
        <div>
          {isLoggedIn ? (
             <>
             {/* Account button */}
             <AccountButton onClick={toggleDialog}>
               Account 
             </AccountButton>
       
             {/* Background blur and dialog box */}
             {isAccountDialogOpen && (
               <>
                 {/* Blurred background */}
                 <BlurBackground onClick={toggleDialog} />
       
                 {/* Dialog box */}
                 <DialogBox>
                  <div>
                  <MyAccount>My Account</MyAccount>
                  <PhoneNUmberp>{phoneNumber}</PhoneNUmberp>
                  </div>
                  <ProfileElementDiv>
                  <ProfileElement onClick={handleProfile}>My Orders</ProfileElement>
                  </ProfileElementDiv>
                   <ProfileElementDiv>
                   <ProfileElement onClick={handleProfile}>Saved Address</ProfileElement>
                   </ProfileElementDiv>
                   <ProfileElementDiv>
                   <ProfileElement>FAQ's</ProfileElement>
                   </ProfileElementDiv>
                   <ProfileElementDiv>
                   <ProfileElement onClick={handleProfile}>Account Privacy</ProfileElement>
                   </ProfileElementDiv>
                   <ProfileElementDiv>
                   <ProfileElement onClick={handleLogout}>Log Out</ProfileElement>
                   </ProfileElementDiv>
                   
                   <QrCodeDiv>
                    <QrCode src={qrcode} alt = "qrcode" />
                    <div>
                    <ScanText>Simple way to
                    get groceries</ScanText>
                    <BlueText>in minutes</BlueText>
                    <LastText>Scan the QR code and download blinkit app</LastText>
                    </div>
                    

                   </QrCodeDiv>
                 </DialogBox>
               </>
             )}
           </>
          ) : (
            <LoginButton onClick={() => setShowLoginDialog(true)}>LOGIN</LoginButton>
          )}
        </div>
     

    
      {showLoginDialog && (
       <LoginDialogOverlay>
       <LoginDialogDiv>
         {step === 1 && (
           <>
             <FirstContainer>
               <BackButton onClick={() => setShowLoginDialog(false)}>←</BackButton>
               <LoginLogo src={BlinkItLogo} alt="Logo" />
               <SellerInLogin onClick={SellerLoginHandler}>Seller</SellerInLogin>
             </FirstContainer>
 
             <IndiaLastMinh2>India's last minute app</IndiaLastMinh2>
             <LoginOrSignUph3>Log in or Sign up</LoginOrSignUph3>
             
               <SignUpDiv>
               <InputContainer>
               <CountryCodep>+91</CountryCodep>
               <InputField
                 type="text"
                 value={phoneNumber}
                 onChange={handlePhoneChange}
                 placeholder="Enter your phone number"
               />
               </InputContainer>
               <SignUp onClick={signupHandler} >Sign Up</SignUp>
               </SignUpDiv>
               
             
             
             <ContinueButton disabled={!isPhoneNumberValid} onClick={handleContinueClick}>
               Continue
             </ContinueButton>
             <LoginLastp>
               By continuing, you agree to our Terms of service & Privacy policy
             </LoginLastp>
           </>
         )}

         {step === 2 && (
           <>
             <FirstContainer>
               <BackButton onClick={() => setStep(1)}>←</BackButton> {/* Back to Step 1 */}
               <LoginLogo src={BlinkItLogo} alt="Logo" />
             </FirstContainer>
 
             <h3>Enter your password</h3>
             <InputField
               type="password"
               value={password}
               onChange={handlePasswordChange}
               placeholder="Enter your password"
             />
             <ContinueButton onClick={handleLoginClick}>Log In</ContinueButton>
             {error && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
             )
             }
             
           </>
         )}

      {step === 3 && (
           <>
             <FirstContainer>
               <BackButton onClick={() => setStep(1)}>←</BackButton> {/* Back to Step 1 */}
               <LoginLogo src={BlinkItLogo} alt="Logo" />
             </FirstContainer>
             <SignUpP>Sign Up</SignUpP>
             <InputField
               type="number"
               value={phoneNumber}
               onChange={handlePhoneChange}
               placeholder="Enter your Mobile Number"
             />
             <InputField
               type="password"
               value={password}
               onChange={handlePasswordChange}
               placeholder="Enter your password"
             />
             <ContinueButton onClick={handleSignUp}>SignUp</ContinueButton>
             {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
           </>
         )}
 
        {step === 4 && (
           <>
             <FirstContainer>
               <BackButton onClick={() => setStep(1)}>←</BackButton> {/* Back to Step 1 */}
               <LoginLogo src={BlinkItLogo} alt="Logo" />
             </FirstContainer>
             
 
             <h3>Login</h3>
             <InputField
               type="text"
               value={sellerId}
               onChange={handleSellerId}
               placeholder="Enter your seller user name"
             />
             <InputField
               type="password"
               value={sellerPw}
               onChange={handleSellerPw}
               placeholder="Enter your password"
             />
             <ContinueButton onClick={handleSellerLogin}>LogIn</ContinueButton>
             {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
           </>
         )}
       

      {step === 5 && (
        <>
           <FirstContainer>
               <BackButton onClick={() => setStep(1)}>←</BackButton> 
               <LoginLogo src={BlinkItLogo} alt="Logo" />
             </FirstContainer>
             <SignUpP>Sign Up</SignUpP>
             
             <InputField
               type="text"
               value={sellerId}
               onChange={handleSellerId}
               placeholder="Enter your UserName"
             />
             <InputField
               type="password"
               value={sellerPw}
               onChange={handleSellerPw}
               placeholder="Enter your password"
             />
             <ContinueButton onClick={handleSellerSignUp}>SignUp</ContinueButton>
             {error && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
      )
      }
      </LoginDialogDiv>
     </LoginDialogOverlay>
      )}

      

      <CartDiv onClick={toggleCart}>
        <CartImg src={CartImage} alt="CartImage" />
        <Cart>My Cart</Cart>
      </CartDiv>

      <CartSideBar isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn}/>
    </CustomHeader>
  );
}

export default HomeHeader;
