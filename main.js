const satuan = ["se", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"]
const postfix = ["belas", "puluh", "ratus", "ribu", "juta", "miliar", "triliun"]

daftarAudio = {}

function init_audio() {
    satuan.forEach(function(index) {
        daftarAudio[index] = new Audio("audio/" + index + ".mp3")
    });

    postfix.forEach(function(index) {
        daftarAudio[index] = new Audio("audio/" + index + ".mp3")
    });
}

function terbilang_satu_digit(angka) {
    return [satuan[angka]]
}

function terbilang_dua_digit(angka) {
    terbilang = []

    for (let i = 0; i < angka.length; i++) {
        if (angka[i] === "0") continue;

        if (i === 0) {
            if (angka[0] === angka[1] === "1") {
                terbilang.push(satuan[angka[0]], postfix[0])
                break
            }
            else if (angka[0] === "1") {
                terbilang.push(satuan[angka[1]], postfix[0])
                break
            }
            terbilang.push(satuan[angka[i]], postfix[1])
        }
        else {
            terbilang.push(satuan[angka[i]])
        }
    }

    return terbilang
}

function terbilang_tiga_digit(angka) {
    terbilang = []

    if (angka[0] != "0") {
        if (angka[0] === "1") {
            terbilang.push(satuan[0])
        }
        else {
            terbilang.push(satuan[angka[0]])
        }
        terbilang.push(postfix[2])
    }

    terbilang = [...terbilang, ...terbilang_dua_digit(angka.substring(1, 3))]

    return terbilang
}

function split_string(str, n) {
    splitted = []
    for (let i = str.length - 1; i >= 0; i -= n) {
        splitted.unshift(str.substring(i - n + 1, i + 1))
    }

    return splitted
}

function konversiAngkaTerbilang(angka) {
    outputSound = []

    try {
        tes = parseInt(angka)
    }
    catch (error) {
        console.log(error)
        return
    }

    splitted = split_string(angka, 3)

    for (let i = 0; i < splitted.length; i++) {
        ind = splitted[i]
        ln = ind.length

        hasil = []

        if (ln === 1) hasil = terbilang_satu_digit(ind)
        else if (ln === 2) hasil = terbilang_dua_digit(ind)
        else hasil = terbilang_tiga_digit(ind)

        if (i != splitted.length - 1 && hasil.length > 0) {
            index = splitted.length + 1 - i
            hasil.push(postfix[index])
        }

        outputSound = [...outputSound, ...hasil]
    }
    
    // flatten array
    outputSound = [].concat(...outputSound)

    return outputSound
}

function putarSuaraTerbilang(arrHasil) {
    arrHasil.forEach(function(text, index) {
        setTimeout(function() {
            daftarAudio[text].play()
        }, 550 * index); 
    });
}

function konversi() {
    angka = document.getElementById("angkaId").value
    hasil = konversiAngkaTerbilang(angka)

    document.getElementById("hasilId").value = hasil
    putarSuaraTerbilang(hasil)
}

window.onload = function () {
    init_audio()
}