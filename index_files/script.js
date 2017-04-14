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

	$('#info-table').remove();

  	var chord_name = $(this).val()
	var chord = teoria.chord(chord_name)

	//var notes = chord.notes()
	//var notes = chord.simple()
	var notes = chord.notes().toString().replace('#', 'u')
	var voicing = chord.voicing().toString()

	data = []
	
	int_names = voicing.split(',')
	note_names = notes.split(',')
	semi_tones = []

	cd_vc = chord.voicing()

	for(lol=0;cd_vc[lol];lol++) { semi_tones.push(cd_vc[lol].semitones())  }
	
	data.push(int_names, note_names, semi_tones)

	window.data = data
	console.log(data)
	//remove ex classes
	//$()


	for(item=0; data[item]; item++)
	{
		cell_class = ".note-cell-name-" + data[item][1]
		circ_class = ".note-circ-name-" + data[item][1]
		text_class = ".note-text-name-" + data[item][1]
		$(cell_class).each(function(){$(this).addClass("cell-selected cell-int-" + data[item][2])})
		$(circ_class).each(function(){$(this).addClass("circ-selected circ-int-" + data[item][2])})
		$(text_class).each(function(){$(this).addClass("text-selected text-int-" + data[item][2])})
	}

	  /*
	rdata = Array()
	for(item=0; data[item]; item++) {
		rdata[item] = []

		for(aloop=0;aloop<=data.length-1;aloop++) {
			//rdata[item].push(data[aloop][item])
			rdata[item][aloop] = data[aloop][item]
		}
	}

	console.log(rdata);
	*/

	var table = d3.select('#info').append('table').attr('id','info-table')

	var tr = table.selectAll('tr').data(data).enter().append('tr')

	for(yep=0; data[yep]; yep++) {
		tr.append('td').html(function(d){ return d[yep] });
	}

  }) // on input change
})
