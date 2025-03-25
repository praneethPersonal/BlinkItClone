import React, { useEffect, useState ,useCallback} from "react";
import PaanCorner from "../Components/TempComponents/first_div.png";
import PetCare from "../Components/TempComponents/Pet-Care_WEB.jpg";
import BabyCare from "../Components/TempComponents/babycare-WEB.jpg";
import Pharmacy from "../Components/TempComponents/pharmacy-WEB.jpg";
import milkPacket from "../Components/TempComponents/8f2eb870-8e57-43f2-b770-e23a2d9a2163.jpg";

import {
  Add1,
  Add2,
  DiscountPriceDiv,
  DiscountBanner,
  CategoryNameStart,
  SeeAllP,
  InitialAddToCart,
  CategoryDIvisionAll,
  AddDiv,
  CatDiv,
  AddToCartNumber,
  CatImg,
  LastLine,
  AddToCart,
  Catdata,
  CatSubDiv,
  CatDataDiv,
  DownloadApp,
  PlayStore,
  PriceDiv,
  UseFulLinksHeading,
  LinksToPages,
  UseLessInfo,
  AddToCartDiv,
  FooterDivHeading,
  CategoriesSubDiv,
  UseFulLinksSubDiv,
  UsefulLinksDiv,
  ProductImage,
  FooterDiv,
  ProductUnit,
  BottomDivInProduct,
  ProductsCategoryWise,
  EachProductDiv,
  ProductImageDiv,
  ProductName,OriginalPrice,DiscountedPrice
} from "./StyledComponents/BodyStyledComponents.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryImage from "../Components/TempComponents/paan-corner_web.jpg";
import { Link } from "react-router-dom";
import { Footer } from "./Footer.jsx";



