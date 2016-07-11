var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

var hiddenClasses = ['a', 'b', 'c'],
    visibleClasses = ['d', 'e', 'f'],
    numbers = Array.from('0123456789-+ '),
    characters = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_.')
        .concat(numbers);

function getHiddenClass() {
    return hiddenClasses[Math.floor(
        Math.random() * hiddenClasses.length)];
}

function getVisibleClass() {
    return visibleClasses[Math.floor(
        Math.random() * visibleClasses.length)];
}

rl.question('Enter Text: \n', (inp) => {
    inp = inp+'';
    if (inp.match(/[^0-9a-z\-_+@.\s]/gi)) {
        console.log('Allowed characters: 0-9 a-z A-Z -_+@.');
        return rl.close();
    }

    var output = '';

    if (inp.match(/^[0-9\-+\s]+$/)) {
        for (var i = 0; i < inp.length; i++) {
            for (var j = 0; j < numbers.length; j++) {
                if (numbers[j] === inp[i]) {
                    output += '<span class="' + 
                        getVisibleClass() + '">' + 
                        (inp[i] === ' '? '&nbsp;' : inp[i]) + '</span>';

                } else {
                    output += '<span class="' + 
                        getHiddenClass() + '">' + 
                        (numbers[j] === ' '? '&nbsp;' : 
                            numbers[j]) + '</span>';
                }
            }
        }
    } else {
        for (var i = 0; i < inp.length; i++) {
            for (var j = 0; j < characters.length; j++) {
                if (characters[j] === inp[i]) {
                    output += '<span class="' + 
                        getVisibleClass() + '">' + 
                        (inp[i] === ' '? '&nbsp;' : inp[i]) + '</span>';

                } else {
                    output += '<span class="' + 
                        getHiddenClass() + '">' + 
                        (characters[j] === ' '? '&nbsp;' : 
                            characters[j]) + '</span>';
                }
            }
        }
    }

    console.log('\n\n\n' + output + '\n\n\n');
    rl.close();
});