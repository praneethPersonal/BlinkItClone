import { FooterDiv,FooterDivHeading,UseFulLinksHeading,CategoreisP,UsefulLinksDiv,UseLessInfo,UseFulLinksSubDiv,CategoriesSubDiv,LinksToPages,DownloadApp,PlayStore,LastLine } from "./StyledComponents/BodyStyledComponents"
import Gplay from "../Components/FooterPics/8ed033800ea38f24c4f0.jpg";
import AppStore from "../Components/FooterPics/d61019073b700ca49d22.jpg";
import SocialMedia from "../Components/FooterPics/Screenshot 2024-10-12 230120.png";
import { useQuery } from "@tanstack/react-query";

export function Footer(){

    
    const fetchData1 = async () => {
        const response = await fetch("http://localhost:5017/api/blinkit/Category/category");
        const data = await response.json();  
        return data;
    };
       
    const { isLoading:loadingForCat, isError:errorForCat, data:dataForCats } = useQuery({
        queryKey: ["fetchingfrombackendForCats"], 
        queryFn: fetchData1 
   });
    return(
        <>
        <FooterDiv>
<FooterDivHeading>
<UseFulLinksHeading>Useful Links</UseFulLinksHeading>
<CategoreisP>Categories</CategoreisP>
</FooterDivHeading>
        <UsefulLinksDiv>
            <UseFulLinksSubDiv>
                <p>About</p>
                <p>Careers</p>
                <p>Blog</p>
                <p>Press</p>
                <p>Lead</p>
                <p>Value</p>
            </UseFulLinksSubDiv>
            <UseFulLinksSubDiv>
                <p>Privacy</p>
                <p>Terms</p>
                <p>Faqs</p>
                <p>Security</p>
                <p>Mobile</p>
                <p>Contact</p>
            </UseFulLinksSubDiv>
            <UseFulLinksSubDiv>
                <p>Partner</p>
                <p>Franchise</p>
                
                <p>Seller</p>
                
                
                <p>Warehouse</p>
                <p>Deliver</p>
                <p>Resources</p>
            </UseFulLinksSubDiv>

            <CategoriesSubDiv>
                {dataForCats.map((iter,index)=>{
                    if (index<8){
                        return (
                            <p>{iter.category_name}</p>
                        )}})}
            </CategoriesSubDiv>
            <CategoriesSubDiv>
                {dataForCats.map((iter,index)=>{
                    if (index>7 & index < 16){
                        return (
                            <p>{iter.category_name}</p>
                        )}})}
            </CategoriesSubDiv>
            <CategoriesSubDiv>
                {dataForCats.map((iter,index)=>{
                    if (index>15 & index < 21){
                        return (
                            <p>{iter.category_name}</p>
                        )}})}
            </CategoriesSubDiv>
            </UsefulLinksDiv>
</FooterDiv>
<LinksToPages>
        <UseLessInfo>© Blink Commerce Private Limited, 2016-2024</UseLessInfo>
        <DownloadApp>Download App</DownloadApp>    
        <PlayStore src = {AppStore} alt="AppStore" />
        <PlayStore src = {Gplay} alt="PlayStore" />
        <PlayStore src = {SocialMedia} alt="SocialMEdia" />            
</LinksToPages>
<div>
    <LastLine>“Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.</LastLine>
</div>
        </>
    )
}

