// make sure to:
// npm install --save @google-cloud/translate
// export GOOGLE_APPLICATION_CREDENTIALS="/Users/dapi/Desktop/keys.json"

const fs = require('fs'); 
const FinalSummary = fs.readFileSync('./../BertSummarizer/FinalSummary.txt', 
            {encoding:'utf8', flag:'r'}); 

const FinalTranscript = fs.readFileSync('./../GoogleCloud_SpeechToTextAPI/FinalTranscript.txt', 
            {encoding:'utf8', flag:'r'});
            
            

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'The text to translate, e.g. Hello, world!';
const target = 'fr';

async function translateTextTranscript() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(FinalTranscript, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translated Transcript:');
  translations.forEach((translation, i) => {
    console.log(`Speaker: ${translation}`);
    // console.log(`${text[i]} => (${target}) ${translation}`);
  });
}
// console.log("Translated Summary is:")
translateTextTranscript();

