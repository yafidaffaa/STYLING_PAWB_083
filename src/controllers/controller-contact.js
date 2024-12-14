const config = require('../configs/database');

let mysql = require('mysql2');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    getContact(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM todos;', function (error, results) {
                if (error) throw error;

                // Check if results contains any data
                userName: req.session.username
                if (results.length > 0) {
                    res.render('contact', {
                        url: 'http://localhost:5050/',
                        todos: results,
                        userName: req.session.username // Pass the contacts data to the view
                    });
                } else {
                    res.render('contact', {
                        url: 'http://localhost:5050/',
                        todos: [],
                        userName: req.session.username // Pass an empty array if no data
                    });
                }
            });
            connection.release();
        });
    },
    formContact(req, res) {
        res.render("addContact", {
            url: 'http://localhost:5050/',
        });
    },
    saveContact(req, res) {
        let { name, todo } = req.body;
        console.log(name, todo);
        if (name && todo) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO todos (name, todo) VALUES (?, ?);`,
                    [name, todo],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/contact');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
    editContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM todos WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editContact', {
                        url: 'http://localhost:5050/',
                        todos: results[0]
                    });
                } else {
                    res.redirect('/contact');
                }
            });
            connection.release();
        });
    },
    updateContact(req, res) {
        const { id } = req.params;
        const { name, todo } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE todos SET name = ?, todo = ? WHERE id = ?',
                [name, todo, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/contact');
                }
            );
            connection.release();
        });
    },
    deleteContact(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM todos WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/contact');
            });
            connection.release();
        });
    },
};

