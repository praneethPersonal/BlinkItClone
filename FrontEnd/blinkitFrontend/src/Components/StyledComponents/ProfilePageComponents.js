import styled from "styled-components";

const MainDiv = styled.div`
width: 990px;
margin-left:130px;
margin-top:120px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
// height:500px;
display:flex;
`
const LeftDivProfile = styled.div`
width:260px;
border-right: 2px solid #F0F0F0;
`
const RightDivProfile = styled.div`
width:734px;
`

const NumberDiv = styled.div`
  border-bottom: 2px solid #F0F0F0;
  height: 84.86px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileDivs = styled.div`
  border-bottom: 2px solid #F0F0F0;
  height: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${({ active }) => (active ? '#F5F5F5' : 'white')}; /* Active background color */
  cursor: pointer;

  &:hover {
    background-color: #F0F0F0; /* Slightly darker background on hover */
  }
`;

const ProfileNumberP = styled.p`
  color: #333333;
  font: 14px Okra, Helvetica;
`;

const ProfilePageLeftDivImg = styled.img`
width:25px;
margin-left:15px;
margin-right:10px;
`

const OrderDiv = styled.div`
border-bottom:2px solid #F0F0F0;
display:flex;
padding-bottom:10px;
padding-top:10px;

`
const OrdersFUllDIv = styled.div`
padding-left:60px;
padding-top:30px;

`

const OrderPicImg = styled.img`
width: 40px;
height:40px;
margin-top:7px;
margin-right:10px;
`

const ProductName = styled.p`
font: 14px Okra, Helvetica;
margin-bottom:0;
margin-top:10px;
`

const OrderPrice = styled.p`
font: 12px Okra, Helvetica;
color: #666666;
margin-top:4px;
margin-left: 6px;
`

const AddressContainer = styled.div`
  margin-top: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  background-color: #D3D3D3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
margin-right:10px;
  &:hover {
    background-color: #0C831F;
  }
`;

const AddressList = styled.div`
  margin-top: 10px;
`;

const AddressItem = styled.div`
border-bottom:2px solid #F0F0F0;
display:flex;
padding-bottom:10px;
padding-top:10px;
`;

const AddressesHeading = styled.h3`
font: 21px Okra, Helvetica;
color: #1C1C1C;
margin-bottom: 5px;
`

const AddressesDiv = styled.div`
padding-left:20px;
`

const AddNewAddress = styled.p`
color: #267E3E;
font: 15px Okra, Helvetica;
margin-top:10px;
margin-bottom: 0px;
`

const EachAddressItem = styled.p`
color: #828282;
font: 15px Okra, Helvetica;
margin-bottom: 4px;
margin-top: 4px;
`

const PasswordChangeContainer = styled.div`
  margin-top: 20px;
  display:flex; 
  flex-direction:column;
`;

const ChangePasswordButton = styled.button`
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;
export {MainDiv,AddressesDiv,PasswordChangeContainer,ChangePasswordButton,ErrorMessage,SuccessMessage,EachAddressItem,AddNewAddress,ProductName,AddressesHeading,OrderPrice,AddressContainer,InputContainer,Input,AddButton,AddressList,AddressItem,ProfilePageLeftDivImg,OrderPicImg,OrdersFUllDIv,OrderDiv,ProfileDivs,ProfileNumberP,NumberDiv,LeftDivProfile,RightDivProfile} 