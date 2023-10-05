class Character {

    _life = 1;
    maxlife = 1;
    attack = 0;
    defense = 0;

    constructor (name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxlife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxlife = this.life;
    }
}

class LittleMonster extends Character {
    constructor(name) {
        super(name);
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxlife = this.life;
    }
}

class BigMonster extends Character {
    constructor(name) {
        super(name);
        this.life = 120;
        this.attack = 16;
        this.defense = 10;
        this.maxlife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    } 

    start() {
        this.update();
        
            this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
            this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {

        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxlife) * 100;
        this.fighter1El.querySelector('.lifebar .bar').style.widht = `100%`;

        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxlife) * 100;
        this.fighter2El.querySelector('.lifebar .bar').style.widht = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Player is dead');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualdefense = attacked.defense * defenseFactor;

        if (actualAttack > actualdefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} caused ${actualAttack.toFixed(2)} of damage to ${attacked.name}`);
        } else {
            this.log.addMessage(`${attacked.name} managed to defend`);
        }

        this.update();
    }

}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}