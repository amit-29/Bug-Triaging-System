const Tester = require('../models/tester');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const config = require('../config');
const nodemailer = require('nodemailer');
//const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:'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'
//     }
// }));

// const transporter = nodemailer.createTransport(config.mailer);

exports.getLogin =  (req, res) => {
	res.render('login.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
};

//------------------------------------------------------------------------

// exports.getStudentReset = (req,res) => {
   
//     res.render('student-reset.ejs', {
// 		morris: true,
// 		float: false,
//         tables: false,
//         csrfToken: req.csrfToken()
// 	});
// }

// exports.postStudentReset =  (req, res) => {
//     crypto.randomBytes(32,(err,buffer) => {
//         if(err){
//             return res.redirect('/student-reset');
//         }
//         const token = buffer.toString('hex');
//         Student.findOne({email: req.body.email})
//         .then(user => {
//             if(!user) {
//                 return res.redirect('/student-reset');
//             }
//             user.resetToken = token;
//             user.resetTokenExpiration = Date.now() + 3600000;
//             return user.save();
//         })
//         .then(result => {
//             var mailOptions = {
//                     from: 'Code4Share <no-reply@code4share.com>',
//                     to: req.body.email,
//                     subject: 'Password Reset!',
//                     html: `
//                     <h1>You requested for password reset!</h1>
//                     <p> Click this to reset the password</p>
//                     <a href="http://localhost:3000/student-newPassword/${token}">link</a>
//                     `
//                   };
//             return transporter.sendMail(mailOptions);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     })
// }


// exports.getStudentNewPassword = (req, res) => {
//     const token = req.params.token;
//     Student.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
//         .then(user => {
        
//             res.render('student-newPassword.ejs', {
//                 morris: true,
//                 float: false,
//                 tables: false,
//                 csrfToken: req.csrfToken(),
//                 userId: user._id.toString(),
//                 token: token,
//                 passwordToken: token
//             });
//         })
//         .catch(err => {
//         console.log(err);
//         });
// }

// exports.postStudentNewPassword = (req, res, next) => {
//     const newPassword = req.body.password;
//     const userId = req.body.userId;
//     const passwordToken = req.body.token;
//     let resetUser;
    
  
//     Student.findOne({
//       resetToken: passwordToken,
//       resetTokenExpiration: { $gt: Date.now() },
//       _id: userId
//     })
//       .then(user => {
//         console.log(userId);
//         resetUser = user;
//         return bcrypt.hash(newPassword, 12);
//       })
//       .then(hashedPassword => {
//         resetUser.password = hashedPassword;
//         resetUser.resetToken = undefined;
//         resetUser.resetTokenExpiration = undefined;
//         return resetUser.save();
//       })
//       .then(result => {
//         res.redirect('/');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

exports.getTesterUserProfile = (req, res) => {
    
    res.render('tester-userProfile.ejs', {
        morris: true,
        float: false,
        tables: false,
        user: req.user,
        csrfToken: req.csrfToken()
    });
}

exports.postTesterUserProfile = (req, res) => {

    req.user.name=req.body.name;
    req.user.email=req.body.email;
    
    req.user.save()
     .then(result => {
        res.render('tester-index.ejs', {
            morris: true,
            float: false,
            tables: false,
            csrfToken: req.csrfToken()
        });
     })
    .catch(err => console.log(err));
}
exports.postTesterLogin =  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Tester.findOne({email : email})
        .then(user => {
           if(!user){
               return res.redirect('/')
           }
           bcrypt.compare(password,user.password)
                .then(result => {
                    if(result){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(result => {
                            res.render('tester-index.ejs', {
                                morris: true,
                                float: false,
                                tables: false,
                                csrfToken: req.csrfToken()
                            });
                        });
                    }
                    res.redirect('/');
                })
        })
        .catch(err => {
            res.redirect('/');
        });
};

exports.getTesterSignup =  (req, res) => {
	res.render('tester-signup.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
};

exports.postTesterSignup =  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Tester.findOne({ email: email })
        .then(err => {
        if (err) {
            return res.redirect('/tester-signup');
        }
        return bcrypt.hash(password,12)
            .then(hashedPassword => {
                const user = new Tester({
                    email: email,
                    password: hashedPassword,
                    name: name,
                
                });
                //console.log('user created')
          
                return user.save();
               })
            .then(result => {
                res.redirect('/');
                // var mailOptions = {
                //     from: 'Code4Share <no-reply@code4share.com>',
                //     to: email,
                //     subject: 'signup Succesfull!',
                //     html: '<h1>You succesfully signed up!</h1>'
                //   };
                // return transporter.sendMail(mailOptions);
            })
            .catch(err => {
                console.log(err);
            });
          
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postTesterLogout =  (req, res) => {
    req.session.destroy(result => {
        res.redirect('/');
    })
}