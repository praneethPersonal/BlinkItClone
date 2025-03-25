import styled from "styled-components";

const CategoryList = styled.div`
display: flex;
margin-top: 90px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`

const EachCategory = styled.button`
padding: 10px 15px;
cursor: pointer;
borderRadius: 5px;
border:0;
margin-left: 35px;
margin-right: 30px;
background-color:white;
font-size:17px;
color: #666666;
margin-bottom:10px;
margin-top:7px;
`

const CategoryPageBody = styled.div`
display:flex;
margin-top:0;
`

const CategoryLeftBar = styled.div`
width: 400px;
display:flex;
flex-direction:column;
margin-left:15px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const CategoryPageCategoryImg = styled.img`
width:60px;
margin-top:15px;
margin-left:10px;
margin-bottom:15px;
`
const EachCategoryDiv = styled.div`
 background-color: ${({ isActive }) => (isActive ? '#EBFFEF' : 'transparent')};
display:flex;
box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1);
// justify-content:center;
// align-items:center;
`

const EachCategoryName = styled.p`
margin-left:15px;
margin-top:35px;
cursor:pointer;
font-family: Helvetica;
`

const EachCategoryButton = styled.button`
background-color:white;
border:0;
height: 10px;
`
const CategoryMainDiv = styled.div`
display:flex;
flex-wrap:wrap;
background-color:#F5F5F5;
`

const CategoryMainDivTotal = styled.div`
display:flex;
height: 1300px;
width:1500px;
flex-direction:column;
`

const BuyOnlineP = styled.p`
margin-left: 10px;
font-weight: bold;
font-family: Helvetica;
`

const BuyOnlineHeader = styled.div`
display:flex;
justify-content: space-between;
`

const FilterDiv = styled.div`
display:flex;
`

const FilterDropDown = styled.select`
width:170px;
border: 0;
box-shadow: 0px 2px rgba(0, 0, 0, 0.1);
height: 30px;
margin-top: 10px;
margin-right:20px;
color: #74c191;
margin-left: 13px;

`

const FilterDropDownName = styled.p`

`
export {CategoryList,EachCategory,BuyOnlineHeader,FilterDropDownName,FilterDropDown,CategoryMainDivTotal,CategoryMainDiv,FilterDiv,EachCategoryButton,CategoryPageCategoryImg,CategoryPageBody,CategoryLeftBar,EachCategoryDiv,EachCategoryName,BuyOnlineP}