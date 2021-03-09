var eventsRef = db.collection("events");

/*同期処理
**/
//var eventsRef = db.collection("events");
eventsRef.orderBy("date", "desc").onSnapshot( (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        // 追加
        if ( change.type === 'added' ) {
            addLog(change.doc.id, change.doc.data());
        }
       /* 更新
       else if( change.type === 'modified' ){
           modLog(change.doc.id, change.doc.data());
       }
       // 削除
       else if ( change.type === 'removed' ) {
           removeLog(change.doc.id);
       }*/
    });
    
 });
 document.getElementById("send2").addEventListener("click", ()=>{
    let date = document.getElementById("date").value;
    let title = document.getElementById("title").value;
    let venue = document.form1.venue.value;
    let content = document.getElementById("content").value;
    // 作成イベントをfirestoreへ送信
    eventsRef.add({
        // 右はcreate.htmlの入力内容
        name: userName,
        date: date,
        title: title,
        venue: venue,
        content: content
    })
    .then(()=>{
        document.form1.reset();
    })
});
function addLog(id, data){
    // 追加するHTMLを作成
    let eventDiv  = document.createElement('div');
    let eventDateDiv  = document.createElement('div');
    let peopleDiv  = document.createElement('div');
    let eventNumber  = document.createElement('p');
    let date  = document.createElement('p');
    let venue  = document.createElement('p');
    let creater = document.createElement('p');
    let follower = document.createElement('p');
    let OnorOff = document.createElement('span');
    let eventTitle = document.createElement('h2');
    eventDiv.className = "event";
    eventDateDiv.className = "date";
    OnorOff.className = "type";
    eventNumber.textContent = "No.";
    date.textContent = `${data.date}`;
    venue.textContent = "会場";
    OnorOff.textContent = `${data.venue}`;
    creater.textContent = `${data.name}`;
    follower.textContent = "参加者";
    eventTitle.textContent = `${data.title}`;
    eventDiv.id = id;
    eventDiv.appendChild(eventNumber);
    eventDateDiv.appendChild(date);
    venue.appendChild(OnorOff);
    eventDateDiv.appendChild(venue);
    eventDiv.appendChild(eventDateDiv);
    eventDiv.appendChild(eventTitle);
    peopleDiv.appendChild(creater);
    peopleDiv.appendChild(follower);
    eventDiv.appendChild(peopleDiv);

    // 表示エリアへ追加
    let eventlog = document.getElementById("eventlog");
    eventlog.insertBefore(eventDiv,eventlog.firstChild);
    
    // ログを追加
    // var user = firebase.auth().currentUser;

    // if (user != null) {
    //     user.providerData.forEach(function (profile) {
    //         console.log("Sign-in provider: " + profile.providerId);
    //         console.log("  Provider-specific UID: " + profile.uid);
    //         console.log("  Name: " + profile.displayName);
    //         console.log("  Email: " + profile.email);
    //         console.log("  Photo URL: " + profile.photoURL);
    //     });
    // }
    
}