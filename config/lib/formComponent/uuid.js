export const uuid = function() {
    var hash = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 32; i++) {
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            hash += '-';
        } else {
            var randomNumber = Math.floor(Math.random() * charactersLength);
            hash += characters.substring(randomNumber, randomNumber + 1);
        }
    }

    return hash;
}