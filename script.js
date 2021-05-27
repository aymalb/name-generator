/*Данная программа принимает список имен, разделяет каждое имя на буквосочетания,
считает, сколько раз то, или иное буквосочетание встречается в списке и генерирует
имя в соответствии с этими данными*/
let objLow = {};//В данном объекте хранятся буквосочетания с двумя буквами (напр. "Настя" => "на" "ас" "ст" "тя")
let objMedium = {};//В данном объекте хранятся буквосочетания с тремя буквами (напр. "Настя" => "нас" "аст" "стя")
let objHigh = {};//В данном объекте хранятся буквосочетания с четырьмя буквами (напр. "Настя" => "наст" "астя")

function getTextNew() {
    //Принимает список имен из текстовой области, проверяет количество
    //предоставленных имен и передает список функции генерации объектов
    let tex = document.getElementById("textareabox").value.toLowerCase().split(/[^а-яА-Яa-zA-Z]+/);
    if (tex.length < 2) {
        document.getElementById('status').innerHTML = "Not enough names! A minimum of 2 is required!"
        document.getElementById('status').style.color = "#ffa8a8";
        objLow = {};
        objMedium = {};
        objHigh = {};
        document.getElementById('textareabox').value = "";
        document.getElementById('print').style.display = "none";
        document.getElementById('results').style.display = "none";
        return;
    } else if (tex.length >= 2 & tex.length < 100) {
        document.getElementById('status').innerHTML = "Analysis complete! A greater number of names is recommended!"
        document.getElementById('status').style.color = "#ffc89c";
    } else {
        document.getElementById('status').innerHTML = "Analysis complete!"
        document.getElementById('status').style.color = "#a4ffa1";
    }
    document.getElementById('textareabox').value = "";
    document.getElementById('print').style.display = "block";
    document.getElementById('results').style.display = "block";
    objLow = createObject(tex.filter(item => item.length >= 2), 'low');
    objMedium = createObject(tex.filter(item => item.length >= 3), 'medium');
    objHigh = createObject(tex.filter(item => item.length >= 4), 'high');
    return;
}

function createObject(arr, prec) {
    //Создает объект, в котором храняться буквосочетания и их количество
    switch (prec) {
        case 'low': endInd = 1; break;
        case 'medium': endInd = 2; break;
        case 'high': endInd = 3; break;
        default: break;
    }
    return arr.reduce(function (obj, item) {
        for (let i = 0; i < item.length - endInd; i++) {
            let name = '';
            switch (prec) {
                case 'low': name = item[i] + item[i + 1]; break;
                case 'medium': name = item[i] + item[i + 1] + item[i + 2]; break;
                case 'high': name = item[i] + item[i + 1] + item[i + 2] + item[i + 3]; break;
                default: break;
            }
            if (obj.hasOwnProperty(name)) {
                obj[name] += 1;
            } else {
                obj[name] = 1;
            }
        }
        return obj;
    }, {});
}

function generateName(matrix, leng, prec) {
    //Создает имя в зависимости от выбранной длины и точности (один из трех объектов)
    //Низкая точность использует оббъект с двухбуквенными сочетаниями,
    //средняя - с трехбуквенными, высокая - с четырехбуквенными
    let z = 0;
    let name = '';
    let stInd = 0;
    const keys = Object.keys(matrix);
    switch (prec) {
        case 'low': stInd = 1; break;
        case 'medium': stInd = 2; break;
        case 'high': stInd = 3; break;
        default: break;
    }
    do {

        name = keys[Math.floor(Math.random() * keys.length)];
        for (let i = stInd; i < leng - 1; i++) {
            let arr = [];
            switch (prec) {
                case 'low':
                    arr = keys.filter(item => name[i] === item[0]);
                    break;
                case 'medium':
                    arr = keys.filter(item => name[i - 1] === item[0] & name[i] === item[1]);
                    break;
                case 'high':
                    arr = keys.filter(item => name[i - 2] === item[0] & name[i - 1] === item[1] & name[i] === item[2]);
                    break;
                default: break;
            }
            let arrNum = arr.map(function (item, index) {
                if (index === 0) {
                    return matrix[item];
                } else {
                    return matrix[item] + matrix[arr[index - 1]];
                }
            });
            let rand = Math.floor(Math.random() * arrNum[arrNum.length - 1]);
            arr.length > 0 ? name += arr[arrNum.findIndex(item => item > rand)][stInd] : name += '?';
        };
        z++;

    } while (name.indexOf('?') !== -1 & z < 20);
    return name.indexOf('?') === -1 ? name.slice(0, 1).toUpperCase() + name.slice(1) : "Try again!";
}

function printNameNew() {
    //Выводит сгенерированное имя в окно Results.
    let radArr = document.getElementsByName('precision');
    let rad = '';
    let nameLength = document.getElementById('nameLength').value;
    if (nameLength > 20 | nameLength < 4) {
        document.getElementById('results').innerHTML = "Invalid length!"; return;
    }
    for (let i = 0; i < radArr.length; i++) {
        if (radArr[i].checked) {
            rad = radArr[i].value;
        }
    }
    switch (rad) {
        case 'low': document.getElementById('results').innerHTML = generateName(objLow, nameLength, rad); break;
        case 'medium': document.getElementById('results').innerHTML = generateName(objMedium, nameLength, rad); break;
        case 'high': document.getElementById('results').innerHTML = generateName(objHigh, nameLength, rad); break;
        default: break;
    };
    return;
}
