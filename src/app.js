const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

//console.log(path.join(__dirname,'../public/about.html'))
//console.log(path.join(__dirname,'../public'))


const app = express()

 //Incorrect Code 
 //app.use(express.static(path.join(__dirname,'../public/about.html')))
 //app.use(express.static(path.join(__dirname,'../public/help.html')))

 //Define Paths for Express Config
 const staticDirPath = path.join(__dirname,'../public');
 const templatePath = path.join(__dirname, '../templates/views')
 const partialsPath = path.join(__dirname, '../templates/partials')

 //Define Handlebars config
 app.set('view engine', 'hbs')
 app.set('views',templatePath)
 hbs.registerPartials(partialsPath)

//Setup Static Directory to Serve
app.use(express.static(staticDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dinkar Bhardwaj'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Pages',
        name:'Dinkar Bhardwaj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Dinkar Bhardwaj',
        message : 'Please contact the admin'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
         return res.send({
            error : 'Address must be provided!'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error : error});
        } 
        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({error});
            }
            // console.log(response)
            res.send({
                forecast: response,
                location,
                address: req.query.address
            })

        })

        
    })
   
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error :'You must prvide a search citeria'
        })
    }
    console.log(req.query.search)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res)=>{
    //res.send('Help Article Not Found')
    res.render('error',{
        message : 'Help article is not found',
        title : 'Error',
        name : 'Dinkar Bhardwaj'
    })
})

app.get('*',(req,res)=>{
    //res.send('My 404 Page')
    res.render('error',{
        message : 'The page you are trying to reach does not exist',
        title : 'Error',
        name : 'Dinkar Bhardwaj'
    })
})


app.listen(3000, ()=>{
    console.log('Server started on port 3000')
})


// app.get('/help',(req,res)=>{
//     res.send([{name:'Dinkar',age:34},{name:'Geetika',age:33}])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>This is the about Page</h1>')
// })