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

    cerr << index << endl;
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

int main()
{
    string word;

    // new test
    subtitles = "geeksforgeeks a computer science";
    word = "geeks";
    deleteFirstWordGlobal(word);

    // new test
    subtitles = "a b c d e f";
    word = "a";
    deleteFirstWordGlobal(word);

    // new test
    subtitles = "adsf1 asdf2 asdf3";
    word = "adsf1";
    deleteFirstWordGlobal(word);

    // new test
    subtitles = "adsf1    asdf2   asdf3";
    word = "adsf1";
    deleteFirstWordGlobal(word);
}