function HomeDiv() {
  const queryClient = useQueryClient();

  const fetchData1 = async () => {
    const response = await fetch("http://localhost:5017/api/BlinkIt/Category/category");
    const data = await response.json();
    return data;
  };

  const fetchData2 = async () => {
    const response = await fetch("http://localhost:5017/api/BlinkIt/Product/products");
    const data = await response.json();
    return data;
  };

  const { isLoading: loadingForCat, data: dataForCats } = useQuery({
    queryKey: ["fetchingfrombackendForCats"],
    queryFn: fetchData1,
  });

  const { isLoading: loadingForProds, data: dataForProds } = useQuery({
    queryKey: ["fetchingfrombackendForProds"],
    queryFn: fetchData2,
  });

  const handleAddToCart = (product) => {
  
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    
    const existingProduct = storedCart.find(
      (item) => item.product_name === product.product_name
    );

    let updatedCart;
    if (existingProduct) {
     
      updatedCart = storedCart.map((item) =>
        item.product_name === product.product_name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
 
      updatedCart = [...storedCart, { product_name: product.product_name, quantity: 1 }];
    }

 
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    queryClient.invalidateQueries(["fetchingfrombackendForCart"]);
  };

  const handleRemoveFromCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];

    const existingProduct = storedCart.find(
      (item) => item.product_name === product.product_name
    );

    let updatedCart;

    if (existingProduct && existingProduct.quantity > 1) {
      updatedCart = storedCart.map((item) =>
        item.product_name === product.product_name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    } else {
      updatedCart = storedCart.filter((item) => item.product_name !== product.product_name);
    }
    localStorage.setItem("cartProducts", JSON.stringify(updatedCart));
    queryClient.invalidateQueries(["fetchingfrombackendForCart"]);
  };

  const fetchDataForCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    return storedCart;
  };

  const { isLoading: loadingForCart, data: dataForCart } = useQuery({
    queryKey: ["fetchingfrombackendForCart"],
    queryFn: fetchDataForCart,
  });

  const getProductQuantity = (productId) => {
    const productInCart = dataForCart?.find(
      (item) => item.product_name === productId
    );
    return productInCart ? productInCart.quantity : 0;
  };

 

  


  const FuncToGetEachProdDetails = (id) => {
    return (
      <>
        {dataForProds && dataForProds.map((iter) => {
          if (iter.category_id === id) {
            return (
              <EachProductDiv key={iter._id}>
                {getProductQuantity(iter.product_name) >= iter.stock ? (
                  <div style={{ position: 'relative', textAlign: 'center' }}>
                  
                  <p style={{
                          position: 'absolute',
                          top: '20%', 
                          left: '50%', 
                          transform: 'translate(-50%, -50%) rotate(-45deg)', 
                          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                          color: '#D9D9D9',
                          fontSize: '27px',
                          padding: '10px',
                          zIndex: 1, 
                        }}>
    Stock Over
  </p>
                
                  <ProductImageDiv>
                  {iter.photo_url != null ? (<ProductImage src={`data:image/jpeg;base64,${iter.photo_url}`} alt="Image" />) : (

<ProductImage src={milkPacket} alt="productImage" />
)}
                  </ProductImageDiv>
                
                  <Link
                    to={`/${iter.product_name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ProductName>{iter.product_name}</ProductName>
                  </Link>
                
                  <ProductUnit>one {iter.unit}</ProductUnit>
                  
                  <BottomDivInProduct>
                    <PriceDiv>
                      <p>₹{iter.price}</p>
                    </PriceDiv>
                    <AddToCartDiv>
                      {getProductQuantity(iter.product_name) === 0 ? (
                        <InitialAddToCart
                          type="button"
                          onClick={() => handleAddToCart(iter)}
                          value="Add"
                        />
                      ) : (
                        <>
                          <AddToCart
                            type="button"
                            onClick={() => handleRemoveFromCart(iter)}
                            value="-"
                          />
                          <AddToCartNumber>
                            {getProductQuantity(iter.product_name)}
                          </AddToCartNumber>
                          <AddToCart type="button" value="+" />
                        </>
                      )}
                    </AddToCartDiv>
                  </BottomDivInProduct>
                </div>
                ) : (
                  <>
                    <ProductImageDiv>
                      {iter.discountedPrice !== null && (
                        <DiscountBanner>
                          {Math.round(
                            ((iter.price - iter.discountedPrice) / iter.price) *
                              100
                          )}
                          % OFF
                        </DiscountBanner>
                      )}
                      {iter.photo_url != null ? (<ProductImage src={`data:image/jpeg;base64,${iter.photo_url}`} alt="Image" />) : (

<ProductImage src={milkPacket} alt="productImage" />
)}
                    </ProductImageDiv>

                    <Link
                      to={`/${iter.product_name}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <ProductName>{iter.product_name}</ProductName>
                    </Link>
                    <ProductUnit>one {iter.unit}</ProductUnit>
                    <BottomDivInProduct>
                      <PriceDiv>
                        {/* Check if discountedPrice is not null and show original price with strikethrough */}
                        {iter.discountedPrice !== null ? (
                          <DiscountPriceDiv>
                            <OriginalPrice>₹{iter.price}</OriginalPrice>
                            <DiscountedPrice>
                              ₹{iter.discountedPrice}
                            </DiscountedPrice>
                          </DiscountPriceDiv>
                        ) : (
                          <p>₹{iter.price}</p> // Show original price when discountedPrice is null
                        )}
                      </PriceDiv>
                      <AddToCartDiv>
                        {getProductQuantity(iter.product_name) === 0 ? (
                          <InitialAddToCart
                            type="button"
                            onClick={() => handleAddToCart(iter)}
                            value="Add"
                          />
                        ) : (
                          <>
                            <AddToCart
                              type="button"
                              onClick={() => handleRemoveFromCart(iter)}
                              value="-"
                            />
                            <AddToCartNumber>
                              {getProductQuantity(iter.product_name)}
                            </AddToCartNumber>
                            <AddToCart
                              type="button"
                              onClick={() => handleAddToCart(iter)}
                              value="+"
                            />
                          </>
                        )}
                      </AddToCartDiv>
                    </BottomDivInProduct>
                  </>
                )}
              </EachProductDiv>
            );
          }
          return null;
        })}
      </>
    );
  };


  // const cachedFn = useCallback(FuncToGetEachProdDetails, [])


  if (loadingForCat || loadingForProds) {
    return <p>Wait!!! It's Loading</p>;
  }


  return (
    <div>
      <Link
        to={`/category/Party Supplies`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Add1 src={PaanCorner} alt="advertisement" />
      </Link>

      <AddDiv>
        <Link
          to={`/category/Personal Care`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Add2 src={Pharmacy} alt="advertisement" />
        </Link>
        <Link
          to={`/category/Pet Supplies`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Add2 src={PetCare} alt="advertisement" />
        </Link>
        <Link
          to={`/category/Baby Care`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Add2 src={BabyCare} alt="advertisement" />
        </Link>
      </AddDiv>

      <CatDiv>
        {dataForCats.map((iter, index) => (
          <Link
            to={`/category/${iter.category_name}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <CatSubDiv key={index}>
              <CatImg src={CategoryImage} alt="categoryImage" />
              <CatDataDiv>
                <Catdata>{iter.category_name}</Catdata>
              </CatDataDiv>
            </CatSubDiv>
          </Link>
        ))}
      </CatDiv>

      <div>
        {dataForCats.map((iter, index) => {
          if (index < 5) {
            return (
              <>
                <CategoryDIvisionAll>
                  <CategoryNameStart>{iter.category_name}</CategoryNameStart>
                  <Link
                    to={`/category/${iter.category_name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <SeeAllP>see all</SeeAllP>
                  </Link>
                </CategoryDIvisionAll>

                <ProductsCategoryWise id={index}>
                  {FuncToGetEachProdDetails(iter._id)}
                </ProductsCategoryWise>
              </>
            );
          }
          return null;
        })}
      </div>

      <Footer />
    </div>
  );
}

export default HomeDiv;
