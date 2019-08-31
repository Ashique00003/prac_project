function DDSNetwork() {
	var _this = this;

	this.w = $(window).width();
	this.h = $(window).height();

	this.color    = ['#1e90ff', '#f08080', '#00ff7f'];

	this.render_network = function(nodes, links) {
		var size = {"width": 574, "height": 400};

		var force = d3.layout.force()
		.charge(-180)
		.linkDistance(200)
		.nodes(nodes)
		.links(links)
		.size([size['width'],size['height']])
		.start();

		var svg = d3.select('#wordNetwork').append("svg")
		.attr("width", size['width'])
		.attr("height", size['height']);

		var link = svg.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link")
		.style("stroke-width", function(d) {
			if(Math.sqrt(d.weight) < 8) {
				return Math.sqrt(d.weight);
			} else {
				return 8;
			}
		})
		.style("stroke","#696969")
		.style("stroke-opacity",.2);

		var node = svg.selectAll(".node")
		.data(nodes)
		.enter().append("circle")
		.attr("class","node")
		.attr("r", function(d) {
			return 5 + parseFloat(d.value);
		})
		.style("fill", function(d) { return _this.color[d.group - 1]; })
		.style("stroke","#fff")
		.style("stroke-width",1.5)
		.on("mouseover", function(d) {
			link.style("stroke-opacity", function(o) {
				return o.source === d || o.target === d ? 1 : .2;
			});
		})
		.call(force.drag);

		var txt = svg.selectAll(".txt")
		.data(nodes)
		.enter().append("text")
		.attr("class","txt")
		.attr("text-anchor","middle")
		.style("font-size","11pt")
		.text(function(d){ return d.name; })
		.call(force.drag);

		force.on('tick',function(){
			link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

			node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
			txt.attr("x", function(d){ return d.x; })
			.attr("y", function(d){ return d.y; });
		});
	}

}



