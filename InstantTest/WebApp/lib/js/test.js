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


function CWeight (weight) {
	if (weight.slice(0, 1) == "-") {
		var wei = (weight.slice(1, weight.length - 1))/100
	} else{
		var wei = (weight.slice(0, weight.length - 1))/100
	};
	return wei;
}
var Test = function (data) {
	this.data = data;
	var muls = new Array();
	var section = data.examination.sections.section.question;

	//Creates a random list of the questions
	shuffle(section);
	var properties = function (data){
	 	this.duration = data.examination.ATTRduration;
	 	this.kind = data.examination.ATTRkind;
	 	this.draw = data.examination.ATTRdraw;
	 	this.instruction = data.examination.ATTRinstruction;
	 	this.subject = data.examination.ATTRsubject;
 	}

	 this.children = muls;
	 this.section = section;
	 this.properties = new properties(data);
};

Test.prototype.draw = function (mode) {
	 $("#test").html('<div id="test" class="col-lg-8"></div>');
	 var html = 'Hello guys';
	 //this.children = new Array();
		/*for (var i = 0; i < this.section.length; i++) {
			var mul = new Multiple(this.section[i], i + 1, mode);
			this.children.push(mul);
			html = html + mul.draw("init");
		};*/
		//console.log(this.children);
	 $('#test').append(html);
};

Test.prototype.choice = function (choice) {
	var arr = choice.split(":")
	this.children[arr[0] - 1].choice(arr[1]);
	//this.children[arr[0] - 1].mark();
	//console.log("Your choice for Question " + arr[0] + " is " + String.fromCharCode(65 + new Number(arr[1])));
};

Test.prototype.mark = function() {
	var mark = 0;
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].mark()
		mark = mark + this.children[i].score
	};
	mark = (mark/this.children.length) * 100
	

	$("#test").html('<div id="test" class="col-lg-8"></div>');
	 var html = '';
		for (var i = 0; i < this.children.length; i++) {
			html = html + this.children[i].draw("mark");
		};
	$('#test').append(html);

	return mark.toFixed(1);
};

	
var Multiple = function (data, pos, mode) {
	var choices = new Array();
	var score = 0;
	var html = "";
	 //stores the multiple choice question object
	var text = function (data){
	 	this.type = data.ATTRtype;
	 	this.value = data.$;
	}

	 //stores the multiple choice answer's explanation
	var reason = function (data){
	 	this.type = data.ATTRtype;
	 	this.value = data.$;
	}

	 //stores the multiple choice option
 	var option = function (data){
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


Multiple.prototype.draw = function (mode){
	var opts = '<a class="CLASS" role="button" id="ID"><strong><em>LETTER. </em></strong>TEXT</a>'
	var que = '<div id="ID" class="panel panel-MODE"><div class="panel-heading"><h2 class="panel-title"></h2><h4><em>NUM. </em>TEXT</h4></div><div class="panel-body"><div class="list-group">OPTS</div></div></div>'
	var mtext = "";
 	var result	="";
	
	if (mode == "init") {
		for (var i = 0; i < this.options.length; i++) {
			var opt = opts;
			opt = opt.replace("CLASS", "list-group-item");
			opt = opt.replace("ID", this.num + ':' + i);
			opt = opt.replace("LETTER", String.fromCharCode(65 + i));
			opt = opt.replace("TEXT", this.options[i].value);
			mtext = mtext + opt;
		};
		que = que.replace("ID", "mul"  + this.num);
		que = que.replace("MODE", "info");
		que = que.replace("NUM", this.num);
		que = que.replace("TEXT", this.text.value);
		que = que.replace("OPTS", mtext);
		this.html = que;
		result = que;
	}; 	 


	if (mode == "mark") {
		for (var i = 0; i < this.options.length; i++) {
			var opt = opts;
			opt = opt.replace("ID", this.num + ':' + i);
			opt = opt.replace("LETTER", String.fromCharCode(65 + i));
			
			
			if (this.choices.indexOf(i.toString()) == -1) {
				opt = opt.replace("CLASS", "list-group-item");
			} else{
				opt = opt.replace("CLASS", "list-group-item active");
			};

			
			if (this.options[i].answer == "true") {
 	 			opt = opt.replace("TEXT", this.options[i].value + '<span class="glyphicon glyphicon-ok"></span>');	
 	 		}
			if (this.options[i].answer == "false") {
				opt = opt.replace("TEXT", this.options[i].value + '<span class="glyphicon glyphicon-remove"></span>');
			}
			mtext = mtext + opt;
		};

		que = que.replace("ID", "mul"  + this.num);
		
		if (this.score > 0.0) {
		 	 que = que.replace("MODE", "success");
		} else if (this.score < 0.0) {
			que = que.replace("MODE", "danger");
		} else {
			que = que.replace("MODE", "default");
		};
		
		
		que = que.replace("NUM", this.num);
		que = que.replace("TEXT", this.text.value);
		que = que.replace("OPTS", mtext);
		this.html = que;
		result = que;
	}; 	 	
 	 	return result;
};


Multiple.prototype.choice = function (choice) {
	if (this.choices.indexOf(choice) == -1) {
		this.choices.push(choice);
	} else{
		this.choices.splice(this.choices.indexOf(choice), 1);
	};
	//console.log(this);
};

Multiple.prototype.mark = function () {
	var score = 0;
	for (var i = 0; i < this.choices.length; i++) {
		if (this.options[this.choices[i]].answer == "true") {
			score = score + CWeight(this.options[this.choices[i]].weight);
		} else if (this.options[this.choices[i]].answer == "false"){
			score = score - CWeight(this.options[this.choices[i]].weight);
		};
	};
	this.score = score;
};