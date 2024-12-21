import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://roys45545:9883236242@cluster0.yyikr.mongodb.net/food-del ').then(()=>console.log("DB Connected"));

}

