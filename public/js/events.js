var eventsRef = db.collection("events");

/*同期処理
**/
//var eventsRef = db.collection("events");
eventsRef.orderBy("date", "asc").onSnapshot( (snapshot) => {
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
    let url = document.getElementById("url").value;
    // 作成イベントをfirestoreへ送信
    if(date != "" && title != "" && venue!="" && content!="" && url!=""){
    eventsRef.add({
        // 右はcreate.htmlの入力内容
        name: userName,
        date: date,
        title: title,
        venue: venue,
        content: content,
        url: url
    })
    .then(()=>{
        document.form1.reset();
    })
}else{
    alert("未入力の項目があります。")
}
});
function addLog(id, data){
    // 追加するHTMLを作成
    let eventDiv  = document.createElement('div');
    let eventDateDiv  = document.createElement('div');
    let peopleDiv  = document.createElement('div');
    let date  = document.createElement('p');
    let venue  = document.createElement('p');
    let creater = document.createElement('p');
    let OnorOff = document.createElement('span');
    let eventTitle = document.createElement('h2');
    let eventDetails = document.createElement('details');
    let eventSummary = document.createElement('summary');
    let eventContent = document.createElement('p');
    let followbutton = document.createElement('a');
    followbutton.href=`${data.url}`;
    eventDiv.className = "event";
    eventDateDiv.className = "date";
    OnorOff.className = "type";
    date.textContent = `日時: ${data.date}`;
    venue.textContent = "会場:";
    OnorOff.textContent = `${data.venue}`;
    if(data.venue === "オンライン"){
        OnorOff.className = "online";
    }else{
        OnorOff.className = "offline";
    }
    creater.textContent = `作成者: ${data.name}`;
    followbutton.textContent = "参加";
    eventTitle.textContent = `${data.title}`;
    eventSummary.textContent = "詳細";
    eventContent.textContent = `${data.content}`;
    eventDiv.id = id;
    eventDateDiv.appendChild(date);
    venue.appendChild(OnorOff);
    eventDateDiv.appendChild(venue);
    eventDiv.appendChild(eventDateDiv);
    eventDiv.appendChild(eventTitle);
    peopleDiv.appendChild(creater);
    peopleDiv.appendChild(followbutton);
    eventDiv.appendChild(peopleDiv);
    eventDetails.appendChild(eventSummary);
    eventDetails.appendChild(eventContent);
    eventDiv.appendChild(eventDetails);
    

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