$(function(){
	var dds_network = new DDSNetwork();


	jQuery.ajax({
        type: "GET",
        url: 'files/dds_network/data.php',
        dataType: "json",
        error: function(jqXHR, textStatus, errorThrown) {
            
        },
        success: function(data)
        {
        	console.log(data);
        	data = JSON.parse(data);
        	alert(data);
      //   	dds_network.render_network(
      //   		data.group,
      //   		data.source
    		// )
        }
    });



	

	// dds_network.render_network(
	// 	[
	// 	   {
	// 	      "name":"メロス",
	// 	      "group":1,
	// 	      "value":20.0,
	// 	      "size":70.0
	// 	   },
	// 	   {
	// 	      "name":"セリヌンティウス",
	// 	      "group":1,
	// 	      "value":"3.9473684210526314",
	// 	      "size":"13.815789473684212"
	// 	   },
	// 	   {
	// 	      "name":"おまえ",
	// 	      "group":1,
	// 	      "value":"3.6842105263157894",
	// 	      "size":"13.575681997798533"
	// 	   },
	// 	   {
	// 	      "name":"それから",
	// 	      "group":1,
	// 	      "value":"2.6315789473684212",
	// 	      "size":"10.830555762051588"
	// 	   },
	// 	   {
	// 	      "name":"わし",
	// 	      "group":1,
	// 	      "value":"2.1052631578947367",
	// 	      "size":"2.972628744218157"
	// 	   },
	// 	   {
	// 	      "name":"群衆",
	// 	      "group":1,
	// 	      "value":"1.8421052631578947",
	// 	      "size":"6.447368421052631"
	// 	   },
	// 	   {
	// 	      "name":"さま",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"0.7949526285747869"
	// 	   },
	// 	   {
	// 	      "name":"結婚式",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"1.7116688611038027"
	// 	   },
	// 	   {
	// 	      "name":"約束",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"2.141858066979429"
	// 	   },
	// 	   {
	// 	      "name":"濁流",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"5.526315789473683"
	// 	   },
	// 	   {
	// 	      "name":"暴君",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"15.789473684210527"
	// 	   },
	// 	   {
	// 	      "name":"身代り",
	// 	      "group":1,
	// 	      "value":"1.5789473684210527",
	// 	      "size":"5.526315789473683"
	// 	   },
	// 	   {
	// 	      "name":"信実",
	// 	      "group":1,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"4.605263157894737"
	// 	   },
	// 	   {
	// 	      "name":"疲労",
	// 	      "group":1,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"2.447163009124723"
	// 	   },
	// 	   {
	// 	      "name":"つもり",
	// 	      "group":1,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"0.6548399575718051"
	// 	   },
	// 	   {
	// 	      "name":"出発",
	// 	      "group":1,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"1.5594684032950619"
	// 	   },
	// 	   {
	// 	      "name":"王城",
	// 	      "group":1,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"4.605263157894737"
	// 	   },
	// 	   {
	// 	      "name":"老爺",
	// 	      "group":1,
	// 	      "value":"1.0526315789473684",
	// 	      "size":3.68421052631579
	// 	   },
	// 	   {
	// 	      "name":"刑場",
	// 	      "group":1,
	// 	      "value":"1.0526315789473684",
	// 	      "size":3.68421052631579
	// 	   },
	// 	   {
	// 	      "name":"来る",
	// 	      "group":2,
	// 	      "value":"9.539473684210526",
	// 	      "size":"5.276727065533311"
	// 	   },
	// 	   {
	// 	      "name":"走る",
	// 	      "group":2,
	// 	      "value":"7.894736842105263",
	// 	      "size":"25.272894964758066"
	// 	   },
	// 	   {
	// 	      "name":"くれる",
	// 	      "group":2,
	// 	      "value":"6.578947368421052",
	// 	      "size":"1.8527062053827574"
	// 	   },
	// 	   {
	// 	      "name":"殺す",
	// 	      "group":2,
	// 	      "value":"5.592105263157895",
	// 	      "size":"14.085079561015421"
	// 	   },
	// 	   {
	// 	      "name":"言う",
	// 	      "group":2,
	// 	      "value":"4.276315789473684",
	// 	      "size":"0.4226895208813431"
	// 	   },
	// 	   {
	// 	      "name":"行く",
	// 	      "group":2,
	// 	      "value":"4.276315789473684",
	// 	      "size":"0.5923133255940619"
	// 	   },
	// 	   {
	// 	      "name":"出来る",
	// 	      "group":2,
	// 	      "value":"3.9473684210526314",
	// 	      "size":"1.513649310271869"
	// 	   },
	// 	   {
	// 	      "name":"信じる",
	// 	      "group":2,
	// 	      "value":"3.6184210526315788",
	// 	      "size":"4.810395855787783"
	// 	   },
	// 	   {
	// 	      "name":"死ぬ",
	// 	      "group":2,
	// 	      "value":"3.289473684210526",
	// 	      "size":"1.3593858381736248"
	// 	   },
	// 	   {
	// 	      "name":"待つ",
	// 	      "group":2,
	// 	      "value":"2.960526315789474",
	// 	      "size":"1.740053192718147"
	// 	   },
	// 	   {
	// 	      "name":"帰る",
	// 	      "group":2,
	// 	      "value":"2.960526315789474",
	// 	      "size":"0.9666254502666853"
	// 	   },
	// 	   {
	// 	      "name":"笑う",
	// 	      "group":2,
	// 	      "value":"2.6315789473684212",
	// 	      "size":"1.8368594511810017"
	// 	   },
	// 	   {
	// 	      "name":"下さる",
	// 	      "group":2,
	// 	      "value":"2.6315789473684212",
	// 	      "size":"0.9087101668273014"
	// 	   },
	// 	   {
	// 	      "name":"沈む",
	// 	      "group":2,
	// 	      "value":"2.6315789473684212",
	// 	      "size":"12.482330805378758"
	// 	   },
	// 	   {
	// 	      "name":"無い",
	// 	      "group":3,
	// 	      "value":"7.894736842105263",
	// 	      "size":"8.333595622435455"
	// 	   },
	// 	   {
	// 	      "name":"いい",
	// 	      "group":3,
	// 	      "value":"2.960526315789474",
	// 	      "size":"0.19599263937346295"
	// 	   },
	// 	   {
	// 	      "name":"よい",
	// 	      "group":3,
	// 	      "value":"2.3026315789473686",
	// 	      "size":"0.49079097651749215"
	// 	   },
	// 	   {
	// 	      "name":"佳い",
	// 	      "group":3,
	// 	      "value":"1.9736842105263157",
	// 	      "size":"15.789473684210526"
	// 	   },
	// 	   {
	// 	      "name":"大きい",
	// 	      "group":3,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"0.5291643377789502"
	// 	   },
	// 	   {
	// 	      "name":"若い",
	// 	      "group":3,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"0.904075074249187"
	// 	   },
	// 	   {
	// 	      "name":"早い",
	// 	      "group":3,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"0.20370724568342746"
	// 	   },
	// 	   {
	// 	      "name":"高い",
	// 	      "group":3,
	// 	      "value":"1.3157894736842106",
	// 	      "size":"0.25598718559870604"
	// 	   },
	// 	   {
	// 	      "name":"深い",
	// 	      "group":3,
	// 	      "value":"0.9868421052631579",
	// 	      "size":"0.5165829655615573"
	// 	   },
	// 	   {
	// 	      "name":"悪い",
	// 	      "group":3,
	// 	      "value":"0.9868421052631579",
	// 	      "size":"0.11920197417504441"
	// 	   },
	// 	   {
	// 	      "name":"たまらない",
	// 	      "group":3,
	// 	      "value":"0.6578947368421053",
	// 	      "size":"0.7483885229392059"
	// 	   },
	// 	   {
	// 	      "name":"ありがたい",
	// 	      "group":3,
	// 	      "value":"0.6578947368421053",
	// 	      "size":"0.442809692132095"
	// 	   },
	// 	   {
	// 	      "name":"小さい",
	// 	      "group":3,
	// 	      "value":"0.6578947368421053",
	// 	      "size":"0.23841247915291774"
	// 	   },
	// 	   {
	// 	      "name":"口惜しい",
	// 	      "group":3,
	// 	      "value":"0.6578947368421053",
	// 	      "size":"5.2631578947368425"
	// 	   }
	// 	], 
	// 	[
	// 	   {
	// 	      "source":0,
	// 	      "target":1,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":2,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":3,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":5,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":8,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":9,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":13,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":14,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":15,
	// 	      "weight":4
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":17,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":18,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":19,
	// 	      "weight":7
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":20,
	// 	      "weight":4
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":21,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":23,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":24,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":25,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":27,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":28,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":29,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":30,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":33,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":37,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":38,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":40,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":41,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":43,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":0,
	// 	      "target":46,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":16,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":18,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":20,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":21,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":27,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":1,
	// 	      "target":40,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":3,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":4,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":7,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":21,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":22,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":2,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":3,
	// 	      "target":6,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":3,
	// 	      "target":15,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":3,
	// 	      "target":23,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":4,
	// 	      "target":11,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":4,
	// 	      "target":21,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":4,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":5,
	// 	      "target":9,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":5,
	// 	      "target":10,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":5,
	// 	      "target":14,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":5,
	// 	      "target":18,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":5,
	// 	      "target":23,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":6,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":7,
	// 	      "target":19,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":7,
	// 	      "target":21,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":7,
	// 	      "target":29,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":11,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":15,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":19,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":21,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":22,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":29,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":8,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":9,
	// 	      "target":19,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":10,
	// 	      "target":23,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":10,
	// 	      "target":30,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":10,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":20,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":21,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":22,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":34,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":11,
	// 	      "target":35,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":13,
	// 	      "target":19,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":14,
	// 	      "target":18,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":14,
	// 	      "target":23,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":14,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":14,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":24,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":25,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":27,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":32,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":35,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":16,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":18,
	// 	      "target":40,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":20,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":24,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":29,
	// 	      "weight":8
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":34,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":37,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":19,
	// 	      "target":40,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":22,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":24,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":31,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":32,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":34,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":37,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":38,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":20,
	// 	      "target":39,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":22,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":25,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":26,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":27,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":28,
	// 	      "weight":3
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":30,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":21,
	// 	      "target":38,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":22,
	// 	      "target":26,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":22,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":22,
	// 	      "target":34,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":23,
	// 	      "target":27,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":23,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":23,
	// 	      "target":34,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":24,
	// 	      "target":32,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":24,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":24,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":25,
	// 	      "target":27,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":25,
	// 	      "target":28,
	// 	      "weight":2
	// 	   },
	// 	   {
	// 	      "source":25,
	// 	      "target":32,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":25,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":30,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":32,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":34,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":27,
	// 	      "target":41,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":29,
	// 	      "target":31,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":29,
	// 	      "target":41,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":30,
	// 	      "target":33,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":30,
	// 	      "target":41,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":32,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":32,
	// 	      "target":39,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":33,
	// 	      "target":36,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":33,
	// 	      "target":38,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":34,
	// 	      "target":39,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":35,
	// 	      "target":39,
	// 	      "weight":1
	// 	   },
	// 	   {
	// 	      "source":43,
	// 	      "target":46,
	// 	      "weight":1
	// 	   }
	// 	]
	// );




});

