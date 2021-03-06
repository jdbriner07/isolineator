const {voices} = require('./voices.js');

if (process.env.GOOGLE_PRIVATE_KEY_ID) {
  var credentials = {
    type: "service_account",
    project_id: "isolineator-162918",
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: "isolineator@isolineator-162918.iam.gserviceaccount.com",
    client_id: "108655960826759356460",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://accounts.google.com/o/oauth2/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/isolineator%40isolineator-162918.iam.gserviceaccount.com"
  }
  var Translate = require('@google-cloud/translate')({
    projectId: 'isolineator-162918',
    credentials: credentials
  })
} else {
  var Translate = require('@google-cloud/translate')({
  	projectId: 'isolineator-162918',
  	keyFilename: './APIs/Isolineator-a25b826f81b6.json'
  })
}


exports.Translater = function(text, target, callback) {
	Translate.translate(text, target).then((results) => {
    callback(results[0]);
  }).catch((error) => {
  		console.log(error);
  })
};

exports.listLanguages = (callback) => {
  Translate.getLanguages()
    .then((results) => {
      let finalLanguages = [];
      let voicesLanguages = voices.map((voice) => {
        return voice.LanguageName;
      });

      const languages = results[0];
      languages.forEach((language) => {
        if (voicesLanguages.includes(language.name)) {
          finalLanguages.push(language);
        }
      });
      finalLanguages.forEach((language) => console.log(language));

      callback(finalLanguages);
    });
};

























//*******************This was original code used to call API*********************



// var exampleData = ['All work and no play makes Jack a dull boy'];

// var format = exampleData[0].split(' ').reduce(function(acc, value) {
// 	return acc + value + '%20';
// }, 'https://translation.googleapis.com/language/translate/v2?key=AIzaSyCciuiJZRV2VU7NSbm_Tjv4mboAEID-D3w&source=en&target=es&q=')

// var url = format.slice(0, -3);

// var options = {
// 	'Content-Type': 'plain/text',
// 	'url': url
// }

// var Translate = request(options, function (error, response, body) {
// 	if (error) {
// 		console.log(error);
// 	}

//   if (!error && response.statusCode === 200) {
//     console.log(body)
//   } 
// });

// module.exports.Translate = Translate;