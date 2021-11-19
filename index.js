const fs = require("fs");

process.title = "Wordlist Maker by @Michal2SAB";

const r = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const c = {
    c: '\x1b[36m',
    y: '\x1b[33m',
    r: '\x1b[37m',
    g: '\x1b[32m'
};

const cars = "./lists/cars.txt";
const soccer = "./lists/soccer.txt";
const football = "./lists/football.txt";
var uText;

r.question(`${c.c}Target's name/username${c.r}: ${c.y}`, username => {
    console.log(c.c);
    uText = c.y+username+c.c;
    r.question(`Any passwords ${uText} used or uses${c.r}: `, password => {
        console.log(c.c);
        r.question(`Any pets/animals ${uText} likes or owns${c.r}: `, pet => {
            console.log(c.c);
            r.question(`Owned and/or liked cars (brands) by ${uText+c.r}: `, vehicle => {
                console.log(c.c);
                r.question(`If ${uText} has any loved ones or crushes, name them${c.r}: `, lover => {
                    console.log(c.c);
                    r.question(`Is ${uText} a soccer fan ? (y/n)${c.r}: `, ball => {
                        if (ball === 'y') ball = true;
                        console.log(c.c);
                        r.question(`Is ${uText} a american football fan ? (y/n)${c.r}: `, american => {
                            console.log(c.c);
                            r.question(`Is ${uText} from the UK ? (y/n)${c.r}: `, english => {
                                console.log(c.c);
                                r.question(`Is ${uText} a rap fan ? (y/n)${c.r}: `, rap => {
                                    console.log("");
                                    generate(username, password, pet, vehicle, lover, ball, american, english, rap);
                                    r.close();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

async function generate (username, password, pet, vehicle, lover, ball, american, english, rap) {
    var soccerList;
    var footballList = [];
    var carList = [];

    for (x of arguments) {
        if(x != '' && x instanceof String) {
            x = x.replace(/ /g, "").split(',');
            x.forEach(i => {
                i = i.toLowerCase();
                fs.readFile(cars, function (err, data) {
                    if (err) throw err;
                    data = data.toString().toLowerCase();
                    var regex = new RegExp(`\\b${i}\\b`);
                    if(data.match(regex)) console.log(`${i} is found in car list`);
                });
            });
        };
    };
    if(ball) {
        fs.readFile(soccer, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\n");
            soccerList = data;
            console.log(`Added soccer list to wordlist`);
            console.log(soccerList);
        });
    }
};
