const defaultcharacter = {
    name: '',
    life: 0,
    maxlife: 1,
    attack: 0,
    defense: 0

}

const createKnigth = (name) => {
    return {
        ...defaultcharacter,
        name,
        life: 100,
        maxlife: 100,
        attack: 10,
        defense: 6
    }
}

const createSocerer = (name) => {
    return {
        ...defaultcharacter,
        name,
        life: 60,
        maxlife: 60,
        attack: 8,
        defense: 6
    }
}

const createLittleMonster = (name) => {
    return {
        ...defaultcharacter,
        name: 'Little Monster',
        life: 40,
        maxlife: 40,
        attack: 6,
        defense: 2
    }
}

const createBigMonster = (name) => {
    return {
        ...defaultcharacter,
        name: 'Big monster',
        life: 120,
        maxlife: 120,
        attack: 16,
        defense: 8
    }
}

const stage = {
    
    fighter1: null,
    fithter2: null,
    fighter1El: null,
    fithter2El: null,

    start(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        this.fighter1El.querySelector('.attackButton').addEventListener('click', ()=> this.doattack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', ()=> this.doattack(this.fighter2, this.fighter1));

        this.update();
    },
    update(){
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxlife) * 100;
        this.fighter1El.querySelector('.lifebar .bar').style.widht = `${f1Pct}`;

        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxlife) * 100;
        this.fighter2El.querySelector('.lifebar .bar').style.widht = `${f2Pct}%`;
    },
    doattack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Player is dead');
            return;
        }

        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        const actualAttack = attacking.attack * attackFactor;
        const actualdefense = attacked.defense * defenseFactor;

        if (actualAttack > actualdefense) {
            attacked.life -= actualAttack;
            attacked.life = attacked.life < 0 ? 0 : attacked.life;
            log.addMessage(`${attacking.name} caused ${actualAttack.toFixed(2)} of damage to ${attacked.name}`);
        } else {
            log.addMessage(`${attacked.name} managed to defend`);
        }

        this.update();
    }
}

const log = {
    list: [],
    addMessage(msg){
        this.list.push(msg);
        this.render();
    },
    render(){
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}




