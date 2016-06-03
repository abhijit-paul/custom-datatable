var DataTableController = function ()	{
	var _toTitleCase = function(textString)	{
		return textString.replace(/(^\w|\s\w)/g, 
			function(character) {
				return character.toUpperCase();
				}
			);
	};
	
	this.parseColumnHeaders = function(data)	{
		var columnHeaders = [],
			firstData = data[0];
			
		for (let column in firstData)	{
			columnHeaders.push({
				key: column,
				keyTitle: _toTitleCase(column),
				dataType: typeof(firstData[column])
			})
		};
		
		return columnHeaders;
	};
	
	return this;
};