#include "fstream"
#include "sstream"
#include "iostream"
#include "string"
#include <unistd.h>
#include <cmath>

struct gameinfo{
    long int BGGID;
    std::string title;
    std::string link;
    std::string imglink;
    std::string year;
    std::string minplayers,maxplayers;
    std::string mintime,maxtime;
    std::string minage;


    void print(){
        std::cout<<"**************************\n";
        std::cout<<"Title : "<<title<<"\n";
        std::cout<<"Link : "<<link<<"\n";
        std::cout<<"Image : "<<imglink<<"\n";
        std::cout<<"Year : "<<year<<"\n";
        std::cout<<"Players : "<<minplayers<<"-"<<maxplayers<<"\n";
        std::cout<<"Duration : "<<mintime<<"-"<<maxtime<<"\n";
    }

    std::string getplayers(){
        if(minplayers.compare(maxplayers)==0){
            return minplayers;
        }
        return minplayers+"-"+maxplayers;
    }

     std::string gettime(){
        if(mintime.compare(maxtime)==0){
            return mintime+" min";
        }
        return mintime+"-"+maxtime+" min";
    }

    void print_mysql(){
        std::cout<<"INSERT IGNORE INTO BGM_Infos (info_BGGID, info_Title, info_Players, info_Age, info_Time, info_Year, info_Picture,info_Link) VALUES (\""<<BGGID<<"\",\""<<title<<"\",\""<<getplayers()<<"\",\""<<minage<<"+\",\""<<gettime()<<"\",\""<<year<<"\",\""<<imglink<<"\",NULL)";
    }
};

using namespace std;
bool file_end=false;

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
    while(system(cmd)!=0){
        sleep(1);
#ifdef HARDDEBUG
        std::cout<<"WGET failure! Retrying\n";
#else
        // std::cout<<"R"<<std::flush;
#endif
    }
}

gameinfo process_game(long int bgg_index){
    struct gameinfo res;
    res.BGGID=bgg_index;
    char url[1000];
    sprintf(url,"https://boardgamegeek.com/boardgame/%ld/",bgg_index);
    mywget(std::string(url),"/tmp/bggdump");
    std::ifstream iff("/tmp/bggdump");
    std::string line;
    line=getline_until(iff,"<title>");
    res.title=extract(line,"<title>"," |");
    line=getline_until(iff,"<link");
    res.link=extract(line,"href=\"","\"");
    line=getline_until(iff,"246x300");
    res.imglink=extract(line,"href=\"","\"");

    line=getline_until(iff,"GEEK.geekitemPreload");
    res.year=extract(line,"\"yearpublished\":\"","\"");
    res.minplayers=extract(line,"\"minplayers\":\"","\"");
    res.maxplayers=extract(line,"\"maxplayers\":\"","\"");
    res.mintime=extract(line,"\"minplaytime\":\"","\"");
    res.maxtime=extract(line,"\"maxplaytime\":\"","\"");
    res.minage=extract(line,"\"minage\":\"","\"");
    res.print_mysql();
    return res;
}



int main(int argc, char** argv){
    if(argc<2) return -1;

    long int id=atoi(argv[1]);
    process_game(id);
    return 0;
}





