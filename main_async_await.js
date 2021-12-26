const puppeteer=require("puppeteer");
const hackerrankUrl="https://www.hackerrank.com/auth/login";
const email="qiguhy@acrossgracealley.com";
const password="123456789";

const ans=`#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);


int simpleArraySum(vector<int> ar) {
    int ans=0;
    for(int i:ar){
        ans+=i;
    }
    return ans;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string ar_count_temp;
    getline(cin, ar_count_temp);

    int ar_count = stoi(ltrim(rtrim(ar_count_temp)));

    string ar_temp_temp;
    getline(cin, ar_temp_temp);

    vector<string> ar_temp = split(rtrim(ar_temp_temp));

    vector<int> ar(ar_count);

    for (int i = 0; i < ar_count; i++) {
        int ar_item = stoi(ar_temp[i]);

        ar[i] = ar_item;
    }

    int result = simpleArraySum(ar);

    fout << result;

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
`;

(async function func(){

    try{
        const browserObj= await puppeteer.launch({
            headless:false,
            args:["--start-maximized"],
            defaultViewport:false
        });
    
        const page=await browserObj.newPage();
        await page.goto(hackerrankUrl);
        await page.type("input[id='input-1']",email,{delay:50});
        await page.type("input[type='password']",password,{delay:50});
        await page.click("button[data-analytics='LoginPassword']",{delay:50});
        await waitAndClick(".topic-card a[data-attr1='algorithms']",page);
        await waitAndClick("input[value='warmup']",page);
        await page.waitFor(3000);
        let allChallanges=await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
        await questionSolver(allChallanges[0],page,ans);
    }
    catch(err){
        console.log("Error",err);
    }

})();

// const browserOpen=puppeteer.launch({
//     headless:false,
//     args:["--start-maximized"],
//     defaultViewport:false
// });

// console.log(typeof(browserOpen));

// let page;

// browserOpen.then(function(browserObj){
//     return browserObj.newPage();
// }).then(function(newTab){
//     page=newTab;
//     return newTab.goto(hackerrankUrl);
// }).then(function(){
//     let emailIsEntered=page.type("input[id='input-1']",email,{delay:50});
//     return emailIsEntered;
// }).then(function(){
//     let passwordIsEntered=page.type("input[type='password']",password,{delay:50});
//     return passwordIsEntered;
// }).then(function(){
//     let loginButtonClick=page.click("button[data-analytics='LoginPassword']",{delay:50});
//     return loginButtonClick;
// }).then(function(){
//     let clickAlgoPromise=waitAndClick(".topic-card a[data-attr1='algorithms']",page);
//     return clickAlgoPromise;
// }).then(function(){
//     let getToWarmup=waitAndClick("input[value='warmup']",page);
//     return getToWarmup;
// }).then(function(){
//     let waitFor3Seconds=page.waitFor(3000);
//     return waitFor3Seconds;
// }).then(function(){
//     let allChallangesPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
//     return allChallangesPromise;
// }).then(function(questionsArr){
//     let questionWillBeSolved=questionSolver(questionsArr[0],page,ans);
//     return questionWillBeSolved;
// })

// function waitAndClick(selector,cPage){
//     return new Promise(function(resolve,reject){
//         let waitForModelPromise=cPage.waitForSelector(selector);
//         waitForModelPromise.then(function(){
//             let clickModal=cPage.click(selector);
//             return clickModal;
//         }).then(function(){
//             resolve();
//         }).catch(function(err){
//             reject();
//         })
//     });
// }

async function waitAndClick(selector,cPage){
    await cPage.waitForSelector(selector);
    return cPage.click(selector);
}

async function questionSolver(question,cPage,ans){
        await question.click();
        await waitAndClick(".monaco-editor.no-user-select.vs",cPage);
        await waitAndClick("input[type='checkbox']",cPage);
        await waitAndClick('.input.text-area.custominput.auto-width',cPage);
        await cPage.type('.input.text-area.custominput.auto-width',ans);
        await cPage.keyboard.down('Control');
        await cPage.keyboard.press('A',{delay:100});
        await cPage.keyboard.press('X',{delay:100});
        await  cPage.keyboard.up('Control');
        await cPage.click(".monaco-editor.no-user-select.vs");
        await cPage.keyboard.down('Control');
        await cPage.keyboard.press('A',{delay:100});
        await cPage.keyboard.press('V',{delay:100});
        await cPage.keyboard.up('Control');
        return waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",cPage);
}