const validateHandler = (schema) => {
    return (req,res,next) => {
        const result = schema.safeParse(req.body);
        if(!result.success){
            const formattedErrors = result.error.issues.map((x) => x.message);

            return res.status(400).json({
                message:"Validation error",
                error:formattedErrors
            });
        }

        req.body = result.data;
        next();
    }
}

module.exports = validateHandler;