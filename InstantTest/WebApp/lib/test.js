function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function CWeight(weight) {
    if (weight.slice(0, 1) == "-") {
        var wei = (weight.slice(1, weight.length - 1)) / 100;
    } else {
        var wei = (weight.slice(0, weight.length - 1)) / 100;
    };
    return wei;
}

var Test = function (data) {
    this.data = sample; //data;
    var muls = new Array();
    data = sample;
    var section = data.examination.sections.section.question;

    //Creates a random list of the questions
    shuffle(section);
    var properties = function (data) {
        this.duration = data.examination.ATTRduration;
        this.kind = data.examination.ATTRkind;
        this.draw = data.examination.ATTRdraw;
        this.instruction = data.examination.ATTRinstruction;
        this.subject = data.examination.ATTRsubject;
    }


    this.children = muls;
    this.section = section;
    this.properties = new properties(data);
    this.children = new Array();
    for (var i = 0; i < this.section.length; i++) {
        var mul = new Multiple(this.section[i], i + 1);
        this.children.push(mul);
    };
};


Test.prototype.choice = function (choice) {
    var arr = choice.split(":")
    //alert(String.fromCharCode(65 + new Number(arr[1])))
    this.children[arr[0] - 1].choice(arr[0], String.fromCharCode(65 + new Number(arr[1])));
    //alert(arr[0])
    //this.children[arr[0] - 1].mark();
    //console.log("Your choice for Question " + arr[0] + " is " + String.fromCharCode(65 + new Number(arr[1])));
};

Test.prototype.mark = function () {
    var mark = 0;
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].mark();
        mark += this.children[i].score;
}
    //alert(mark + "\n" + this.properties.draw)
//mark = this.children[0].score;
    mark = (mark / this.properties.draw) * 100
    return mark.toFixed(1);
};


var Multiple = function (data, pos) {
    var choices = new Array();
    var score = 0;
    var html = "";
    //stores the multiple choice question object
    var text = function (data) {
        this.type = data.ATTRtype;
        this.value = data.$;
    }

    //stores the multiple choice answer's explanation
    var reason = function (data) {
        try {
            this.type = data.ATTRtype;
        this.value = data.$;
        }
        catch(err) {
            
        }
    }

    //stores the multiple choice option
    var option = function (data) {
        this.type = data.ATTRtype;
        this.value = data.$;
        this.answer = data.ATTRanswer;
        this.weight = data.ATTRweight;
    }

    //function that creates the HTML for the multiple choice object
    //Takes in objects gained from the preceding functions
    this.data = data;
    this.num = pos;

    var ops = new Array();
    for (var i = 0; i < data.options.option.length; i++) {
        ops.push(new option(data.options.option[i]));
    };

    //this.options = shuffle(ops);
    this.options = ops;
    this.choices = choices;
    this.score = score;
    this.text = new text(data.text);
    this.reason = new reason(data.reason);
    this.html = html;//new draw(mode, pos, this.text, this.options, this.reason);
};

Multiple.prototype.choice = function (ques, choice) {
    if (this.choices.indexOf(choice) == -1) {
        this.choices.push(choice);
    } else {
        this.choices.splice(this.choices.indexOf(choice), 1);
    };
};

Multiple.prototype.mark = function () {
    //try {
        var score = 0;
        for (var i = 0; i < this.choices.length; i++) {
            var numChoice = this.choices[i].charCodeAt() - 65;
            var ans = this.options[numChoice].answer;
            if (ans == true || ans == "true") {
                score = score + CWeight(this.options[numChoice].weight);
            } else if (ans == false || ans == "false") {
                score = score - CWeight(this.options[numChoice].weight);
            };
        };
        this.score = score;
        
        /*}
    catch(err) {
        alert("An Error occurred");
    }*/
};
