describe("compiler.js", function () {
	
	describe("parallel tag", function () {
		it("should pass nathans test", function () {
			var melody_mus = { 
					tag: 'seq',
			      	left: { 
				      	tag: 'par',
			         	left: { tag: 'note', pitch: 'c3', dur: 250 },
			         	right: { tag: 'note', pitch: 'g4', dur: 500 } },
			      	right: { 
				      	tag: 'par',
			         	left: { tag: 'note', pitch: 'd3', dur: 500 },
			         	right: { tag: 'note', pitch: 'f4', dur: 250 } } 
			         };
			var melody_note = [
			    { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
			    { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
			    { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
			    { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];
			
			var compiled = compile(melody_mus);
			expect(compiled).toEqual(melody_note);
		})
	});

});