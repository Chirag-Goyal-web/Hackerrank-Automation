const puppeteer=require("puppeteer");
const hackerrankUrl="https://www.hackerrank.com/auth/login";
const email="sicucura@thecarinformation.com";
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

const browserOpen=puppeteer.launch({
    headless:false,
    args:["--start-maximized"],
    defaultViewport:false
});

let page;

browserOpen.then(function(browserObj){
    return browserObj.newPage();
}).then(function(newTab){
    page=newTab;
    return newTab.goto(hackerrankUrl);
}).then(function(){
    let emailIsEntered=page.type("input[id='input-1']",email,{delay:50});
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered=page.type("input[type='password']",password,{delay:50});
    return passwordIsEntered;
}).then(function(){
    let loginButtonClick=page.click("button[data-analytics='LoginPassword']",{delay:50});
    return loginButtonClick;
}).then(function(){
    let clickAlgoPromise=waitAndClick(".topic-card a[data-attr1='algorithms']",page);
    return clickAlgoPromise;
}).then(function(){
    let getToWarmup=waitAndClick("input[value='warmup']",page);
    return getToWarmup;
}).then(function(){
    let waitFor3Seconds=page.waitFor(3000);
    return waitFor3Seconds;
}).then(function(){
    let allChallangesPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
    return allChallangesPromise;
}).then(function(questionsArr){
    let questionWillBeSolved=questionSolver(questionsArr[0],page,ans);
    return questionWillBeSolved;
})

function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector);
        waitForModelPromise.then(function(){
            let clickModal=cPage.click(selector);
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    });
}

function questionSolver(question,cPage,ans){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click();
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick(".monaco-editor.no-user-select.vs",cPage);
            return EditorInFocusPromise;
        }).then(function(){
            let checkBoxClickPromise=waitAndClick("input[type='checkbox']",cPage);
            return checkBoxClickPromise;
        }).then(function(){
            let smallEditorClickPromise=waitAndClick('.input.text-area.custominput.auto-width',cPage);
            return smallEditorClickPromise;
        }).then(function(){
            return cPage.type('.input.text-area.custominput.auto-width',ans);
        }).then(function(){
            let CTRLIsPressed=cPage.keyboard.down('Control');
            return CTRLIsPressed;
        }).then(function(){
            let AIsPressed=cPage.keyboard.press('A',{delay:100});
            return AIsPressed;
        }).then(function(){
            let XIsPressed=cPage.keyboard.press('X',{delay:100});
            return XIsPressed;
        }).then(function(){
            return cPage.keyboard.up('Control');
        }).then(function(){
            return cPage.click(".monaco-editor.no-user-select.vs");
        }).then(function(){
            let CTRLIsPressed=cPage.keyboard.down('Control');
            return CTRLIsPressed;
        }).then(function(){
            let AIsPressed=cPage.keyboard.press('A',{delay:100});
            return AIsPressed;
        }).then(function(){
            let VIsPressed=cPage.keyboard.press('V',{delay:100});
            return VIsPressed
        }).then(function(){
            return cPage.keyboard.up('Control');
        }).then(function(){
            return waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled",cPage);
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })

    })
}