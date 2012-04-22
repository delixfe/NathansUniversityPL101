var endTime = function (time, expr) {
    if(expr.tag === 'note' || expr.tag === 'rest') {
        return time + expr.dur;
    } else if (expr.tag === 'par') {
        var l = endTime(time, expr.left);
        var r = endTime(time, expr.right);
        return l > r ? time + l : time + r;
    } else if (expr.tag === 'seq' ) { 
        return endTime(endTime(time, expr.left), expr.right);
    } else {
        throw new Error("unkown tag " + expr.tag + ".");
    }
};

var compileT = function(expr, time, notes) {
    if(expr.tag === 'note') {
        notes.push({ 
                tag: 'note', 
                pitch: expr.pitch, 
                start: time, 
                dur: expr.dur
              });
    } else if (expr.tag === 'seq') {
        compileT(expr.left, time, notes);
        compileT(expr.right, endTime(time, expr.left), notes);
    } else if (expr.tag === 'rest') {
         // noop      
    } else {
        compileT(expr.left, time, notes);
        compileT(expr.right, time, notes);
    }
};

var compile = function (expr) {
    var notes = [];
    compileT(expr, 0, notes);
    console.log(notes);
    return notes;
};

