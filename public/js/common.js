onSignOutButtonClicked = function() {
    firebase.auth().signOut().then(function() {
        location.href = '../index.html';
        alert("サインアウトしました。");
    })
    .catch(function(error) {
        alert(`サインアウトできませんでした。${error}`);
    });
};

var userName = "";
var userPhoto = "";

firebase.auth().onAuthStateChanged((user) => {
    if (user.email.match(/@oic-ok/)) {
        // サインインしている状態
        console.log("Sign-in provider: " + user.providerId);
        console.log("  Provider-specific UID: " + user.uid);
        console.log("  Name: " + user.displayName);
        console.log("  Email: " + user.email);
        console.log("  Photo URL: " + user.photoURL);
        userName = user.displayName;
        userPhoto = user.photoURL;
    } else {
        // サインインしていない状態
        // サインイン画面に遷移する等
        alert("OICアカウントでサインインしてください。")
        location.href = '../index.html';
    }
});

