//---------------------------------------
// Firestoreの準備
//---------------------------------------
// Firestoreのインスタンス作成
//var db = firebase.firestore();

// チャットルームのリファレンス取得
var messagesRef = db.collection("chatroom");
/**
 * 同期処理
 **/
messagesRef.orderBy("date", "asc").limit(50).onSnapshot( (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        // 追加
        if ( change.type === 'added' ) {
            addLog(change.doc.id, change.doc.data());
        }
        // 更新
        else if( change.type === 'modified' ){
            modLog(change.doc.id, change.doc.data());
        }
        // 削除
        else if ( change.type === 'removed' ) {
            removeLog(change.doc.id);
        }
    });
    
});

/**
 * 送信ボタン押下
 **/
document.getElementById("bms_send_btn").addEventListener("click", ()=>{
    let msg = document.getElementById("bms_send_message").value;
    if( msg.length === 0 ){
        return(false);
    }
    // メッセージをfirestoreへ送信
    messagesRef.add({
        // userPhotoとuserNameはcommon.jsで宣言した変数
        photo: userPhoto,
        name: userName,
        msg: msg,
        date: new Date().getTime()
    })
    .then(()=>{
        let msg = document.getElementById("bms_send_message");
        msg.focus();
        msg.value = "";
    })
});

/**
 * ログに追加 & 表示エリアへ追加
 */
function addLog(id, data){
    // 追加するHTMLを作成
    let chatDiv  = document.createElement('div');
    let chatDataDiv  = document.createElement('div');
    let chatMsgBox  = document.createElement('div');
    let chatName  = document.createElement('span');
    let chatMsg  = document.createElement('span');
    let chatTime  = document.createElement('span');
    let chatImg = document.createElement('img');
    let br = document.createElement('br');
    chatImg.src = data.photo;
    chatImg.className = "chat-photo";
    chatImg.textAlign = "top";
    chatDiv.className = "message";
    chatName.className = "chat-name";
    chatMsg.className = "chat-msg";
    chatMsgBox.className = "chat-msg-box";
    chatTime.className = "chat-time";
    chatName.textContent = `${data.name}`;
    chatMsg.textContent = `${data.msg}`
    chatTime.textContent = `(${getStrTime(data.date)})`
    chatDiv.id = id;
    chatDiv.appendChild(chatImg);
    chatDataDiv.appendChild(chatName);
    chatDataDiv.appendChild(br);
    chatMsgBox.appendChild(chatMsg);
    chatDataDiv.appendChild(chatMsgBox);
    chatDataDiv.appendChild(chatTime);
    chatDiv.appendChild(chatDataDiv);

    // 表示エリアへ追加
    let chatlog = document.getElementById("chatlog");
    chatlog.appendChild(chatDiv);
    // スクロール位置を1番下へ移動
    var scrollHeight = document.getElementById("messages-area").scrollHeight;
    document.getElementById("messages-area").scrollTop = scrollHeight;

    // ログを追加
    var user = firebase.auth().currentUser;

    if (user != null) {
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });
    }
    
}

/**
 * ログを更新
 */
function modLog(id, data){
    let log = document.getElementById(id);
    if( log !== null ){
        log.innerText = `${data.name}: ${data.msg} (${getStrTime(data.date)})`;
    }
}

/**
 * ログを削除
 **/
function removeLog(id){
    let log = document.getElementById(id);
    if( log !== null ){
        log.parentNode.removeChild(log);
    }
}

/**
 * UNIX TIME => MM-DD hh:mm
 **/
function getStrTime(time){
    let t = new Date(time);
    return(
        ("0" + (t.getMonth() + 1)).slice(-2) + "/" +
        ("0" + t.getDate()       ).slice(-2) + " " +
        ("0" + t.getHours()      ).slice(-2) + ":" +
        ("0" + t.getMinutes()    ).slice(-2)
    );
}

