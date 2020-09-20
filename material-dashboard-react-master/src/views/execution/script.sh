#// start listening and redirect output to file
cd ../GoogleCloud_SpeechToTextAPI
export GOOGLE_APPLICATION_CREDENTIALS="./../../../../../../../PennApps/SpeechToText/MyFirstProject-d8e5600f8a94.json"
node ComprehensiveFunction_SpeechToTextTestRun.js micStreamRecognize > OutputAudio

#// Ayman's stuff


#Entire Transcript thus far shhould be in file: transcriptThusFar.txt
#Entire Transcript at end shhould be in file FinalTranscript.txt


#Call Bert on FinalTranscript.txt. Output sould be in FinalSummary.txt
cd ../BertSummarizer

#Call Translate on FinalTranscript.txt ==> TranslatedFinalTranscript.txt

#Call Translate on FinalSummary.txt ==> TranslatedFinalSummary.txt

#Call GoogleDocsAPI  (input files above) to send the Transcipts and the Summaries to Google Docs