//make sure to change scope

var util = require('util');
const fs = require('fs'); 
const FinalTranslated_Transcript = fs.readFileSync('./../Translator/TranslatedFinalTranscript.txt', 
            {encoding:'utf8', flag:'r'}); 
const FinalTranslated_Summary = fs.readFileSync('./../Translator/TranslatedFinalSummary.txt', 
            {encoding:'utf8', flag:'r'}); 
const FinalSummary = fs.readFileSync('./../BertSummarizer/FinalSummary.txt', 
            {encoding:'utf8', flag:'r'}); 
const FinalTranscript = fs.readFileSync('./../GoogleCloud_SpeechToTextAPI/FinalTranscript.txt', 
            {encoding:'utf8', flag:'r'});

console.log("Here is FinalTranslated_Transcript", FinalTranslated_Transcript, "\n\n\n\n\n\n")
console.log("Here is FinalTranslated_Summary", FinalTranslated_Summary, "\n\n\n\n\n\n")
console.log("Here is FinalSummary", FinalSummary, "\n\n\n\n\n\n")
console.log("Here is FinalTranscript", FinalTranscript, "\n\n\n\n\n\n")

var IDTranscriptDOCID = "11cjl_RzEePOlvIf87t8NkmIPP1Q2gZPW9CEmdBinax0"
var BERTSummaryDocID = "1zAHnCChAyIdbwRlS4IUkvx0SJ9wUOVvGLBw0gHc8h5M"
// var englishTranscript;
// var englishTranscript;
// var englishSummary;
// var frenchSummary;

const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/documents'];
// const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('/Users/dapi/Desktop/docskeys.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Docs API.
  authorize(JSON.parse(content), printDocTitleAndAddText);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the title of a sample doc:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
 */
async function printDocTitleAndAddText(auth) {
  const docs = google.docs({version: 'v1', auth});
  docs.documents.get({
    documentId: IDTranscriptDOCID,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(`The title of the document is: ${res.data.title}`);
  });


  // console.log("Doc structure is: \n")
  // var result = await docs.documents.get({documentId: IDTranscriptDOCID})
  // console.log(util.inspect(result, showHidden=false, depth=100, colorize=true));






  // docs.documents.get({
  //   documentId: '1OX32QHr2GAUi8QRh1cbxxOhM_5SxR9C__NcKcSBEdzM',
  // })
  // // -------------------------------------------
  // var updateObject = {
  //   documentId: '1OX32QHr2GAUi8QRh1cbxxOhM_5SxR9C__NcKcSBEdzM',
  //   resource: {
  //     requests: [{
  //       insertText: {
  //         text: "Sameer Bayani",
  //         location: {
  //           index: 1, // Modified
  //         },
  //       },
  //     }],
  //   },
  // };
  // gapi.client.docs.documents.batchUpdate(updateObject)
  // .then(function(res) { // Modified
  //   console.log(res);
  // },function(err) {
  //   console.error(err);
  // });

//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------

var FrenchTranscriptIndex = 190
var FrenchTranscript = FinalTranslated_Transcript
var EnglishTranscriptIndex = 168
var EnglishTranscript = FinalTranscript

// //-------------------------------------------
console.log("Uploading French Transcript")
docs.documents.batchUpdate({
 auth,
 documentId: IDTranscriptDOCID,
 requestBody: {
   requests: [
     {
       insertText: {
         location: {
           index: FrenchTranscriptIndex
         },
         text: FrenchTranscript
       }
     }
   ]
 }
});
console.log("Uploaded French Transcript ------------")

 // //-------------------------------------------

  // //-------------------------------------------
  console.log("Uploading English Transcript")
 docs.documents.batchUpdate({
  auth,
  documentId: IDTranscriptDOCID,
  requestBody: {
    requests: [
      {
        insertText: {
          location: {
            index: EnglishTranscriptIndex
          },
          text: EnglishTranscript
        }
      }
    ]
  }
});
console.log("Uploaded English Transcript ------------")

  // //-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------
//-------------------------------------------//-------------------------------------------//-------------------------------------------


var FrenchSummaryIndex = 230
var FrenchSummary = FinalTranslated_Summary
var EnglishSummaryIndex = 209
var EnglishSummary = FinalSummary
// //-------------------------------------------
console.log("Uploading French Summary")
docs.documents.batchUpdate({
 auth,
 documentId: BERTSummaryDocID,
 requestBody: {
   requests: [
     {
       insertText: {
         location: {
           index: FrenchSummaryIndex
         },
         text: FrenchSummary
       }
     }
   ]
 }
});
console.log("Uploaded French Summary ------------")

 // //-------------------------------------------

 // //-------------------------------------------
console.log("Uploading English Summary")
docs.documents.batchUpdate({
 auth,
 documentId: BERTSummaryDocID,
 requestBody: {
   requests: [
     {
       insertText: {
         location: {
           index: EnglishSummaryIndex
         },
         text: EnglishSummary
       }
     }
   ]
 }
});
console.log("Uploaded English Summary ------------")

 // //-------------------------------------------


}



// // ------------------------------------------------------------------ adding txt
// // List<Request> 
// requests = new ArrayList();
// requests.add(new Request().setInsertText(new InsertTextRequest()
//         .setText(text1)
//         .setLocation(new Location().setIndex(25))));

// // requests.add(new Request().setInsertText(new InsertTextRequest()
// //         .setText(text2)
// //         .setLocation(new Location().setIndex(50))));

// // requests.add(new Request().setInsertText(new InsertTextRequest()
// //         .setText(text3)
// //         .setLocation(new Location().setIndex(75))));

// // BatchUpdateDocumentRequest 
// body = new BatchUpdateDocumentRequest().setRequests(requests);
// // BatchUpdateDocumentResponse 
// response = docsService.documents()
//         .batchUpdate(DOCUMENT_ID, body).execute();
