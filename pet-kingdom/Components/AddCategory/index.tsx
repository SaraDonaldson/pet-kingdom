'use client'
import { FormEventHandler, useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { createCategory} from "@/lib/functions/createCategory";
import { Category } from "@/lib/types/Category";
import { getAllCategories } from "@/lib/functions/getAllCategories";
import { error } from "console";


export default function AddCategory() {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const  [order, setOrder] = useState(0);
    const  [parentId, setParentId] = useState("");
    const  [headerImg, setHeaderImg] = useState("");
    const  [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [displayCategory, setDisplayCategory]= useState({});
    const  [parentCategories, setParentCategories] = useState([{
    catId:"",
    name: "",
  }]);

useEffect(() => {

  getCategoryInfo()



}, [])

 const getCategoryInfo = async () => {
    let getCategories = await getAllCategories();
    // console.log(getCategories)
    let pCategoryString= JSON.stringify(getCategories);
    let parsedPCategory= pCategoryString && JSON.parse(pCategoryString)
    let parentModel= parsedPCategory.map((c:any)=> 
    {return  {catId:c.id, name: c.name}})

    setParentCategories(parentModel)
 } 

 

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
    
        const formData: Category= { name, link, order, parentId, headerImg, description};
        const newCategory = await createCategory(formData);
        //@ts-ignore
        if (createCategory.error) {
        //@ts-ignore
          throw createCategory.error;
        }
    
    //  create alert to show success
        alert("Category created");
    //  set category to show
    console.log(JSON.stringify(newCategory))
    let categoryString = JSON.stringify(newCategory);
    let parsedCategory = categoryString && JSON.parse(categoryString);
        console.log(parsedCategory)
      } catch (error:any) {
        setErrorMessage(error.message);
        alert("Error creating category");
      }
}

const showCategories  = async ()=>{
        const categories= await getAllCategories()
        console.log(categories)

}
    return (
      <div className="flex dark:text-black  justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
        <h1>Add New Category</h1>

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
            <label className="block text-sm font-medium mb-2" htmlFor="name">link</label>
            <input
              type="text"
              name = "link"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Order (number)</label>
            <input
              type="number"
              name = "order"
              id="order"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Parent</label>
            <select
              name = "parentId"
              id="parentId"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full p-2 border rounded"
            >
            <option value=""> -- Select a Parent Category-- </option>
            {parentCategories.map((pc:any) => <option key={pc.id} value={pc.id}>{pc.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">Header Image URL</label>
            <input
              type="text"
              name = "headerImg"
              id="headerImg"
              value={headerImg}
              onChange={(e) => setHeaderImg(e.target.value)}
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">submit category</button>
          </div>
        </form>
        <button className="bg-white-500 text-blue px-4 py-2 rounded hover:bg-blue-600" onClick={showCategories}>Show Categories</button>
        </div>  
      </div>
    );
  }
  