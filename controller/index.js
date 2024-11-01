const userService = require('../service/user');
const helper = require('../helper/helper');
const fcm = require('firebase-admin')
const skylog = require("../helper/logger");

let fcm_cert = require('../files/autodoora-firebase-adminsdk-1beyz-129d1bfda3.json')    //자동문의 고수

fcm.initializeApp({ 
	credential: fcm.credential.cert(fcm_cert), 
})


exports.coadmasterMobilePush = async (req, res, next) => {

    let resModel;
    const tokenList = req.body.tokens;
    const title = req.body.title;
    const body = req.body.body;
    const url = req.body.linkUrl;
    skylog.info('coadmasterMobilePush tokenList : ' + tokenList);

  //   const tokenList1 = [
  //     'cwL1ayQxS0MSjUW2rDJuld:APA91bGgShnvv4o83A4oFYCqyql1wIMyBe7_sfbGU9JwGoX2uIMmA7LGWOq5caXyY1yxfRrUhJ23YaoZ9UcqWI9DexO9ikJBax3uL4JZrU03lDaJVX0GvDA',
  //     'cwL1ayQxS0MSjUW2rDJuld:APA91bGgShnvv4o83A4oFYCqyql1wIMyBe7_sfbGU9JwGoX2uIMmA7LGWOq5caXyY1yxfRrUhJ23YaoZ9UcqWI9DexO9ikJBax3uL4JZrU03lDaJVX0GvDA'
  //  ];


    let message = {
        notification:{
            title:title,
            body:body
        },
        data: {
          title: title,
          message: body,
          linkUrl : url
        },
        tokens: tokenList,
      }


    fcm.messaging().sendEachForMulticast(message).then(function (response) {
      skylog.info('Successfully sent message: : ', response);
      resModel = helper.createResponseModel(true , ""+response , tokenList);
      
      skylog.info("### AUTODOORA[200] ###"); 
      skylog.info("resModel :: " + JSON.stringify(resModel)); 
      skylog.info("######################"); 
      skylog.info(""); 

      return res.status(200).json(resModel);
    })
    .catch(function (err) {
      console.log('Error Sending message!!! : ', err);
      resModel = helper.createResponseModel(false , ""+err , tokenList);
      skylog.info("### AUTODOORA[500] ###"); 
      skylog.info("resModel :: " + JSON.stringify(resModel)); 
      skylog.info("######################"); 
      skylog.info(""); 

      return res.status(200).json(resModel);
    })
    
    
}; 
