var endTime = function (time, expr) {
    if(expr.tag === 'note') {
        return time + expr.dur;
    } else if (expr.tag === 'par') {
        var l = endTime(time, expr.left);
        var r = endTime(time, expr.right);
        return l > r ? time + l : time + r;
    } else {
        var t = endTime(time, expr.left);
        return endTime(t, expr.right);
    }
};


var compileT = function(expr, time, notes) {
    if(expr.tag === 'note') {
        notes.push({ 
                tag: 'note', 
                pitch: expr.pitch, 
                start: time, 
                dur: expr.dur});
    } else if (expr.tag === 'seq') {
        compileT(expr.left, time, notes);
        compileT(expr.right, endTime(time, expr.right), notes);
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