var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, callback) {
    
    request(url, function(err, response, html){
        if(err) {
            return callback(err)
        }
        
        //load html data, prepare json file
        var $ = cheerio.load(html);
         var title, release, rating, rank;
         var filmData = {
              title : "", 
              release : "", 
              rating : "",
              rank : ""
          };
          
        //scrape title and release date data
          $('.title_wrapper').filter(function(){
            var data = $(this);
            title = data.children().first().text().trim();
            release = data.children().last().children().last().text().trim();

            filmData.title = title;
            filmData.release = release;
          })
          
          //scrape rating value
          $('.ratingValue').filter(function(){
            var data = $(this);
            rating = data.text().trim();

            filmData.rating = rating;
          })
          
          //scrape rank value
          $('a[href="/chart/top?ref_=tt_awd"]').filter(function(){
            var data = $(this);
            rank = data.text().trim();
            if(rank.length === 0) {
                rank = "N/A"
            }  
            filmData.rank = rank;
          })
          
          //write data to output.json
        fs.appendFile('output.json', JSON.stringify(filmData) + '\n', err => {
            if(err) {
                console.log('Could not write to file!')
            }
            console.log('Data written to output.json!');
        })


        callback(null, filmData)
    })
}