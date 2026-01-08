 const mongoose=require('mongoose');
 const validator=require('validator');
 const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");

 const userShema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid email address" +value)
         }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
         if(!validator.isStrongPassword(value)){
            throw new Error("Password is weak" +value)
         }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender data is not valid");
                
            }
        }
    },
    about:{
        type:String,
        default:"This is a default about the user"
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQlNjv2gUG-3xoreG3Aq0JnPHl1FKiQpZna5jiOtO1Faqiva3s876Isw00fmxegiwTXiznj5NamAGKAbrKniNk9v5yMBhvfGKjQZSe55xNU",
        validate(value){
         if(!validator.isURL(value)){
            throw new Error("Invalid URL" + value)
         }
        }
    },
    skills:{
        type:[String]
    },
    
 },{timestamps:true});

userShema.index({firstName:1});
userShema.index({gender:1});

userShema.methods.getJWT=async function(){
    const user=this;
    //Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder@123", {
        expiresIn: "7d",
      });
      return token;
};

userShema.methods.validatePassword=async function(passwordInputByUser){
    const user=this
    const passwordHash=user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

 module.exports = mongoose.model("User",userShema)
