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
			return (className.match (/(^|\s)circ-text-int-\S+/g) || []).join(' ');
		});
	})

	$('#info-table').remove();

  	var our_text = $(this).val()
	scaletest = our_text.split(' ')

	data = []

	if(scaletest.length > 1) {
		var scale = teoria.scale(scaletest[0], scaletest[1])
		
		notes = scale.notes()

		var int_names = scale.scale
		var note_names = scale.simple()

		semi_tones = []
		for(ihuu=0; notes[ihuu]; ihuu++) {
			semi_tones[ihuu] = teoria.interval(notes[0], notes[ihuu]).semitones()
		}
	}
	else {
		var chord = teoria.chord(scaletest[0]) //it makes an array anyway...

		var notes = chord.simple().toString()
		var voicing = chord.voicing().toString()
		
		int_names = voicing.split(',')
		note_names = notes.split(',')
		semi_tones = []

		cd_vc = chord.voicing()

		for(lol=0;cd_vc[lol];lol++) { semi_tones.push(cd_vc[lol].semitones())  }
		
	}
	data.push(int_names, note_names, semi_tones)
	window.data = data
	console.log(data)

	for(item=0; data[0][item]; item++)
	{
		cell_class = ".note-cell-name-" + data[1][item].replace('#', 'u')
		circ_class = ".note-circ-name-" + data[1][item].replace('#', 'u')
		text_class = ".note-text-name-" + data[1][item].replace('#', 'u')
		$(cell_class).each(function(){$(this).addClass("cell-selected cell-int-" + data[2][item])})
		$(circ_class).each(function(){$(this).addClass("circ-selected circ-int-" + data[2][item])})
		$(text_class).each(function(){$(this).addClass("text-selected circ-text-int-" + data[2][item])})
	}


	var table = d3.select('#info').append('table').attr('id','info-table')

	var tr = table.selectAll('tr').data(data).enter().append('tr')

	for(yep=0; data[0][yep]; yep++) { // 0 here is a faux index only to count elements
		tr.append('td').html(function(d){ return d[yep] });
	}

	heads = $('table > tr:first-of-type td')
	for(xx=0;heads[xx];xx++)
	  {
		$(heads[xx]).addClass('thead-int-'+data[2][xx]+" thead-all")
	  }
	
  }) // on input change
})
