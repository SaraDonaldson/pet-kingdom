'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { createProduct} from "@/lib/functions/createProduct";
import { Product } from "@/lib/types/Product";
import { getAllProducts } from "@/lib/functions/getAllProducts";
import { getAllCategories } from "@/lib/functions/getAllCategories";


export default function AddProduct() {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [inventory, setInventory] = useState(0);
    const [inventoryWarning, setInventoryWarning] = useState(0);
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage]= useState("")
    const  [categories, setCategories] = useState([{
    catId:"",
    name: "",
  }]);
  const [productList, setProductList]= useState([{}])
// name: "",
// categoryId: "", 
// description:"",
// inventory: 0,
// inventoryWarning: "",
// price:"",
// imageUrl:"",

useEffect(() => {
getProductsList();
}, [])

useEffect(() => {
    getCategoryInfo();
    }, [])



const getProductsList = async () => {
   try {
    let getProducts = await getAllProducts();
    let productString= JSON.stringify(getProducts);
    let parsedProducts= productString && JSON.parse(productString)
   
    let productsMapped=parsedProducts.map((p:any)=> 
    {return  {id:p.id, name: p.name, categoryId: p.categoryId, description: p.productInfo.description, 
            inventory: p.productInfo.inventory, inventoryWarning : p.productInfo.inventoryWarning,
            price:p.productInfo.price, imageUrl: p.productInfo.imageUrl, 
        }}) 

    console.log("mapped: ", productsMapped)
    setProductList(productsMapped)

    } catch (error:any) {
        setErrorMessage(error.message);
      }
 } 

const getCategoryInfo = async () => {
    let getCategories = await getAllCategories();
    console.log(getCategories)
    let categoryString= JSON.stringify(getCategories);
    let parsedCategory= categoryString && JSON.parse(categoryString)
    let categoryModel= parsedCategory.map((c:any)=> 
    {return  {catId:c.id, name: c.name}})

    setCategories(categoryModel)
 } 

 

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
    
        const formData: Product = {name, categoryId, description, inventory, inventoryWarning, price, imageUrl};
        const newProduct = await createProduct(formData);
        //@ts-ignore
        if (createProduct.error) {
        //@ts-ignore
          throw createProduct.error;
        }
    //  create alert to show success
        alert("Product created");
    //  set category to show
    console.log(JSON.stringify(newProduct))
    let productString = JSON.stringify(newProduct);
    let parsedProduct = productString && JSON.parse(productString);
        console.log(parsedProduct)
      } catch (error:any) {
        setErrorMessage(error.message);
        alert("Error creating product");
      }
}


    return (
      <div className="flex dark:text-black  justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h1>New Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">name</label>
            <input
              type="text"
              name= "name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Inventory</label>
            <input
              type="number"
              name = "inventory"
              id="inventory"
              value={inventory}
              onChange={(e) => setInventory(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
             
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Price £</label>
            <input
              type="number"
              name = "price"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Category</label>
            <select
              name = "parentId"
              id="parentId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
            <option value=""> -- Select a Category-- </option>
            {categories.map((pc:any) => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
            </select>
             {/* <input
              type= "text"
              name = "categoryId"
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Image URL</label>
            <input
              type="text"
              name = "imageUrl"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Descripton</label>
            <input
              type="text"
              name = "description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{JSON.stringify(errorMessage)}</p>}
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">submit</button>
         
          </div>
        </form>
        </div>  
        <div>
            <h1>Products</h1>
     
        <div>
        {productList.map((p:any) => 
        <div key={p.id}> 
        <h2>{p.name}</h2> 
        <div>
          <img src={`"${p.image} "`} />
          <p>£{p.price}</p>  
          <p>{p.description}</p> 
          <p>{p.category}</p>  
        </div>
        </div>)}
        </div>
        </div>
      </div>
    );
  }
  