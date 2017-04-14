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
		//console.yylog(notes[note].name());
	        note_name = notes[note]
		int_semitones = voicing[note]
	  	data.push([note_name, int_semitones])
	}	 
	console.log(data);
  })
})
