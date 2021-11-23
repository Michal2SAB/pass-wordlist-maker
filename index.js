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

const listz = {
    cars: "./lists/cars.txt", 
    soccer: "./lists/soccer.txt", 
    football: "./lists/football.txt",
    ukslang: "./lists/ukslang.txt",
    rappers: "./lists/rappers.txt", 
    basketball: "./lists/basketball.txt",
    nerd: "./lists/anime.txt"
};

r.question(`${c.c}Target's name/username${c.r}: ${c.y}`, username => {
    console.log(c.c);
    var uText = c.y+username+c.c;
    r.question(`Any passwords ${uText} used or uses${c.r}: `, password => {
        console.log(c.c);
        r.question(`Any pets/animals ${uText} likes or owns${c.r}: `, pet => {
            console.log(c.c);
            r.question(`Owned and/or liked cars (brands) by ${uText+c.r}: `, vehicle => {
                console.log(c.c);
                r.question(`If ${uText} has any loved ones or crushes, name them${c.r}: `, lover => {
                    console.log(c.c);
                    r.question(`Is ${uText} a soccer fan ? (y/n)${c.r}: `, ball => {
                        console.log(c.c);
                        r.question(`Is ${uText} a american football fan ? (y/n)${c.r}: `, american => {
                            console.log(c.c);
                            r.question(`Is ${uText} from the UK ? (y/n)${c.r}: `, english => {
                                console.log(c.c);
                                r.question(`Is ${uText} a rap fan ? (y/n)${c.r}: `, rap => {
                                    console.log(c.c);
                                    r.question(`Is ${uText} a car lover ? (y/n)${c.r}: `, carz => {
                                        r.question(`Is ${uText} a basketball fan ? (y/n)${c.r}: `, basketbal => {
                                            console.log(c.c);
                                            r.question(`Is ${uText} a nerd/nolife or anime fan ? (y/n)${c.r}: `, anime => {
                                                console.log("");
                                                generate(username, password, pet, vehicle, lover, ball, american, english, rap, carz, basketbal, anime);
                                                r.close();
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

async function generate (username, password, pet, vehicle, lover, ball, carz, american, english, rap, basketbal, anime) {
    for (x of arguments) if(x != '') expand(x);

    if(carz === 'y') {
        fs.readFile(cars, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
    if(ball === 'y') {
        fs.readFile(soccer, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
    
    if(basketbal === 'y') {
        fs.readFile(basketball, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }

    if(american === 'y') {
        fs.readFile(football, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
    if(english === 'y') {
        fs.readFile(ukslang, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
    if(rap === 'y') {
        fs.readFile(rappers, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
    
    if(anime === 'y') {
        fs.readFile(listz.nerd, function (err, data) {
            if (err) throw err;
            data = data.toString().split("\r\n");
            expand(data);
        });
    }
};

function expand(words) {
    words = words.toString().split(",");
    var fullList = [];

    var numbers = ['1', '2', '3', '12', '123', '1234', '124', '125', '12345'];
    var replaces = {'e': '3', 'o': '0', 'i': ['l', '1'], 'l': ['i', '1'], 's': '5', 'a': '4'};

    if (!Array.isArray(words)) {
        words = words.replace(/ /g, '');
        fullList.push(words);
        fullList.push(words.toLowerCase());
        fullList.push(words.toUpperCase());
        fullList.push(words.toLowerCase().charAt(0).toUpperCase() + words.toLowerCase().slice(1));
    } else {
        for (word of words) {
            word = word.replace(/ /g, '');
            fullList.push(word);
            fullList.push(word.toLowerCase());
            fullList.push(word.toUpperCase());
            fullList.push(word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1));
            for (nr of numbers) {
                fullList.push(word + nr);
                fullList.push(nr + word);
                fullList.push(word.toLowerCase() + nr);
                fullList.push(nr + word.toLowerCase());
                fullList.push(word.toUpperCase() + nr);
                fullList.push(word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1) + nr);
                fullList.push(nr + word.toUpperCase());
                fullList.push(nr + word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1));
            }
            for (const [key, letter] of Object.entries(replaces)) {
                if (Array.isArray(letter)) {
                    for (l of letter) {
                        word = word.replace(key.toLowerCase(), l);
                        word = word.replace(key.toUpperCase(), l);

                        fullList.push(word);
                        fullList.push(word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1) + nr);
                        fullList.push(word.toLowerCase());
                        fullList.push(word.toUpperCase());
                        fullList.push(word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1) + word.slice(1));
                    }
                } else {
                    word = word.replace(key.toLowerCase(), letter);
                    word = word.replace(key.toUpperCase(), letter);

                    fullList.push(word);
                    fullList.push(word.toLowerCase());
                    fullList.push(word.toUpperCase());
                    fullList.push(word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1));
                }
            }      
        }
    }
    var fullList = fullList.filter(function(item , index, arr){ return arr.indexOf(item)=== index})
    for (item of fullList) {
        fs.appendFileSync('wordlist.txt', item+'\r\n');
    }
};
