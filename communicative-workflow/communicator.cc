#include <iostream>
#include <string>
#include <string.h>
#include <vector>
#include <sstream>
#include <fstream>

using namespace std;

// originally, pipeline was newly receiced transcription (ie whatever was appended)
// subtitles was the whole latest version of the file, with beginnning stuff being deleted and ending stuff being added

// now:
// subtitles is the same
// instead of deleting stuff from the beginning, have a sliding window concept:
// iterate through all words again, but only send those words within the current window
// this is to avoid multiple sources editing the same file

// optimisation: multi-threading and async

// subtitles not sent yet - NOT TO BE USED
string subtitles;
// TODO: nameoffile
string nameoffile = "myfile.txt";

fstream subtitlesfile;

// subtitles about to send
string pipeline;
// pipeline update
bool currSuccess;
//subtitle update
bool subtitleSuccess;
int seq;
int maxSeq = 50;
int retryDelay = 5;

// TODO: language
string lang = "en-US";

class transcript
{
public:
    // string transcript;
    fstream transcriptfile;
    bool success;
    transcript(fstream a, bool b)
    {
        transcriptfile = a;
        success = b;
    }
};

void deleteFirstWordGlobal(string word)
{
    // find
    size_t index = subtitles.find(word);

    // cerr << index << endl;
    // if found
    if (index != string::npos)
    {
        // compute index
        index += word.length();
        // substr - destructive!
        subtitles = subtitles.substr(index);
        // cerr << "successfully removed 1st word; now subtitles is " << subtitles << endl;
    }

    // else
    else
    {
        cerr << "impossible: not found" << endl;
    }
}

// returns transcript as a transcript object
// DONE effectively a constructor; reads from file
transcript &transcriptor(string filename)
{
    fstream file;
    string word;
    file.open(filename.c_str());
    file.close();
    transcript retval(file, true);
    return retval
}

// if success, updates pipeline variable to have only new CCs
// assumes that api returns only new CCs
void updatePipeline(transcript &obj)
{
    if (obj.success)
    {
        pipeline = obj.transcriptfile;
        // TODO: delete first five words of obj.transcriptfile here or where?
        currSuccess = true;
    }
    else
    {
        currSuccess = false;
        cerr << "currSuccess = false" << endl;
    }
}

void updateTranscript()
{
    if (currSuccess)
    {
        subtitles += " " + pipeline;
        subtitleSuccess = true;
    }
    else
    {
        subtitleSuccess = false;
        cerr << "subtitleSuccess = false" << endl;
    }
}

void updateSubtitlesViaAPI()
{
    // reread file
    transcript attemptedTranscription = transcriptor(nameoffile);

    // save into pipepline
    updatePipeline(attemptedTranscription);

    // append a space followed by pipeline to subtitles
    updateTranscript();
}

// buffer is the maximum allowable CONSECUTIVE, not net, retries for transcript-fetching
string firstXwordsGlobal(int X, int buffer)
{
    int counter = X;
    string word;
    string result;
    int retryamount = 0;
    while (1)
    {
        // TODO: change
        updateSubtitlesViaAPI();
        if (counter == 0)
        {
            return result;
        }

        // DONE convert next two lines
        if (subtitlesfile >> word)
        {
            counter--;
            retryamount = 0;
            result += " " + word;
            // TODO: call and implement deleteFirstWordFromFileGlobal(string word);
            deleteFirstWordGlobal(word);
        }
        else
        {
            // issue is asynchronous
            if (retryamount < buffer)
            {
                retryamount++;
                cerr << "empty subtitles, retrying" << endl;
            }
            else
            {
                cerr << "retry count exceeded buffer; returning whatever we have so far" << endl;
                return result;
            }
        }
    }
    // technically not needed:
    return result;
}

// every time the zoom api is called, make sure to cerr the CCs so we can track latency

string first5words()
{
    return firstXwordsGlobal(5, 10);
}

bool ZoomAPICall(string body, int seq, string lang, string Content_Length)
{
    // TODO: call zoom api
    // perform call!
    // increment seq
}

int main()
{
    while (seq <= maxSeq)
    {
        // get input to pause OR timer
        sleep(retryDelay);

        // unconditionally call ZoomAPICall
        string body = first5words();
        ZoomAPICall(body, seq, lang, body.length());
    }
}

// ammar:
// make two copies of transcript; note that in real time it appends to the file
// if we did this, then:
// //: update the file itself too in the following function
// deleteFirstWordGlobal(word);

// ayman:
// make a copy of the transcript myself

// zoom:
// fetch the entire transcript from zoom and then call Bert on that!

// current solution:
// ignore duplicate file for now, use zoom solution as and when necessary
// this requires us to deal in filestreams, not sstream!