$(document).ready(function(){
  $('#main').load('fretboard.svg')

  $("#chordname").change(function(){

	$("rect").each(function(){
		$(this).removeClass('cell-selected')
		$(this).removeClass (function (index, className) {
			return (className.match (/(^|\s)cell-int-\S+/g) || []).join(' ');
		});
	})
	$("circle").each(function(){
		$(this).removeClass('circ-selected')
		$(this).removeClass (function (index, className) {
			return (className.match (/(^|\s)circ-int-\S+/g) || []).join(' ');
		});
	})

	$("text").each(function(){
		$(this).removeClass('text-selected')
		$(this).removeClass (function (index, className) {
			return (className.match (/(^|\s)text-int-\S+/g) || []).join(' ');
		});
	})

  	var chord_name = $(this).val()
	var chord = teoria.chord(chord_name)

	//var notes = chord.notes()
	var notes = chord.simple()
	var voicing = chord.voicing()

	data = []
	for(note=0; notes[note]; note++)
	{
		int_name = voicing[note].simple().toString()
	        note_name = notes[note].replace('#','u')
		int_semitones = voicing[note].semitones()
	  	data.push([int_name,note_name, int_semitones])
	}	

	console.log(data)
	//remove ex classes
	//$()


	for(note=0; data[note]; note++)
	{
		cell_class = ".note-cell-name-" + data[note][1]
		circ_class = ".note-circ-name-" + data[note][1]
		text_class = ".note-text-name-" + data[note][1]
		$(cell_class).each(function(){$(this).addClass("cell-selected cell-int-" + data[note][2])})
		$(circ_class).each(function(){$(this).addClass("circ-selected circ-int-" + data[note][2])})
		$(text_class).each(function(){$(this).addClass("text-selected text-int-" + data[note][2])})
	}

	console.log(data);

	var table = d3.select('#info').append('table')

	var tr = table.selectAll('tr').data(data).enter().append('tr').enter()

	tr.append('td').html(function(d){ return d[0] });
	tr.append('td').html(function(d){ return d[1] });
	tr.append('td').html(function(d){ return d[2] });
	//tr.append('td').html(function(d){ return d[0] }).append('td').html(function(d){ return d[1] }).append('td').html(function(d){ return d[2] });
  }) // on input change
})
