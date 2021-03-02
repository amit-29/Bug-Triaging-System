const Tester = require('../models/tester');
const Developer = require('../models/developer');
const Manager = require('../models/manager');



const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const config = require('../config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(config.mailer);

exports.getLogin =  (req, res) => {
	res.render('login.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
};

exports.getManagerUserProfile = (req, res) => {
    
    res.render('manager-userProfile.ejs', {
        morris: true,
        float: false,
        tables: false,
        user: req.session.user,
        csrfToken: req.csrfToken()
    });
}
exports.postManagerUserProfile = (req, res) => {

    req.user.name=req.body.name;
    req.user.email=req.body.email;
    
    req.user.save()
     .then(result => {
        res.render('manager-index.ejs', {
            morris: true,
            float: false,
            tables: false,
            csrfToken: req.csrfToken()
        });
     })
    .catch(err => console.log(err));
}
exports.postManagerLogin =  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Manager.findOne({email : email})
        .then(user => {
           if(!user){
               return res.redirect('/')
           }
           bcrypt.compare(password,user.password)
                .then(result => {
                    if(result){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.manager=true;
                        return req.session.save(result => {
                            res.render('manager-index.ejs', {
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
exports.getManagerSignup =  (req, res) => {
	res.render('manager-signup.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
};
exports.postManagerSignup =  (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Manager.findOne({ email: email })
        .then(err => {
        if (err) {
            return res.redirect('/manager-signup');
        }
        return bcrypt.hash(password,12)
            .then(hashedPassword => {
                const user = new Manager({
                    email: email,
                    password: hashedPassword,
                    name: name,
                
                });
                return user.save();
               })
            .then(result => {
                res.redirect('/');

                  })
            .catch(err => {
                console.log(err);
            });
          
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getManagerReset = (req,res) => {
   
    res.render('manager-reset.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
}

exports.postManagerReset =  (req, res) => {
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            return res.redirect('/manager-reset');
        }
        const token = buffer.toString('hex');
        Manager.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.redirect('/manager-reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 36000000;
            return user.save();
        })
        .then(result => {
            var mailOptions = {
                    from: 'bhattamitkumar11@gmail.com',
                    to: req.body.email,
                    subject: 'Password Reset!',
                    html: `
                    <h1>You requested for password reset!</h1>
                    <p> Click this to reset the password</p>
                    <a href="http://localhost:3000/manager-newPassword/${token}">link</a>
                    `
                  };
            return transporter.sendMail(mailOptions);
        })
        .catch(err => {
            console.log(err);
        });
    })
}
exports.getManagerNewPassword = (req, res) => {
    const token = req.params.token;
    Manager.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
        
            res.render('manager-newPassword.ejs', {
                morris: true,
                float: false,
                tables: false,
                csrfToken: req.csrfToken(),
                userId: user._id.toString(),
                token: token,
                passwordToken: token
            });
        })
        .catch(err => {
        console.log(err);
        });
}

exports.postManagerNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.token;
    let resetUser;
    
  
    Manager.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        console.log(userId);
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  };



  exports.postManagerLogout =  (req, res) => {
    req.session.destroy(result => {
        res.redirect('/');
    })
}































//                              DEVELOPER-AUTH
exports.getDeveloperUserProfile = (req, res) => {
    console.log('Here')
    // console.log('Im in!!')
    res.render('developer-userProfile.ejs', {
        morris: true,
        float: false,
        tables: false,
        user: req.session.user,
        csrfToken: req.csrfToken()
    });
}

exports.postDeveloperUserProfile = (req, res) => {
    console.log(req.session.user)

    req.session.user.name=req.body.name;
    req.session.user.email=req.body.email;
    
    req.user.save()
     .then(result => {
        res.render('developer-index.ejs', {
            morris: true,
            float: false,
            tables: false,
            

            csrfToken: req.csrfToken()
        });
     })
    .catch(err => console.log(err));
}
exports.postDeveloperLogin =  (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    

    Developer.findOne({email : email})
        .then(user => {
           if(!user){
               return res.redirect('/')
           }
           bcrypt.compare(password,user.password)
                .then(result => {
                    if(result){
                        // console.log('Im in!!')

                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        req.session.developer=true;
                        return req.session.save(result => {
                            res.render('developer-index.ejs', {
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
exports.getDeveloperSignup =  (req, res) => {
	res.render('developer-signup.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
};
exports.postDeveloperSignup =  (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    Developer.findOne({ email: email })
        .then(err => {
        if (err) {
            return res.redirect('/developer-signup');
        }
        return bcrypt.hash(password,12)
            .then(hashedPassword => {
                const user = new Developer({
                    email: email,
                    password: hashedPassword,
                    name: name,
                
                });
                return user.save();
               })
            .then(result => {
                res.redirect('/');

                  })
            .catch(err => {
                console.log(err);
            });
          
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getDeveloperReset = (req,res) => {
   
    res.render('developer-reset.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
}

exports.postDeveloperReset =  (req, res) => {
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            return res.redirect('/developer-reset');
        }
        const token = buffer.toString('hex');
        Developer.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.redirect('/developer-reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 36000000;
            return user.save();
        })
        .then(result => {
            var mailOptions = {
                    from: 'bhattamitkumar11@gmail.com',
                    to: req.body.email,
                    subject: 'Password Reset!',
                    html: `
                    <h1>You requested for password reset!</h1>
                    <p> Click this to reset the password</p>
                    <a href="http://localhost:3000/developer-newPassword/${token}">link</a>
                    `
                  };
            return transporter.sendMail(mailOptions);
        })
        .catch(err => {
            console.log(err);
        });
    })
}
exports.getDeveloperNewPassword = (req, res) => {
    const token = req.params.token;
    Developer.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
        
            res.render('developer-newPassword.ejs', {
                morris: true,
                float: false,
                tables: false,
                csrfToken: req.csrfToken(),
                userId: user._id.toString(),
                token: token,
                passwordToken: token
            });
        })
        .catch(err => {
        console.log(err);
        });
}

exports.postDeveloperNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.token;
    let resetUser;
    
  
    Developer.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        console.log(userId);
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  };



  exports.postDeveloperLogout =  (req, res) => {
    req.session.destroy(result => {
        res.redirect('/');
    })
}















//                     TESTER -AUTH
exports.getTesterUserProfile = (req, res) => {
    
    res.render('tester-userProfile.ejs', {
        morris: true,
        float: false,
        tables: false,
        user: req.session.user,
        csrfToken: req.csrfToken()
    });
}

exports.postTesterUserProfile = (req, res) => {

    req.session.user.name=req.body.name;
    req.session.user.email=req.body.email;
    
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
          
                return user.save();
               })
            .then(result => {
                res.redirect('/');
                  })
            .catch(err => {
                console.log(err);
            });
          
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTesterReset = (req,res) => {
   
    res.render('tester-reset.ejs', {
		morris: true,
		float: false,
        tables: false,
        csrfToken: req.csrfToken()
	});
}

exports.postTesterReset =  (req, res) => {
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            return res.redirect('/tester-reset');
        }
        const token = buffer.toString('hex');
        Tester.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.redirect('/tester-reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 36000000;
            return user.save();
        })
        .then(result => {
            var mailOptions = {
                    from: 'bhattamitkumar11@gmail.com',
                    to: req.body.email,
                    subject: 'Password Reset!',
                    html: `
                    <h1>You requested for password reset!</h1>
                    <p> Click this to reset the password</p>
                    <a href="http://localhost:3000/tester-newPassword/${token}">link</a>
                    `
                  };
            return transporter.sendMail(mailOptions);
        })
        .catch(err => {
            console.log(err);
        });
    })
}


exports.getTesterNewPassword = (req, res) => {
    const token = req.params.token;
    Tester.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
        
            res.render('tester-newPassword.ejs', {
                morris: true,
                float: false,
                tables: false,
                csrfToken: req.csrfToken(),
                userId: user._id.toString(),
                token: token,
                passwordToken: token
            });
        })
        .catch(err => {
        console.log(err);
        });
}

exports.postTesterNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.token;
    let resetUser;
    
  
    Tester.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
        console.log(userId);
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/');
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
