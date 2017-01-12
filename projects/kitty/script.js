(function () {

    var images = document.getElementsByTagName('img');
    console.log(images);

    for( var i=0; i< images.length; i++) {
        images[i].style.left = "100%";

    }

    images[0].style.left= 0;

    var current = 0;
    var next = 1;
    var transition;
    var timer;
    var dotControl = document.getElementsByClassName('dot_control');
    dotControl[current].classList.add('white');



    function carousel (){

        var currentImage = images[current];
        var nextImage = images[next];
        setTimeout(function start(){
            currentImage.classList.add('left');
            nextImage.classList.add('left');
        transition = true;
        },2000);

        currentImage.addEventListener('transitionend', function present() {
            currentImage.removeEventListener('transitionend', present);
            currentImage.classList.remove('left');
            transition = false;
            currentImage.style.left = "100%";
            nextImage.classList.remove('left');
            nextImage.style.left="0px";
            current = next;
            if (next === 3) {
                next = 0;
            } else {
                next = next + 1;
            }
            clearAllDots();

            dotControl[current].classList.add('white');


            timer = setTimeout(carousel,0);

        });

    }


carousel();


function clearAllDots () {
    for (var i = 0; i < dotControl.length; i++) {
        dotControl[i].classList.remove('white');
    }

for (var x = 0; x < dotControl.length; x++) {
    dotControl[x].addEventListener('click', function(e) {
        if (transition) {
            return;
        }
        var n = e.target.innerHTML;
        console.log(n);
        if (n == current) {
            return;
        }
        next = n;
        clearTimeout(timer);
        carousel();
    });
}
}


})();
