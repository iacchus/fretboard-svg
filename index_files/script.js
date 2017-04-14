$(document).ready(function(){
  $('#main').load('fretboard.svg')

  $("#chordname").change(function(){
  	var chord_name = this.value()
	var chord = teoria.chord(chord_name)

	var notes = chord.notes()

	for(note=0; notes[note]; note++)
		console.log(notes[note]);
  })
})
