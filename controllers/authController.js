
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER USER
exports.register = async (req, res) => {

    console.log("Received Body:", req.body);


    const { full_name, email, password } = req.body;


    if (!full_name || !email || !password) {

        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });

    }


    try {

        const checkSql = 
        "SELECT * FROM users WHERE email = ?";


        db.query(
            checkSql,
            [email],
            async (err, result) => {


                if (err) {

                    return res.status(500).json({
                        success:false,
                        message:err.message
                    });

                }



                if(result.length > 0){

                    return res.status(400).json({
                        success:false,
                        message:"Email already registered"
                    });

                }



                const hashedPassword = await bcrypt.hash(
                    password,
                    10
                );



                const insertSql =
                "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";



                db.query(

                    insertSql,

                    [
                        full_name,
                        email,
                        hashedPassword
                    ],


                    (err, result)=>{


                        if(err){

                            return res.status(500).json({
                                success:false,
                                message:err.message
                            });

                        }



                        res.status(201).json({

                            success:true,
                            message:"User Registered Successfully"

                        });



                    }

                );



            }
        );



    } catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// LOGIN USER
exports.login = (req,res)=>{


    const { email, password } = req.body;



    const sql =
    "SELECT * FROM users WHERE email = ?";



    db.query(
        sql,
        [email],
        async(err,result)=>{


            if(err){

                return res.status(500).json({
                    success:false,
                    message:err.message
                });

            }



            if(result.length === 0){

                return res.status(404).json({
                    success:false,
                    message:"User not found"
                });

            }



            const user = result[0];



            const match = await bcrypt.compare(
                password,
                user.password
            );



            if(!match){

                return res.status(401).json({
                    success:false,
                    message:"Invalid Password"
                });

            }



            const token = jwt.sign(

                {
                    id:user.user_id,
                    email:user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:"1h"
                }

            );



            res.json({

                success:true,

                message:"Login Successful",

                token,

                user:{
                    id:user.user_id,
                    full_name:user.full_name,
                    email:user.email
                }

            });



        }
    );

};