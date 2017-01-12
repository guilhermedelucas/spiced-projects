(function() {


var data = [];

$.get('links.json', function(data){
    $.each(data, function(i){
    $("#the_ticker").append("<a href="+ data[i].link + ">"+ data[i].text + "</a>");
    });
    animate();
    mouseControl();
});

    var elem = document.getElementById('the_ticker');
    var links = document.getElementsByTagName("a");
    console.log(links);
    var animFrameId;
    var position = document.getElementById('container');
    elem.style.left = parseInt(position.offsetWidth) + "px";

    function animate () {

        $('a').addClass("anim_info");
        var leftPosition = elem.offsetLeft - 1;
        elem.style.left = leftPosition + "px";
        animFrameId = requestAnimationFrame(animate);
        if (leftPosition < -links[0].offsetWidth) {
            elem.style.left = links[0].offsetWidth + leftPosition + 'px';
            elem.appendChild(links[0]);
        }
    }


    function mouseControl () {for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function (e){
            cancelAnimationFrame(animFrameId);
        });
    }

        for (i = 0; i < links.length; i++) {
            links[i].addEventListener("mouseleave", function (e){
                animFrameId = requestAnimationFrame(animate);
            });
        }
    }

})();
