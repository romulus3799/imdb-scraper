var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports = function(url, callback) {
    
    request(url, function(err, response, html){
        if(err) {
            return callback(err)
        }
        var movies = []

        var $ = cheerio.load(html);
         

          $('.lister-list').filter(function(){
            var data = $(this);

            for(let i = 0; i < data.children().length; i++) {
                var st = 'http://www.imdb.com' + data.find('div:nth-child('+(i+1)+')').find('div:nth-child(3)').children().first().find('a:nth-child(2)').attr('href')
                movies.push(st)
            }
              fs.writeFile('searched.txt', movies.join('\n'), err => {
                  if(err) {
                      console.log('could not write searched movies')
                  }
                  console.log('Wrote to searched.txt!')
              })
          })

        callback(null, movies)
    })
}