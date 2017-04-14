$(document).ready(function(){
  $('#main').load('fretboard.svg')

  $("#chordname").change(function(){
  	var chord_name = $(this).val()
	var chord = teoria.chord(chord_name)

	//var notes = chord.notes()
	var notes = chord.simple()
	var voicing = chord.voicing()

	data = []
	for(note=0; notes[note]; note++)
	{
	        note_name = notes[note].replace('#','u')
		int_semitones = voicing[note].semitones()
	  	data.push([note_name, int_semitones])
	}	

	console.log(data)
	//remove ex classes
	//$()


	for(note=0; data[note]; note++)
	{
		cell_class = ".note-cell-name-" + data[note][0]
		circ_class = ".note-circ-name-" + data[note][0]
		text_class = ".note-text-name-" + data[note][0]
		$(cell_class).each(function(){$(this).addClass("cell-selected cell-int-" + data[note][1])})
		$(circ_class).each(function(){$(this).addClass("circ-selected circ-int-" + data[note][1])})
		$(text_class).each(function(){$(this).addClass("text-selected text-int-" + data[note][1])})
	}

	console.log(data);
  })
})
