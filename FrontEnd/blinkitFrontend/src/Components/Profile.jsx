import React, {useState,useEffect} from "react";
import HomeHeader from "./HomeHeader";
import {RightDivProfile,LeftDivProfile,MainDiv,OrderDiv,
    SuccessMessage,PasswordChangeContainer,ChangePasswordButton,ErrorMessage,
    ProfileDivs,NumberDiv,ProfileNumberP,ProfilePageLeftDivImg,OrdersFUllDIv,OrderPicImg,ProductName,OrderPrice,EachAddressItem,
    AddressContainer,InputContainer,Input,AddButton,AddressList,AddressItem,AddressesHeading,AddressesDiv,AddNewAddress
} from "./StyledComponents/ProfilePageComponents"
import { useQuery } from "@tanstack/react-query";
import first from "./ProfilePics/first.png"
import second from "./ProfilePics/second.png"
import third from "./ProfilePics/third.png"
import fourth from "./ProfilePics/fourth.png"
import OrderPic from "./Photos/orderpage.jpg"
import { useNavigate } from "react-router-dom";


export function ProfilePage({isLoggedIn,setShowLoginDialog,setIsLoggedIn,showLoginDialog}){
    const [activeDiv, setActiveDiv] = useState(1); 

    const [orders, setOrders] = useState([]); // Store fetched orders here
    const [error, setError] = useState(null); // For error handling
    const [showAddressInput, setShowAddressInput] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
 
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // React Router's hook for navigation

  // Logout function: removes the JWT token and redirects to the home page
  const handleLogoutClick = () => {
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('jwtToken'); 
 
    navigate('/'); // Redirect to the home page
  };


  const handleAccountPrivacyClick = () => {
    setActiveDiv(3);
    setShowPasswordChange((prev) => !prev); // Toggle visibility of password change form
    setShowAddressInput(false); // Hide address input form
  };


    useEffect(() => {
      // Load addresses from local storage when the component mounts
      const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
      setAddresses(storedAddresses);

    }, []);
  
    const handleAddressChange = (e) => {
      setNewAddress(e.target.value);
    };
  
    const handleAddAddress = () => {
        if (newAddress.trim()) {
          const existingAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
          const updatedAddresses = [...existingAddresses, newAddress.trim()];
          localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
          setAddresses(updatedAddresses);
          setNewAddress('');
        }
      };

      const handleMyAddressesClick = () => {
        setActiveDiv(1);
        setShowAddressInput((prev) => !prev); // Toggle visibility of address input
      };
      
   

    const fetchData2 = async () => {
        const response = await fetch("http://localhost:5017/api/blinkit/Product/products");
        const data = await response.json();
        return data;
      };

    const { isLoading: loadingForProds, data: dataForProds } = useQuery({
        queryKey: ["fetchingfrombackendForProds"],
        queryFn: fetchData2,
      });
    
   
  
    const handleMyOrdersClick = async () => {
      setActiveDiv(2); // Set the active div for "My Orders"
  
      const token = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
      if (!token) {
        setError('Please login first!');
        return;
      }
     
      try {
        const response = await fetch('https://localhost:7081/api/BlinkIt/products-bought', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token in headers
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          
          setOrders(data); // Save the fetched orders
          setError(null); // Clear any previous error
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (err) {
        setError('An error occurred while fetching orders.');
      }
    };

    

    
  if(loadingForProds){
    return("Its Loading")
  }
    
    const findProductDetails = (orderId) => {
      if(loadingForProds){
        return([])
      }
        return dataForProds.find((product) => product.product_name === orderId);
      };


    

    const handleChangePassword = async () => {
    const token = localStorage.getItem('jwtToken'); 
    if (token) {
      try {
        const response = await fetch('https://localhost:7081/api/BlinkIt/changePassword', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        });

        if (response.ok) {
          setSuccess("Password changed successfully.");
          setError(null);
          setCurrentPassword('');
          setNewPassword('');
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Error changing password.");
          setSuccess(null);
        }
      } catch (err) {
        console.error('Error during password change:', err);
        setError("An error occurred. Please try again.");
        setSuccess(null);
      }
    }
  };

    return(
        <>
        <HomeHeader isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog}/> 
        <MainDiv>
        <LeftDivProfile>
       
        <NumberDiv>
          <ProfileNumberP>+91 1234567890</ProfileNumberP>
        </NumberDiv>

        <ProfileDivs onClick={() => setActiveDiv(1)} active={activeDiv === 1}>
          <ProfilePageLeftDivImg src={first} alt="first" />
          <ProfileNumberP>My Addresses</ProfileNumberP>
        </ProfileDivs>

        <ProfileDivs onClick={handleMyOrdersClick} active={activeDiv === 2}>
          <ProfilePageLeftDivImg src={second} alt="second" />
          <ProfileNumberP>My Orders</ProfileNumberP>
        </ProfileDivs>

        <ProfileDivs onClick={() => setActiveDiv(3)} active={activeDiv === 3}>
          <ProfilePageLeftDivImg src={third} alt="third" />
          <ProfileNumberP>Account Privacy</ProfileNumberP>
        </ProfileDivs>

        <ProfileDivs onClick={() => handleLogoutClick()} active={activeDiv === 4}>
          <ProfilePageLeftDivImg src={fourth} alt="fourth" />
          <ProfileNumberP>Logout</ProfileNumberP>
        </ProfileDivs>
      
        </LeftDivProfile>
        <RightDivProfile>

        {activeDiv === 2 && (
          <OrdersFUllDIv>
              {orders && orders.map((order, index) => {
                {console.log(orders,"orders")}
                const productDetails = findProductDetails(order);
                console.log(productDetails)
                return (
                  <OrderDiv key={index}>

                        <OrderPicImg src={OrderPic} alt="order" />
                        <div>
                        <ProductName> {productDetails.product_name}</ProductName>
                        <OrderPrice> ₹{productDetails.price}</OrderPrice>
                        </div>
                                            
                  </OrderDiv>
                );
              })}

          </OrdersFUllDIv>
        )}

        {activeDiv === 1 && (
            <AddressesDiv>
            <AddressesHeading>My Addresses</AddressesHeading>
            <AddNewAddress>+ Add New Adresss</AddNewAddress>
             <AddressContainer>
             <InputContainer>
               <Input
                 type="text"
                 value={newAddress}
                 onChange={handleAddressChange}
                 placeholder="Enter your address"
               />
               <AddButton onClick={handleAddAddress}>Add Address</AddButton>
             </InputContainer>
             <AddressList>
               <AddressesHeading>Saved Addresses:</AddressesHeading>
               {addresses.length > 0 ? (
                 addresses.map((address, index) => <AddressItem key={index}><EachAddressItem>{address}</EachAddressItem></AddressItem>)
               ) : (
                 <p>No addresses saved.</p>
               )}
             </AddressList>
           </AddressContainer>
            </AddressesDiv>            
        )}
         {activeDiv==3 && (
        <PasswordChangeContainer>
          <InputContainer>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
            />
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <ChangePasswordButton onClick={handleChangePassword}>Change Password</ChangePasswordButton>
          </InputContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </PasswordChangeContainer>)}
        </RightDivProfile>
        </MainDiv>
        </>
    )
}