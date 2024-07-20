$(document).ready(function(){
    $('.btn_cs_kf').attr("href", "https://direct.lc.chat/13864353/");

    
    $('.js-download').on("click", function (ev) {
        ev.preventDefault();
        var platform = window.navigator.platform,  iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        ios_download = "https://68gbbet5.com/?code=15072337";//"https://ht68.club";
        android_download ="https://tai68gamebai.biz/public/apk/68game-release-213.apk";
        hostcode = document.location.host,
        hostcode = hostcode.replace("www.","");
    
        
        var goTo = android_download;
        if (iosPlatforms.indexOf(platform) !== -1) {
            goTo = ios_download;
        } 
        $('#contain').show();
        setTimeout(function(){
          $('#contain').hide();
          window.location = goTo;
        }, 1000);
    }); 
});








