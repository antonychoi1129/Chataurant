let linebot = require('linebot');

const line = require('@line/bot-sdk');

let bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

//server.js
const express = require('express');
const mongoose = require('mongoose');
Admin = mongoose.mongo.Admin;
const restaurantRouter = require('./restaurants-route.js');
const restaurantModel = require('./restaurant.js');
const restaurant = require('./restaurant.js');
const app = express();

const main = async () => {
  app.use(express.json()); // Make sure it comes back as json

  const connection = await mongoose.connect('mongodb+srv://antony:Cpya1129@cluster0.bryh6.mongodb.net/openrice?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  app.use(restaurantRouter);

  app.listen(3000, () => { console.log('Server is running...') });
}

main()

bot.on('message', async function (event) {
    const point = [event.message.longitude, event.message.latitude]
    const near = 100

    console.log(event.message.latitude, event.message.longitude)

    const restaurants = await restaurantModel
      .find({
        // const resturants = await restaurantModel.find({
        loc: {
          $near: {
            $maxDistance: near,
            $geometry: {
              type: "Point",
              coordinates: point
            }
          }
        }
      })
      .limit(5)

    console.log(restaurants)
    console.log(restaurants.length)


    let message = [];
    for (let i = 0; i < restaurants.length; i++) {
      // console.log(restaurants[i]['name']);
      // console.log(typeof restaurants[i]['Opening Hours Time']);
      // console.log(typeof restaurants[i]['Opening Hours Time'].toString());
      console.log(restaurants[i]['Opening Hours Time'][0])
      message.push({
        type: 'flex',
        altText: 'this is a flex message',
        contents: {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
              "type": "uri",
              "label": "Line",
              "uri": "https://linecorp.com/"
            }
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": restaurants[i].name,
                "weight": "bold",
                "size": "xl",
                "contents": []
              },
              {
                "type": "box",
                "layout": "baseline",
                "margin": "md",
                "contents": [
                  {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                    "size": "sm"
                  },
                  {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                    "size": "sm"
                  },
                  {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                    "size": "sm"
                  },
                  {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                    "size": "sm"
                  },
                  {
                    "type": "icon",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "4.0",
                    "size": "sm",
                    "color": "#999999",
                    "flex": 0,
                    "margin": "md",
                    "contents": []
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "margin": "lg",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "地點",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "flex": 1,
                        "contents": []
                      },
                      {
                        "type": "text",
                        "text": restaurants[i].address,
                        "size": "sm",
                        "color": "#666666",
                        "flex": 5,
                        "wrap": true,
                        "contents": []
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Opening Hours Date",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "flex": 1,
                        "contents": []
                      },
                      {
                        "type": "text",
                        "text": restaurants[i]['Opening Hours Date'].toString() || " ",
                        "size": "sm",
                        "color": "#666666",
                        "flex": 5,
                        "wrap": true,
                        "contents": []
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Opening Hours Time",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "flex": 1,
                        "contents": []
                      },
                      {
                        "type": "text",
                        "text": restaurants[i]['Opening Hours Time'].toString() || " ",
                        "size": "sm",
                        "color": "#666666",
                        "flex": 5,
                        "wrap": true,
                        "contents": []
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Cuisine",
                        "size": "sm",
                        "color": "#AAAAAA",
                        "flex": 1,
                        "contents": []
                      },
                      {
                        "type": "text",
                        "text": restaurants[i].cuisine,
                        "size": "sm",
                        "color": "#666666",
                        "flex": 2,
                        "wrap": true,
                        "contents": []
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "CALL",
                  "uri": "https://linecorp.com"
                },
                "height": "sm",
                "style": "link"
              },
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "WEBSITE",
                  "uri": "https://linecorp.com"
                },
                "height": "sm",
                "style": "link"
              },
              {
                "type": "spacer",
                "size": "sm"
              }
            ]
          }
        }
      })
    }
    client.replyMessage(event.replyToken, message)
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
          // error handling
        });

  // }
});


// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
  console.log('全國首家LINE線上機器人上線啦！！');
});