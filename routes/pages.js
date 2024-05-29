
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

router.get('/', (req, res) => {
  if (req.user) {
    res.render('index.ejs', { name: req.user.name });
  } else {
    // Handle the case where no user is logged in:
    // Option 1: Redirect to login
    res.redirect('/login');

    // Option 2: Render with a default or no name
    // res.render('index.ejs', { name: 'Guest' });
  }
});

router.get('/register', (req, res) => {
  res.render('register.ejs')
})

router.get('/login', (req, res) => {
   res.render('login.ejs')
})

router.get('/data', (req, res) => {
    const query = 'SELECT mes, ventas FROM ventas_mensuales';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs');
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dashboard',
    port: 3307
})

connection.connect((error)=>{
  if(error){
    console.log(error)
  }else{
    console.log("Conectado a Mysql 2..")
  }
})


module.exports = router;
