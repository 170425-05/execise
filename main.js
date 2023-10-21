let inputKeys="";


function showExeCount(event){
  let inputKey;
  //event.keyが存在した場合は、そのままevent.keyを入力文字として扱う
  //event.keyが存在するのは、実際のキーボードのキーが押されたとき
  
if(event.key){
  
  inputKey=event.key;
}else{
  //ボタンの場合はevent.targetに押されたボタンの要素が入っている。
  //ボタンの要素のinnerTextに各文字が入っている。
  inputKey=event.target.innerText;
}

const resultEelement = document.getElementById("result");
  resultEelement.className = "result-hidden";



//何も要素がなければ処理しない
if(!inputKey){
  return;
}
//enter,delete以外の2文字以上の入力は使わない
if(inputKey!="Enter"&&inputKey!="Delete"&&inputKey.length>=2){
  return;
}


//Enterキーが押された　または　Enterボタンが押された
if(inputKey=="Enter"){
  //正誤判定
  const resultElement=document.getElementById("result");
  resultEelement.className="result";
  //wordgameオブジェクトのevalution関数に入力してきた文字列を渡して、正誤判定を行う。
  if(wordgame.evaluation(inputKeys)){
    resultElement.innerText="正解";
  }else{
    resultElement.innerText="不正解";
  }
  return;//Enterの場合は文字入力はしないのでここで処理終了
}







//Deleteキーが押された　または　Deleteボタンが押された
//Deleteが押された場合は保持されている文字列から最後の一文字を消す

if(inputKey=="Delete"){
  //入力されてきた文字列の長さ-１の長さを取り消す=最後の一文字をのぞいた文字列
  let deleteLast=inputKeys.substring(0, inputKeys.length - 1);
  inputKeys=deleteLast;
  //一文字削除された文字列を表示する
  const timeElement=
  document.getElementById("keyboardinput");
  timeElement.innerText=deleteLast;
  return;//Deleteに関する処理終了
}








//a-zのキーが押されたとき
  //aの文字コードを調べて、文字コードとしてのアルファベットの開始位置を調べる。
  const aCharCode='a'.charCodeAt(0);
  //aの文字コードからzの文字コードまで26文字分をfor文で繰り返す。
  for (let i=aCharCode; i<aCharCode+26; i++){
    //ここでのiはアルファベットの文字コードなので、その文字コードから実際の文字に戻す。
    const alphabet=String.fromCharCode(i);
    if(inputKey===alphabet){
//inputKeysという変数に押されたキーの文字を足していく。
inputKeys=inputKeys+inputKey;
//これまでに入力された文字列(inputkeys)を表示する。
const timeElement=
document.getElementById("keyboardinput");
timeElement.innerText=inputKeys;
    }
  }
}

document.onkeydown= showExeCount;

const wordgame={
  question:"リンゴの英単語は？",
  correct:"apple",
  evaluation:function(answer){
    return wordgame.correct==answer;
  }
};

console.log(wordgame.evaluation("apple"));

function showAlphabet(){
  const virtualkeyboard=
  document.getElementById("virtualkeyboard");
  //aの文字コードを調べて、文字コードとしてのアルファベットの開始位置を調べる。
  


  const aCharCode='a'.charCodeAt(0);
  //aの文字コードからzの文字コードまで26文字分をfor文で繰り返す。
  for (let i=aCharCode; i<aCharCode+26; i++){
    //ここでのiはアルファベットの文字コードなので、その文字コードから実際の文字に戻す。
    const letter=String.fromCharCode(i);
    //'button'要素を作成する
    const childButton=document.createElement("button");
    //作ったボタンの文字の指定
    childButton.innerText=letter;
    //作成したボタンがクリックされたときにshowExeCount関数が実行されるようにする
    childButton.onclick=showExeCount;
    //virtualkeyboard要素の子供として作成したボタン要素を追加する
    virtualkeyboard.appendChild(childButton);
  }
  //Enterボタンの作成
  const enterButton=document.createElement("button");
  enterButton.innerText="Enter";
  enterButton.onclick=showExeCount;
  virtualkeyboard.appendChild(enterButton);

  //Deleteボタンの作成
  const deleteButton=document.createElement("button");
  deleteButton.innerText="Delete";
  deleteButton.onclick=showExeCount;
  virtualkeyboard.appendChild(deleteButton);
}
showAlphabet();

const questionElement=document.getElementById("question");
questionElement.innerText=wordgame.question;