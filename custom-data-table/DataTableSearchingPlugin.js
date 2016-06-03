var DataTableSearchingPlugin = function(customDataTable)	{
	
	var thisPluginInstance = this;
	this.customDataTable = customDataTable;
	
	this.initiateSearchability = function (tableDom)	{
		var searchTextBox = document.createElement("input");
		searchTextBox.classList.add("table-search-box");
		searchTextBox.placeholder="Search...";
		searchTextBox.type="text";
		
		if(thisPluginInstance.customDataTable.allTableData 
					=== undefined)	{
				thisPluginInstance.customDataTable.allTableData = 
					thisPluginInstance.customDataTable.tableData;
			}
		
		searchTextBox.onkeyup = function (event) {
			var searchText = this.value;
				tableData = thisPluginInstance.customDataTable.allTableData,
				displayableTableData = [],
				rowMatched=false;
			
			if(searchText === "")	{
				displayableTableData=tableData.slice();
			}
			else	{
				for(let i=0; i<tableData.length; i++)	{
					rowMatched = false;
					for(let j in tableData[i])	{
						if(tableData[i][j]
								.toString().toLowerCase()
								.indexOf(searchText.toLowerCase())>=0)	{
							rowMatched=true;
							break;
						}
					}
					if(rowMatched)	{
						displayableTableData.push(tableData[i]);
					}
				}
			}
			
			thisPluginInstance.customDataTable.tableData = displayableTableData;
			
			thisPluginInstance.customDataTable.destroyTableData(tableDom);
			thisPluginInstance.customDataTable.createTableData(
				tableDom
				);
			
		}
		tableDom.parentNode.insertBefore(searchTextBox, tableDom);
	};
	
	return this;
};