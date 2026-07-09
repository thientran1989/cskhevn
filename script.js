const androidUrl =
"https://play.google.com/store/apps/details?id=com.evn.cskh.vn";

const iosUrl =
"https://apps.apple.com/vn/app/evn-cskh/id6754793134";

document.getElementById("androidBtn").href=androidUrl;
document.getElementById("iosBtn").href=iosUrl;

new QRCode("qrAndroid",{

text:androidUrl,
width:170,
height:170

});

new QRCode("qrIOS",{

text:iosUrl,
width:170,
height:170

});

const ua=navigator.userAgent;

let redirected=false;

setTimeout(()=>{

if(/android/i.test(ua)){

redirected=true;

location.href=androidUrl;

return;

}

if(/iPhone|iPad|iPod/i.test(ua)){

redirected=true;

location.href=iosUrl;

return;

}

},800);

setTimeout(()=>{

if(!redirected){

document.querySelector(".loader").style.display="none";

document.getElementById("status").innerHTML=
"Không thể tự chuyển hướng.<br>Vui lòng chọn cách cài đặt bên dưới.";

document.getElementById("manual").style.display="block";

}

},3000);
