const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const nodemailer = require("nodemailer");

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
         async function main() {
           // create reusable transporter object using the default SMTP transport
           let transporter = nodemailer.createTransport({
             host: "smtp.mailtrap.io",
             port: 2525,
             auth: {
               user: "4ca9c346f29218",
               pass: "ee5f66b776987a",
             },
           });

           // send mail with defined transport object
           let info = await transporter.sendMail({
             from: '"Fred Foo 👻" <foo@example.com>', // sender address
             to: `${user.email}`, // list of receivers
             subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`, // Subject line
             text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
             html: `<b>Hi ${user.first_name}, Please confirm your email address</b>`, // html body
           });
             
             let admins = await transporter.sendMail({
               from: '"Fred Foo 👻" <foo@example.com>', // sender address
               to: "srikanth@gmail.com, mike@gmail.com, ross@gmail.com, joey@gmail.com,chandler@gmail.com", // list of receivers
               subject: `${user.first_name} ${user.last_name} has registered with us`, // Subject line
               text: `Please welcome ${user.first_name} ${user.last_name}`, // plain text body
               html: `<b>${user.first_name} ${user.last_name} has registered with us</b>`, // html body
             });
         }

         main().catch(console.error);
        return res.status(201).json({ user: user });
    } catch (err) {
        return res.status(400).json({status:"failed",message:err})
    }
})

router.get("", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;

        
        
        const offset = (page - 1) * size;

        const totalPages = Math.ceil((await User.find().countDocuments()/size));
        const users = await User.find().skip(offset).limit(size).lean().exec();
        return res.status(201).json({ users: users,totalPages,page,size });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(201).json({ users: users});
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err });
  }
});

module.exports = router;