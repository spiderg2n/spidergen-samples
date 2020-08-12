
/**
Constructor
Do not call Function in Constructor.
*/
class TestView()
{
	super();

	//TODO:edit here

}
extends AView;


function TestView:onInitDone()
{

	//TODO:edit here

	//this.dataGrid1.enableScrlManager();
	
	
	
	
	var data = 
	[
	
	];
	
	for(var i=0; i<100; i++)
	{
		//data.push([ {type:'checkbox'}, {text:"check test " + i}, {text:100-i}, {text:i+1}, {text:i+2}, {text:i+3}, {text:i+4}, {text:i+5}, {text:i+6} ]);
		
		if(i%2==0)
		{
			data.push([ {text:i}, {text:"chk" + i}, {type:'button', text:'button'+i},

			{text:i+1, color:'rgb(255,0,0)', fontWeight:'bold'}, {text:i+2, color:'blue'}, {text:i+3}, {text:i+4}, {text:i+5}, {text:i+6},
			{text:i+7}, {text:i+8}, {text:i+9}, {text:i+10}, {text:i+11}, {text:i+12},
			{text:i+13}, {text:i+14}, {text:i+15}, {text:i+16}, {text:i+17}, {text:i+18},
			{text:i+19}, {text:i+20}, {text:i+21}, {text:i+22}, {text:i+23}, {text:i+24}

			]);
		}
		else
		{
			data.push([ {text:i}, {text:"chk" + i}, {type:'button', text:'button'+i},

			{text:i+1}, {text:i+2}, {text:i+3}, {text:i+4}, {text:i+5}, {text:i+6},
			{text:i+7}, {text:i+8}, {text:i+9}, {text:i+10}, {text:i+11}, {text:i+12},
			{text:i+13}, {text:i+14}, {text:i+15}, {text:i+16}, {text:i+17}, {text:i+18},
			{text:i+19}, {text:i+20}, {text:i+21}, {text:i+22}, {text:i+23}, {text:i+24}

			]);
		
		}
		//data.push([{text:i}, {text:"check test"}, {text:100-i}, {text:i+2}, {text:i+3}, {text:i+4}]);
	}
	
	this.dataGrid1.setGridData(data);

};

