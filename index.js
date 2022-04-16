const PORT  = process.env.PORT || 5000
const express = require("express")
const axios = require('axios')
const cheerio = require('cheerio')


const newsresources = [
    {
        name: 'cityam',
        address: 'https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/',
        base: ''
    },
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: ''
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
    },
    {
        
        name: 'nyt',
        address: 'https://www.nytimes.com/international/section/climate',
        base: 'https://www.nytimes.com'
    },
    {
        name: 'latimes',
        address: 'https://www.latimes.com/environment',
        base: ''
    },
    {
        name: 'smh',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: 'https://www.smh.com.au'
    },
    {
        name: 'un',
        address: 'https://www.un.org/climatechange',
        base: ''
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk'
    },
    {
        name: 'es',
        address: 'https://www.standard.co.uk/topic/climate-change',
        base: 'https://www.standard.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/topic/climate-change-environment/',
        base: ''
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://nypost.com/tag/climate-change/',
        base: ''
    }
]

const app = express()

const articles = []

newsresources.forEach(newsresource =>{
    axios.get(newsresource.address)
        .then((result) => {
            const html = result.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function(){
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url : newsresource.base + url,
                    source : newsresource.name
                })
            })
            
        }).catch((err) => console.log(err));
})

const data = [

  {
    personal_info: {
      name: "john Waithira",
      contact : {
        whatsApp: "+254726354504",
        email: "waithirajon@gmail.com",
        github : "https://github.com/johnwaithira"
      },
      Country: "Kenya"
    },
    project: {
      projectname: "Climate change news live API 2022",
      category: "News API",
      sub_category: "Climate change news API",
      link: {
        all_news: "/news",
        "news_resources": {
          1: "cityam",
          2: "thetimes",
          3: "telegraph",
          4: "nyp",
          5: "es",
          6: "sun",
          7: "dm",
          8: "smh",
          9: "bbc",
          10: "un",
          11: "nyt",
          12: "latimes"
        },
        get_from_resource: "/news/news_resources{id}"
      }
    }
  }

]

app.listen(PORT, ()=> console.log(`Server running on prot ${PORT}`))
app.get('/', (req, res) =>{
    res.json(data)
})

app.get('/news', (req, res)=>{
    res.json(articles)
})

app.get('/news/:newsresourceId', (req, res)=>{
    const resourcename = req.params.newsresourceId;

    const resourceAddress = newsresources.filter( newsresource => newsresource.name == resourcename)[0].address
    const resourceBase = newsresources.filter( newsresource => newsresource.name == resourcename)[0].base
    axios.get(resourceAddress)
    .then((result) => {
        const htmlResponse = result.data
  

        const $ = cheerio.load(htmlResponse)
        const singleresource = []

        $('a:contains("climate")', htmlResponse).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            singleresource.push({
                title,
                url : resourceBase + url,
                source : resourcename
            })
        })
        res.json(singleresource)

    }).catch((err) => console.log(err));
})

