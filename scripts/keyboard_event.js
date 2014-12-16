function doKeyDown(evt){
    switch (evt.keyCode) {
        case 13:  /* enter key was pressed */
            $('.test').hide();
            break;
    }
}

window.addEventListener('keydown',doKeyDown,true); //eventlistener, key input
