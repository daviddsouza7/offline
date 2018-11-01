const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var cors = require('cors')
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
let urlEncodeParser = bodyParser.urlencoded({ extended:false }); 



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



app.get('/fetchLoginDetails', (req, res) => {
    request('https://corecotechnologies.com/cobakers_coreco/v1/Offline/login_details', { json: true }, (err, res, body) => {

    if (err) 
    { 
      return console.log(err); 
    }
  
getData(res.body);

});

function getData(data)
{
    res.json(data);
}


});


app.get('/fetchProductDetails', (req, res) => {

   
    let company_id = req.query.company_id;
    let unit_id = req.query.unit_id;
    console.log(company_id, unit_id);
   
   
    request('https://corecotechnologies.com/cobakers_coreco/v1/Offline/local_product?company_id='+company_id+'&unit_id='+unit_id,  (err, res, body) => {
     
  
    if (err) 
    { 
      return console.log(err); 
    }
  
  getProductData(res.body);

});

function getProductData(data)
{
    res.json(data);
}


});


app.post('/pushOrderDetails', urlEncodeParser, (req, res) =>
{
var data=req.body;

request({
  uri: 'https://corecotechnologies.com/cobakers_coreco/v1/Offline/synch_orders',
  method: 'POST',
  body: data,
  json: true
},
  function(err, res, body)
  {
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(res.body);
    submit(res.body);
  }


});
  

  function submit(data)
  {
  
    res.json(data);
  }

});


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
