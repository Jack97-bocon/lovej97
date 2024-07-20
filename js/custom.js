var myModal = new bootstrap.Modal($('#staticBackdrop'), {
    keyboard: false
});
let GUI = {
    loading: function () {
        var i = 0;
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 10;
            var id = setInterval(frame, 16);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                    myModal.hide();

                } else {
                    width++;
                    elem.style.width = width + "%";
                    elem.innerHTML = width + "%";
                }
            }
        }
    },
    init: function () {
        this.loading();
    },
};

$(document).ready(function () {
    myModal.show();
    GUI.init();
    new WOW().init();
});

