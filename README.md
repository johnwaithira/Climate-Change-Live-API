# Climate Change news API 2022
----
### Get All Climate Chnage news from 


### View output

* https://climatechangeapikenya.herokuapp.com/
```json
    newsresource : 
        {
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
        }

```
## DEMO of html page that displays output from from API

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://johnwaithira.github.io/ke/css/style.css">
    <title>Document</title>
</head>
<body>
    <div class="m-10">
        <div class="p-20-0">
         <h1>Climate Change news App from <a href="https://github.com/johnwaithira/Climate-Change-Live-API">my</a> API</h1>
        </div>
        <div id="data" class="display-flex">
       
        </div>
    </div>
    
    
    <script>
    
        //using my api which gives a response of compiled climate change news from different sites
        
        //link to my repository
        // https://github.com/johnwaithira/Climate-Change-Live-API
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'climate-change-startup.p.rapidapi.com',
                'X-RapidAPI-Key': 'fb3012e591msh89460ab9ce6a632p1a5547jsna2c090c70596'
            }
        };
        
        fetch('https://climate-change-startup.p.rapidapi.com/news', options)
            .then(response => response.json())
            .then(response => {

                const data = (response);
                let output = "";

                for(elem in data)
                {
                    output += 
                    `
                     <div class="col-3 col-m-6 col-s-6">
                        <div class="box-shadow1 m-5 b-r-10">
                            <div class="p-t-40 p-b-20 display-flex">
                                <div class="w-100 h-100 b-r-50">
                                    <img src="https://lh3.googleusercontent.com/LDdg0kvows6TvbsjOk9-1_h5wTUbFc4cIkAPKYqhydODtSsXY1aOCH5-LihcxiwkYWC7Gw=s85" class="imp w-100 h-100 b-r-50"> 
                                </div>
                            </div>
                            <div class="p-l-20 p-r-20 p-t-5 p-b-20">
                                <p class="p-5-0 f-w-800">${data[elem].title}</p>
                                <p><a class="link" target="_blank" href="${data[elem].url}">Read more</a></p>
                                <p class="f-s-12 p-10"><a class="link" target="_blank" href=""></a></p>
                            </div>
                        </div>    
                    </div>
                    
                    `;

                }

                document.getElementById("data").innerHTML = (output); 
            })
            .catch(err => console.error(err));
    </script>
</body>
</html>
```
