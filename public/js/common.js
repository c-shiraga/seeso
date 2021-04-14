// サインアウト時に動く関数
onSignOutButtonClicked = function() {
    firebase.auth().signOut().then(function() {
        alert("サインアウトしました。");
        
        location.href = '../index.html';
    })
    .catch(function(error) {
        alert(`サインアウトできませんでした。${error}`);
    });
};
// 名前と画像を入れるための変数を宣言
var userName = "";
var userPhoto = "";

var db = firebase.firestore();
//var eventsRef = db.collection("events");
// サインイン時に動く関数
firebase.auth().onAuthStateChanged((user) => {
    if (user.email.match(/@oic-ok/)) {
        // サインインしている状態
        // サインインと同時にログを表示
        console.log("Sign-in provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  Photo URL: " + user.photoURL);
        // サインしているユーザーの名前と画像を取得
        userName = user.displayName;
        userPhoto = user.photoURL;

        
    } else {
        // サインインしていない状態
        // サインイン画面に遷移する等
        location.href = '../html/error.html';
    }
});

