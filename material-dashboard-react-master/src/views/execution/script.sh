#// start listening and redirect output to file
cd ../GoogleCloud_SpeechToTextAPI
echo "entered speec to text folder"
export GOOGLE_APPLICATION_CREDENTIALS="./../../../../../../../PennApps/SpeechToText/MyFirstProject-d8e5600f8a94.json"
echo "exported credentials variable"
node ComprehensiveFunction_SpeechToTextTestRun.js micStreamRecognize > OutputAudio
echo "Recognizing Audio"
#(Wait 15 seconds)
^C
echo "Done Recognizing Audio"
#// Ayman's stuff (must take input from OutputAudio and then end result must be in:
#Entire Transcript thus far shhould be in file: transcriptThusFar.txt
#Entire Transcript at end shhould be in file FinalTranscript.txt
echo "About to start rolling C++"
echo "Done with start rolling C++"

#Call Bert on FinalTranscript.txt. Output sould be in FinalSummary.txt
cd ../BertSummarizer
echo "About to start Bert"
python3 MLSummarizeText.py > FinalSummary.txt
echo "Summarizing Bert Complete"

#Call Translate on FinalTranscript.txt ==> TranslatedFinalTranscript.txt
cd ../Translator
export GOOGLE_APPLICATION_CREDENTIALS="/Users/dapi/Desktop/keys.json"
echo "About to start Translating transcript"
node runTranscriptTranslate.js > TranslatedFinalTranscript.txt
echo "Done Translating transcript"

#Call Translate on FinalSummary.txt ==> TranslatedFinalSummary.txt
echo "About to start TranslatedFinalSummary"
node runSummaryTranslate.js > TranslatedFinalSummary.txt
echo "Done Translating TranslatedFinalSummary"

#Call GoogleDocsAPI  (input files above) to send the Transcipts and the Summaries to Google Docs
cd ../docs
echo "About to start google docs transfer"
node index.js
echo "done google docs transfer"



#To clear:
#google docs
#BertSummarizer/FinalSummary.txt
#Translator/TranslatedFinalTranscript.txt
#Translator/TranslatedFinalSummary.txt