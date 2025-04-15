import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import milkPacket from "../Components/TempComponents/8f2eb870-8e57-43f2-b770-e23a2d9a2163.jpg";
import {
  EachProductDiv,
  ProductImageDiv,
  AddToCart,
  AddToCartNumber,
  AddToCartDiv,
  PriceDiv,
  BottomDivInProduct,
  ProductUnit,
  ProductName,
  ProductImage,
  InitialAddToCart,
  DiscountedPrice,
  DiscountPriceDiv,
  DiscountBanner,
  OriginalPrice,
} from "./StyledComponents/BodyStyledComponents";
import {
  CategoryList,
  EachCategory,
  CategoryPageBody,
  EachCategoryName,
  CategoryMainDiv,
  EachCategoryButton,
  FilterDropDown,
  FilterDiv,
  CategoryLeftBar,
  FilterDropDownName,
  CategoryPageCategoryImg,
  EachCategoryDiv,
  BuyOnlineHeader,
  CategoryMainDivTotal,
  BuyOnlineP,
} from "./StyledComponents/CategoryPageComponents";
import CategoryImage from "../Components/TempComponents/paan-corner_web.jpg";

export function CategoryPage({isLoggedIn,setShowLoginDialog,setIsLoggedIn,showLoginDialog}) {
  const queryClient = useQueryClient();
  const { categoryName } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState("default");

  console.log(categoryName);

  const fetchDataForCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    return storedCart;
  };

  const { isLoading: loadingForCart, data: dataForCart } = useQuery({
    queryKey: ["fetchingfrombackendForCart"],
    queryFn: fetchDataForCart,
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
  const fetchData1 = async () => {
    const response = await fetch("http://localhost:5017/api/blinkit/Category/category");
    const data = await response.json();
    return data;
  };

  const fetchData2 = async () => {
    const response = await fetch("http://localhost:5017/api/blinkit/Product/products");
    const data = await response.json();
    return data;
  };

  const {
    isLoading: loadingForCat,
    isError: errorForCat,
    data: dataForCats,} = useQuery({
    queryKey: ["fetchingfrombackendForCats"],
    queryFn: fetchData1,
  });


  const {
    isLoading: loadingForProds,
    isError: errorForProds,
    data: dataForProds,
  } = useQuery({
    queryKey: ["fetchingfrombackendForProds"],
    queryFn: fetchData2,
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (dataForCats && categoryName) {
      const matchedCategory = dataForCats.find(
        (cat) => cat.category_name === categoryName
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory._id);
      }
    }
  }, [dataForCats, categoryName]);

  const getFilteredProducts = () => {
    switch (filter) {
      case "priceLowToHigh":
        return [...dataForProds].sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return [...dataForProds].sort((a, b) => b.price - a.price);
      case "aToZ":
        return [...dataForProds].sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        );
      default:
        return dataForProds;
    }
  };
  if (loadingForCat) {
    return <p>Wait!!! its Loading</p>;
  }

  if (loadingForProds) {
    return <p>Wait!!! its Loading</p>;
  }


  const First7Categories = dataForCats.slice(0, 7);

  const getProductQuantity = (productId) => {
    const productInCart = dataForCart.find(
      (item) => item.product_name === productId
    );
    return productInCart ? productInCart.quantity : 0;
  };

  return (
    <>
      <HomeHeader isLoggedIn={isLoggedIn} setShowLoginDialog={setShowLoginDialog} setIsLoggedIn={setIsLoggedIn} showLoginDialog={showLoginDialog} />
      <CategoryList>
        {First7Categories.map((category) => {
          return (
            <Link
              to={`/category/${category.category_name}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <EachCategory
                key={category.category_name}
                onClick={() => setSelectedCategory(category._id)}
              >
                {category.category_name}
              </EachCategory>
            </Link>
          );
        })}
      </CategoryList>

      <CategoryPageBody>
        <CategoryLeftBar>
          {dataForCats.map((iter) => {
            return (
              <Link
                  to={`/category/${iter.category_name}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
              <EachCategoryDiv
              isActive={selectedCategory === iter._id}
              >
                <CategoryPageCategoryImg
                  src={CategoryImage}
                  alt="categoryImage"
                />
                {/* <EachCategoryButton> */}
                
                  <EachCategoryName>
                    {iter.category_name}
                  </EachCategoryName>
               

                {/* </EachCategoryButton> */}
              </EachCategoryDiv>
              </Link>
            );
          })}
        </CategoryLeftBar>
        <CategoryMainDivTotal>
          <BuyOnlineHeader>
            <BuyOnlineP>
              Buy{" "}
              {dataForCats
                .map((iter) => {
                  if (iter._id == selectedCategory) return iter.category_name;
                })
                .filter((it) => it)}{" "}
              Online
            </BuyOnlineP>
            <FilterDiv>
              <p>Sort By</p>

              <FilterDropDown onChange={handleFilterChange}>
                <option value="default">Relevance</option>
                <option value="priceLowToHigh">Price (Low to High)</option>
                <option value="priceHighToLow">Price (High to Low)</option>
                <option value="aToZ">A to Z</option>
              </FilterDropDown>
            </FilterDiv>
          </BuyOnlineHeader>

          <CategoryMainDiv>
            {getFilteredProducts().map((iter) => {
              if (iter.category_id == selectedCategory) {
                return (
                  <EachProductDiv key={iter._id}>
                    {getProductQuantity(iter.product_name) >= iter.stock ? (
                      <div
                        style={{ position: "relative", textAlign: "center" }}
                      >
                        {/* Stock Over indicator */}
                        <p
                          style={{
                            position: "absolute",
                            top: "20%", // Adjust this to position vertically
                            left: "50%", // Center horizontally
                            transform: "translate(-50%, -50%) rotate(-45deg)", // Center and rotate
                            backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
                            color: "#D9D9D9",
                            fontSize: "27px",
                            padding: "10px",
                            zIndex: 1, // Ensure it sits above other content
                          }}
                        >
                          Stock Over
                        </p>

                        <ProductImageDiv>
                        {iter.photo_url != null ? (

                          <ProductImage src={`data:image/jpeg;base64,${iter.photo_url}`} alt="Image" />
                   

) : (
  <>

    <ProductImage src={milkPacket} alt="productImage" />
  </>
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
                                ((iter.price - iter.discountedPrice) /
                                  iter.price) *
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
            })}
          </CategoryMainDiv>
        </CategoryMainDivTotal>
      </CategoryPageBody>
    </>
  );
}
