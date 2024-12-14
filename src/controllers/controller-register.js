const config = require('../configs/database');
let mysql      = require('mysql2');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    formRegister(req,res){
        res.render("register",{
            url : 'http://localhost:5050/',
        });
    },
    saveRegister(req,res){
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.pass;
        if (username && email && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO users (nama,email,password) VALUES (?,?,SHA2(?,512));`
                , [username, email, password],function (error, results) {
                    if (error) throw error; 
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    res.redirect('/login');
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    }
}