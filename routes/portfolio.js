const express = require('express');
const router = express.Router();
const portfolioAPI = require('./../API/portfolioAPI')
const currencyAPI = require('./../API/currencyAPI');

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    portfolioAPI.get((portfolioData, error) =>{
      if (error) {
        console.log(error);
        res.status(404).send("Oops");
      } else {
        currencyAPI.get((currencData, error) => {
          if (error) {
            console.log(error);
            res.status(404).send("Oops");
          } else {
            res.render('portfolio', {title: "Portfolio", portfolioData: portfolioData, currencyData: currencData});
          }          
        });
      }
    });
  } catch(error) {
    console.log(error);
    res.status(404).send("Oops");
  }  
});

router.post('/add', (req, res, next) => {
  try {
    portfolioAPI.add(req.body, (resAPI, error) => {
      if (error) {
        console.log(error);
        res.status(404).send("Oops");
      } else {
        res.send(resAPI);
      }
    });
  } catch(error) {
    console.log(error);
    res.status(404).send("Oops");
  }  
});

router.post('/delete', (req, res, next) => {
  try {
    portfolioAPI.delete(req.body.id, (resAPI, error) => {
      if (error) {
        console.log(error);
        res.status(404).send("Oops");
      } else {
        res.send(resAPI)
      }
    });
  } catch(error) {
    console.log(error);
    res.status(404).send("Oops");
  }  
});

module.exports = router;
