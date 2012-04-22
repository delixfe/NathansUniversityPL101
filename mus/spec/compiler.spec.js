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

	describe("sequential tag tests", function () {
		describe("should pass nathans tests", function () {
			
			it("one note test", function () {
				var melody1_mus = { tag: 'note', pitch: 'a4', dur: 125 };
				var melody1_note = [ { tag: 'note', pitch: 'a4', start: 0, dur: 125 } ];

				expect(compile(melody1_mus)).toEqual(melody1_note);
			});

			it("four note test", function () {
				var melody2_mus = { 
					tag: 'seq',
				    left: { 
					    tag: 'seq',
				        left: { tag: 'note', pitch: 'a4', dur: 250 },
				        right: { tag: 'note', pitch: 'b4', dur: 250 } 
				    },
				    right: { 
					    tag: 'seq',
					    left: { tag: 'note', pitch: 'c4', dur: 500 },
				        right: { tag: 'note', pitch: 'd4', dur: 500 } } 
				    };
				var melody2_note = [
					    { tag: 'note', pitch: 'a4', start: 0, dur: 250 },
					    { tag: 'note', pitch: 'b4', start: 250, dur: 250 },
					    { tag: 'note', pitch: 'c4', start: 500, dur: 500 },
					    { tag: 'note', pitch: 'd4', start: 1000, dur: 500 } 
				    ];

				expect(compile(melody2_mus)).toEqual(melody2_note);

			});
		})
	});

});