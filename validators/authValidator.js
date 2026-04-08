const {z} = require('zod');

const signupSchema = z.object({
    username:z.string()
    .min(6,"Username too short"),
    
    password: z.string()
    .min(6,"Password too short")
})

.refine((data)=>{
    const hasUppercase = /[A-Z]/.test(data.password);
    const hasSpecialcase = /[!@#$%^&*]/.test(data.password);

    return hasUppercase && hasSpecialcase;
},{
    message:"Password must have atleast one special character and one uppercase character",
    path:["password"]
})


const signinSchema = z.object({
    username:z.string(),

    password:z.string()
});

module.exports = {signupSchema,signinSchema};