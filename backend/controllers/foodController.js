// import foodModel  from "../models/foodModel.js";
// import fs from 'fs'

// //add food item

// const addFood = async (req,res) => {

//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         image:image_filename
//     })


//     try {
//         await food.save();
//         res.json({success:true,message:"Food Added"})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
        
//     }
// }

// export {addFood}









import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required." });
    }

    // Validate required fields
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const image_filename = req.file.filename; // Safe to access after check

    const food = new foodModel({
        name,
        description,
        price: parseFloat(price), // Ensure price is a number
        category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, message: "Error adding food." });
    }
};
 //all food list

 const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"})
    }

 }

 //remove food item

 const removeFood = async (req,res) => {
    
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        
        console.log(error);
        res.json({success:false,message:"Error"})
    }

 }

export { addFood , listFood , removeFood }
