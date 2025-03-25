
import styled from "styled-components";
const SellerPageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  color: #333;
  font: 24px Okra, Helvetica;
  padding-bottom:20px;
 border-bottom: 2px solid #e0e0e0;
`;
const CategoryTitle = styled.h2`
   color: #4a4a4a;
   font: 20px Helvetica;    

`

const Section = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;

`;



const Button = styled.button`
  background-color: #cccccc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
    margin-left:10px;
  &:hover {
    background-color: #0C831F;
  }
`;

const ProfileNumberPSeller = styled.p`
  color: #333333;
  font: 14px Okra, Helvetica;
  margin-left:20px;
`;

const CategorySelect = styled.select`
height: 35px;`


export {CategorySelect,SellerPageContainer,Title,CategoryTitle,Section,Input,Button,ProfileNumberPSeller}