const userService = require('../service/user');
const helper = require('../helper/helper');
const fcm = require('firebase-admin')
const skylog = require("../helper/logger");

let fcm_cert = require('../files/autodoora-firebase-adminsdk-1beyz-129d1bfda3.json')    //자동문의 고수

fcm.initializeApp({ 
	credential: fcm.credential.cert(fcm_cert), 
})


exports.coadmasterMobilePush = async (req, res, next) => {
    console.log('coadmasterMobilePush: ');

    let resModel;
    const token = req.body.token;
    const title = req.body.title;
    const body = req.body.body;
    const url = req.body.linkUrl;
    

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
        token: token,
      }


    fcm.messaging().send(message).then(function (response) {
      console.log('Successfully sent message: : ', response);
      resModel = helper.createResponseModel(true , ""+response , token);
      
      skylog.info("### AUTODOORA[200] ###"); 
      skylog.info("resModel :: " + JSON.stringify(resModel)); 
      skylog.info("######################"); 
      skylog.info(""); 

      return res.status(200).json(resModel);
    })
    .catch(function (err) {
      console.log('Error Sending message!!! : ', err);
      resModel = helper.createResponseModel(false , ""+err , token);
      skylog.info("### AUTODOORA[500] ###"); 
      skylog.info("resModel :: " + JSON.stringify(resModel)); 
      skylog.info("######################"); 
      skylog.info(""); 

      return res.status(200).json(resModel);
    })
    
    
}; 
