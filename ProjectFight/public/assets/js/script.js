//let log = new Log(document.querySelector('.log'));

//let char = new Knight('Skull Nigth');
//let monster = new LittleMonster('Godzilla');


/*const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();*/

const char = createKnigth('Maxciel');
const monster = createLittleMonster();

stage.start(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
);