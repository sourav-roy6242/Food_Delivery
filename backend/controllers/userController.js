import userModel  from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success:false,message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Inavlid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register
const registerUser = async (req,res) => {
    const {name,password,email}= req.body;
    try {
        //cheacking is user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Please enter valid email"})
        }

        if (password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing user password

        const  salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export {loginUser,registerUser}





// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import validator from "validator";

// // Create JWT Token
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Added expiration for security
// };

// // Register User
// const registerUser = async (req, res) => {
//     const { name, password, email } = req.body;

//     try {
//         // Check if user already exists
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         // Validate email
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         // Validate password strength
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password (minimum 8 characters)" });
//         }

//         // Hashing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         const newUser = new userModel({
//             name,
//             email,
//             password: hashPassword,
//         });

//         // Save user and generate JWT
//         const user = await newUser.save();
//         const token = createToken(user._id);

//         res.json({ success: true, token });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: "Error registering user" });
//     }
// };

// // Login User
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if user exists
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         // Check if password matches
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.json({ success: false, message: "Invalid credentials" });
//         }

//         // Generate JWT
//         const token = createToken(user._id);
//         res.json({ success: true, token });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: "Error logging in" });
//     }
// };

// export { loginUser, registerUser };
