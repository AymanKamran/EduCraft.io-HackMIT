#include <iostream>
#include <string>
#include <string.h>
#include <vector>
#include <sstream>
using namespace std;

string subtitles;

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

void updateSubtitlesViaAPI(int counter)
{
    // UNCOMMENT THESE LINES IF YOU WANT THE FIRST SET of TESTS TO PASS
    // subtitles += " retryingcount" + to_string(counter);
}

//wb punctuation
string firstXwordsGlobal(int X, int buffer)
{
    int counter = X;
    string word;
    string result;
    int retryamount = 0;
    int netretries = 0;

    while (1)
    {
        cerr << "subtitles is " << subtitles << endl;
        if (retryamount > 0)
        {
            updateSubtitlesViaAPI(netretries);
        }
        cerr << "subtitles is " << subtitles << endl;

        if (counter == 0)
        {
            return result;
        }
        stringstream stream(subtitles);

        if (stream >> word)
        {
            counter--;
            retryamount = 0;
            result += " " + word;
            deleteFirstWordGlobal(word);
        }
        else
        {
            // confirm if this else condition executes properly

            // issue is asynchronous
            if (retryamount < buffer)
            {
                retryamount++;
                netretries++;
                cerr << "empty subtitles, retrying; updating retryamount to " << retryamount << endl;
            }
            else
            {
                cerr << "retry count exceeded buffer; returning whatever we have so far" << endl;
                return result;
            }
        }
    }
    return result;
}

// every time the zoom api is called, make sure to cerr the CCs so we can track latency

string first5words()
{
    return firstXwordsGlobal(5, 10);
}

int main()
{
    string result;

    // to get all tests except for the last one to pass successfully (note all should pass except for the last one),
    // uncomment out the code in the updateSubtitlesViaAPI function

    // // // new test
    // cerr << "=============new test" << endl;
    // // subtitles = "1 2 3 4 5 6 7 8 9";
    // // result = firstXwordsGlobal(5, 2);
    // // cerr << result << endl;
    // // cerr << subtitles << endl;

    // // // new test
    // cerr << "=============new test" << endl;
    // // subtitles = "1asdf 2asdf 3asdf 4asdf 5asdf 6asdf 7asdf 8 9";
    // // result = firstXwordsGlobal(5, 2);
    // // cerr << result << endl;
    // // cerr << subtitles << endl;

    // // // new test
    // cerr << "=============new test" << endl;
    // // subtitles = "1asdf/.,;adsf 2asdf/.,;adsf 3asdf/.,;adsf 4asdf/.,;adsf 5asdf/.,;adsf 6asdf/.,;adsf 7asdf/.,;adsf 8 9";
    // // result = firstXwordsGlobal(5, 2);
    // // cerr << result << endl;
    // // cerr << subtitles << endl;

    // // new test
    // cerr << "=============new test" << endl;
    // subtitles = "1 2 3";
    // result = firstXwordsGlobal(5, 2);
    // cerr << result << endl;
    // cerr << subtitles << endl;

    // // new test
    // cerr << "=============new test" << endl;
    // subtitles = "1 2 3 ";
    // result = firstXwordsGlobal(5, 2);
    // cerr << result << endl;
    // cerr << subtitles << endl;

    // // new test
    // cerr << "=============new test" << endl;
    // subtitles = "1 2 ";
    // result = firstXwordsGlobal(5, 2);
    // cerr << result << endl;
    // cerr << subtitles << endl;

    // // new test
    // cerr << "=============new test" << endl;
    // subtitles = "";
    // result = firstXwordsGlobal(5, 2);
    // cerr << result << endl;
    // cerr << subtitles << endl;

    // all tests above do not exceed 2 consecutive retries, but may exceed 2 net retries; the tests will exceed
    // new test
    cerr << "=============new test" << endl;
    subtitles = "1 2 ";
    result = firstXwordsGlobal(5, 2);
    cerr << result << endl;
    cerr << subtitles << endl;
}