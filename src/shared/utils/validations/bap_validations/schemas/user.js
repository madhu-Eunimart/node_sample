
const userSignupSchema = {
    "id": "/user_signup_schema",
    "type":"object",
    "required": ["username", "password", "confirm_password"],
    "properties": {
        "username": {"type":"string"},
        "password": {"type":"string"},
        "confirm_password": {"type":"string"},
    }
};

const userLoginSchema={
    "id":"/user_login_schema",
    "type":"object",
    "required": ["username","password"],
    "properties": {
        "username": {"type":"string"},
        "password": {"type":"string"},
    }
};

const userForgetPasswordSchema={
    "id":"/user_login_schema",
    "type":"object",
    "required": ["username"],
    "properties": {
        "username": {"type":"string"},
        
    }
};

const userChangePasswordSchema={
    "id":"/user_login_schema",
    "type":"object",
    "required": ["username", "password", "confirm_password","otp"],
    "properties": {
        "username": {"type":"string"},
        "password": {"type":"string"},
        "confirm_password": {"type":"string"},
        "otp": {"type":"string"}
    }
    
};


export {userSignupSchema,userLoginSchema,userForgetPasswordSchema,userChangePasswordSchema}