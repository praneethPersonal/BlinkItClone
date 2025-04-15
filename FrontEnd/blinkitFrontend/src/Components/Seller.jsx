import React,{useState,useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import logo from "../Components/Photos/download.png";
import { CustomHeader, LogoDivImg } from "./StyledComponents/HeaderStyledComponents";
import styled from "styled-components";
import { LeftDivProfile, MainDiv, ProfileDivs, ProfileNumberP, ProfilePageLeftDivImg, RightDivProfile } from "./StyledComponents/ProfilePageComponents";
import { CategorySelect, SellerPageContainer, Title, CategoryTitle, Section, Input, Button, ProfileNumberPSeller } from "./StyledComponents/SellerStyledCOmponents";


const TrackingContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;


const OrderCard = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  margin-top: 15px;
  padding: 15px;
  border-radius: 8px;
`;

const OrderItem = styled.div`
  padding: 5px 0;
`;

const OrderInfo = styled.div`
  font-weight: bold;
`;

export function SellerPersona() {
  const [activeDiv, setActiveDiv] = useState(1);
  const [stockUpdates, setStockUpdates] = useState({});
  const [sellerName, setSellerName] = useState("");  
  const [orders, setOrders] = useState([]);
  const [fetchProducts, setFetchProducts] = useState(false);
  
  
  
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    category_id: "",
    price: null,
    stock: null,
    unit: "",
    photo_url: "null",
    discountedPrice: "",
    sellerName: "", 
  });
  
  // Fetch categories
  const fetchData1 = async () => {
    const response = await fetch("http://localhost:5017/api/blinkit/Category/category");
    const data = await response.json();
    return data;
  };


  const { isLoading: loadingForCat, data: dataForCats } = useQuery({
    queryKey: ["fetchingfrombackendForCats"],
    queryFn: fetchData1,
  });


  
  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://localhost:7081/api/BlinkIt/addProduct', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const token = localStorage.getItem("jwtTokenSeller")

      const responseForSeller = await fetch('https://localhost:7081/api/BlinkIt/seller/addProducts', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "products": newProduct.product_name
        }),
      });
      

      if (!response.ok || !responseForSeller.ok) {
        throw new Error("Failed to add product");
      }

      alert("Product successfully added!");
      window.location.reload();

    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try .");
    }
  };
  
  const fetchProductDetails = async (productName) => {
  const response = await fetch(`https://localhost:7081/api/BlinkIt/product?productName=${productName}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};


const fetchProductsBySeller = async () => {
  const token = localStorage.getItem("jwtTokenSeller")
  const response = await fetch("https://localhost:7081/api/BlinkIt/getProductsBySeller", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },

  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

const { isLoading: LoadingForSellerProducts, data: fetchedProductsBySeller } = useQuery({
  queryKey: ["fetchingProductsBySeller"],
  queryFn: fetchProductsBySeller,
});
  
console.log(fetchedProductsBySeller)
 
  const [productStocks, setProductStocks] = useState({});
  const [newStock, setNewStock] = useState({}); // State to hold new stock input




  useEffect(() => {
    if (fetchedProductsBySeller) {
      const fetchStocks = async () => {
        const stocks = {};
        for (const productName of fetchedProductsBySeller) {
          try {
            const productDetails = await fetchProductDetails(productName);
            stocks[productName] = productDetails.stock; 
          } catch (error) {
            console.error("Error fetching product details:", error);
          }
        }
        setProductStocks(stocks); 
      };

      fetchStocks();
    }
  }, [fetchedProductsBySeller]);






  const handleLogout =()=>{
    localStorage.removeItem("sellerId")
    localStorage.removeItem("jwtTokenSeller")
    window.location.replace("/")

  }


  const updateProductStock = async (productName, newStock) => {
    const response = await fetch('https://localhost:7081/api/BlinkIt/updateStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name: productName,
        newStock: newStock,
      }),
    });
  console.log(response)
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update stock: ${errorDetails}`);
    }
  
    return response.json(); 
  };
  
  const handleUpdateStock = async (productName) => {
    try {
      const stockToUpdate = newStock[productName];
  
      await updateProductStock(productName, stockToUpdate);
      
      const updatedProductDetails = await fetchProductDetails(productName);
      setProductStocks((prevStocks) => ({
        ...prevStocks,
        [productName]: updatedProductDetails.stock, // Update stock in the state
      }));
  
      alert(`Stock for ${productName} updated successfully`);
  
    } catch (error) {
      console.error("Error updating stock:", error);
      // alert(`Error updating stock for ${productName}: ${error.message}`);
    }
  };

  const fetchUserDetails = async () => {
    const response = await fetch('https://localhost:7081/api/BlinkIt/getAllUserDetails')
    return response.json(); 
  };


  const {isLoading:LoadingForUser, data:UserDetails} = useQuery({
    queryKey: ["fetchingUserDetails"],
    queryFn: fetchUserDetails,
  });
  const result ={}
  
  fetchedProductsBySeller&&fetchedProductsBySeller.forEach((product) => {
    // Loop through each user in array1
    UserDetails && UserDetails.forEach((user) => {
      if (user.productsBought.includes(product)) {
        // If the product is bought by the user, add their mobile number to the result
        if (!result[product]) {
          result[product] = [];
        }
        result[product].push(user.mobileNumber);
      }
    });
  });
  console.log(result,22)

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Convert the image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // this is the base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = 
       preview.split(",")[1] // Extracting Base64 part
  
    setNewProduct({...newProduct,photo_url:formData})
  };
  console.log(newProduct)


  if (loadingForCat ) {
    return <div>Loading...</div>;
  }

  

 

  return (
    <div>
      <CustomHeader>
        <Link to="/" onClick={() => localStorage.removeItem('cartProducts')}>
          <div>
            <LogoDivImg src={logo} alt="Logo" />
          </div>
        </Link>
      </CustomHeader>

    <MainDiv>
        <LeftDivProfile>
          <ProfileDivs onClick={() => setActiveDiv(1)} active={activeDiv === 1}>
            <ProfileNumberPSeller>Add New Product</ProfileNumberPSeller>
          </ProfileDivs>

          <ProfileDivs onClick={() => setActiveDiv(2)} active={activeDiv === 2}>
            <ProfileNumberPSeller>Update Stock</ProfileNumberPSeller>
          </ProfileDivs>

          <ProfileDivs onClick={() => setActiveDiv(3)} active={activeDiv === 3}>
            <ProfileNumberPSeller>Track Orders</ProfileNumberPSeller>
          </ProfileDivs>

          <ProfileDivs onClick={handleLogout}>
            <ProfileNumberPSeller>Log Out</ProfileNumberPSeller>
          </ProfileDivs>


        </LeftDivProfile>
        
        


         <RightDivProfile>
          {activeDiv === 1 && (
            <SellerPageContainer>
              <Title>Seller Dashboard</Title>
  
              <Section>
                <CategoryTitle>Add New Product</CategoryTitle>

                <CategorySelect
                  value={newProduct.category_id}
                  onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {dataForCats.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category_name}
                    </option>
                  ))}
                </CategorySelect> */
         <Input
        type="text"
           placeholder="Product Name"
           value={newProduct.product_name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, product_name: e.target.value })
          }
        />

        
       <Input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />

  
        
        <Input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
        />

      
         <Input
          type="text"
          placeholder="Unit"
          value={newProduct.unit}
          onChange={(e) =>
            setNewProduct({ ...newProduct, unit: e.target.value })
          }
        />
         
      
         <Input
          type="text"
          placeholder="Discounted Price"
          value={newProduct.discountedPrice}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discountedPrice: e.target.value })
          }
        />

<form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {preview && <img src={preview} alt="Preview" width="200px" />}
    </form>


        <Button onClick={handleAddProduct}>Add Product</Button>
      </Section>
           </SellerPageContainer>
       
        )}
{activeDiv === 2 && (
  <SellerPageContainer>
    <Section>
      {Object.entries(productStocks).map(([productName, stock]) => (
        <div key={productName}>
          <p>{productName}</p>
          <p>Current Stock: {stock}</p>
          <input
            type="number"
            min="0"
            placeholder="Enter new stock"
            value={newStock[productName] || ""} // Ensure the newStock for each product is accessed correctly
            onChange={(e) =>
              setNewStock((prevState) => ({
                ...prevState,
                [productName]: e.target.value, // Update the stock for the specific product
              }))
            }
          />
          <button onClick={() => handleUpdateStock(productName)}>Update Stock</button>
        </div>
      ))}
    </Section>
  </SellerPageContainer>
)}

{activeDiv == 3 &&(
  <Section>
     {Object.keys(result).length > 0 ? (
        Object.entries(result).map(([product, mobileNumbers]) => (
          <div key={product}>
            <h2>{product}</h2>
            <p>Mobile Numbers:</p>
            <ul>
              {mobileNumbers.map((number) => (
                <li key={number}>{number}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No matching products found</p>
      )}
  </Section>
)}

    
        </RightDivProfile>


    </MainDiv>
        </div> 
      );
   
}