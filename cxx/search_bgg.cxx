#include "sstream"
#include "iostream"
#include "string"
#include "fstream"
#include <vector>
#include <unistd.h>
#include <cmath>

using namespace std;
bool file_end=false;

char char_to_encode[] = {'!','#','$','&','\'','(',')','*','+',',','/',':',';','=','?','@','[',']'};
std::string perc_encoded[]={"%21","%23","%24","%26","%27","%28","%29","%2A","%2B","%2C","%2F","%3A","%3B","%3D","%3F","%40","%5B","%5D"};



std::string getline_until(std::ifstream &iff,std::string match){
    if(file_end) return "";
    std::string ll;
    while(getline(iff,ll)){
        if(ll.find(match)==std::string::npos) continue;
        return ll;
    }
    file_end=true;
    return "";
}

std::string extract(std::string src,std::string ldelim,std::string rdelim){
        std::string res=src;
        auto p1=res.find(ldelim);
        if(p1!=std::string::npos){
            res=res.substr(p1+ldelim.size());
        }
        p1=res.find(rdelim);
        if(p1!=std::string::npos){
            res=res.substr(0,p1);
        }
        return res;
}

void mywget(std::string url,std::string dest){
    char cmd[5000];
    sprintf(cmd,"wget -q -O %s '%s'",dest.c_str(),url.c_str());
    std::cout<<cmd<<"\n";
    while(system(cmd)!=0){
        sleep(1);
#ifdef HARDDEBUG
        std::cout<<"WGET failure! Retrying\n";
#else
        // std::cout<<"R"<<std::flush;
#endif
    }
}

std::string process(std::string input){
    std::string output=input;
    for(int i=0;i<output.size();i++){
        if(output[i]=='$') output[i]='s';
    }
    return output;
}


std::string encode(std::string in, char match, std::string rep){
    std::string result=in;
    while(true){
        auto pos=result.find_first_of(match);
        if(pos==result.npos) break;
        result=result.replace(pos,1,rep);
    }
    return result;
}

std::string percent_encode(std::string in){
    std::string res=in;
    for(int i=0;i<18;i++){
        res=encode(res,char_to_encode[i],perc_encoded[i]);
    }
    return res;
}

void search_game(std::string title){
    std::vector<std::string>ids;
    std::vector<std::string>titles;
    std::vector<std::string>years;
    // struct gameinfo res;
    // res.BGGID=bgg_index;
    std::cout<<"Title is: "<<title<<"\n";
    char url[1000];
    std::string ptitle=percent_encode(title);
    std::cout<<"PTitle is: "<<ptitle<<"\n";
    sprintf(url,"https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&q=%s",ptitle.c_str());
    std::cout<<url<<"\n";
    mywget(std::string(url),"/tmp/bggdump");
    std::ifstream iff("/tmp/bggdump");
    std::string line;
    while(true){
        getline_until(iff,"<tr id='row_'>");
        line=getline_until(iff,"href=\"/boardgame/");
        if(file_end) break;
        ids.push_back(extract(line,"boardgame/","/"));
        line=getline_until(iff,"href=\"/boardgame/");
        titles.push_back(extract(line,">","<"));
        line=getline_until(iff,"'smallerfont dull'");
        years.push_back(extract(line,"'smallerfont dull'>(",")"));
    }

    for(int i=0;i<ids.size();i++){
        std::cout<<ids[i]<<"###"<<titles[i]<<"###"<<years[i]<<"\n";
    }
}



int main(int argc, char** argv){
    if(argc<2) return -1;

    // std::cout<<"Searching for "<<argv[1]<<"\n";
    search_game(argv[1]);
    return 0;
}





