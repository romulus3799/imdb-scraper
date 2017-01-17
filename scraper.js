var express = require('express');
var app     = express();
var scrape  = require('./scrape.js')
var search  = require('./search.js')
var fs      = require('fs')
var topHorror = 'http://www.imdb.com/search/title?genres=horror&sort=user_rating,desc&title_type=feature&num_votes=5000,&pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=2406822102&pf_rd_r=09WTC6G5EGYPT2HQN9WR&pf_rd_s=right-6&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_gnr_12'

app.get('/', function(req, res){
    var urls = []
    
    //get urls for all movies in list
    search(topHorror, (err, data) => {
        fs.writeFileSync('output.json','')
        urls = data
        
        //loop through all urls, scrape data for each
        for(url of urls) {
            scrape(url + "/", (err, data) => {
                if(err) {
                    console.log(err.message);
                }
                console.log(JSON.stringify(data))
            })
        }
        //end of loop
        
        console.log('Done!')
    })
    
    
    res.send('Scraped!')
})

exports = module.exports = app;