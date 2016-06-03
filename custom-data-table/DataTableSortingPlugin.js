var DataTableSortingPlugin = function (customDataTable) {
	
	var thisPluginInstance = this;
	this.customDataTable = customDataTable;
	
	DataTableSortingPlugin.sortTypes={
		NOT_SORTED:"not_sorted", 
		SORT_ASC:"sort_asc", 
		SORT_DESC: "sort_desc"
	};
	
	this.getSortType = function(headerCol)	{
		if(headerCol
				.classList
				.contains(DataTableSortingPlugin.sortTypes.NOT_SORTED))	{
			return DataTableSortingPlugin.sortTypes.SORT_ASC;
		}
		else if (headerCol
				.classList
				.contains(DataTableSortingPlugin.sortTypes.SORT_ASC))	{
			return DataTableSortingPlugin.sortTypes.SORT_DESC;
		}
		else if (headerCol
				.classList
				.contains(DataTableSortingPlugin.sortTypes.SORT_DESC))	{
			return DataTableSortingPlugin.sortTypes.SORT_ASC;
		}
	};
	
	this.setSortType = function (sortingHeaderCol, sortType, allHeaderCols) {
		//set sort type for given column
		var removeAllSortingTypes = function (column)	{
			for (let type in DataTableSortingPlugin.sortTypes)	{
				column.classList.remove(
					DataTableSortingPlugin.sortTypes[type]
					);
			}
		};
		removeAllSortingTypes(sortingHeaderCol);
		sortingHeaderCol.classList.add(sortType);
		
		//Remove sort type from all other columns
		for (let headerCol=0; headerCol<allHeaderCols.length; headerCol++)	{
			if (allHeaderCols[headerCol] != sortingHeaderCol)	{
				removeAllSortingTypes(allHeaderCols[headerCol]);
				allHeaderCols[headerCol].classList.add(
					DataTableSortingPlugin.sortTypes.NOT_SORTED
					);
			}
		}
	};
	
	this.sortData = function (tableData, sortType, column)	{
		var columnIndex = [].indexOf.call(
				column.parentNode.childNodes,
				column
			),
			columnHeader = 
				thisPluginInstance.customDataTable.columnHeaders[columnIndex];
		
		tableData.sort(function (a, b) {
			var sortingDecision = {},
				RETAIN_ORDER = 1,
				SWAP_ORDER = -1;
				
			sortingDecision[DataTableSortingPlugin.sortTypes.SORT_ASC] = {
				PRE_GR8_THAN_POST: RETAIN_ORDER, 
				PRE_LSSR_THAN_POST: SWAP_ORDER
			};
				
			sortingDecision[DataTableSortingPlugin.sortTypes.SORT_DESC] = {
				PRE_GR8_THAN_POST: SWAP_ORDER, 
				PRE_LSSR_THAN_POST: RETAIN_ORDER
			};
			
			if(a[columnHeader.key] > b[columnHeader.key])	{
				return sortingDecision[sortType].PRE_GR8_THAN_POST;
			}
			else if(a[columnHeader.key] < b[columnHeader.key])	{
				return sortingDecision[sortType].PRE_LSSR_THAN_POST;
			}
			else {
				return 0;
			}
		});
	};
	
	this.addSortingClickHandler = function(headerCols, index)	{
		headerCols[index].onclick = function (event) {
			var tableDom = this.parentNode.parentNode;
				sortType = thisPluginInstance.getSortType(this);
			
			thisPluginInstance.sortData(
				thisPluginInstance.customDataTable.tableData,
				sortType,
				this
				);
			
			thisPluginInstance.customDataTable.destroyTableData(tableDom);
			thisPluginInstance.customDataTable.createTableData(tableDom);
			
			thisPluginInstance.setSortType(this, sortType, headerCols);
		};
	};
	
	this.addSortabilityClass = function(headerCol)	{
		headerCol.classList.add("sortable");
		headerCol.classList.add(DataTableSortingPlugin.sortTypes.NOT_SORTED);
	};
	
	this.initiateSortability = function (tableDom)	{
		var allRows=tableDom.childNodes,
			headerCols = allRows[0].childNodes;
		for (let headerColIndx=0;
				headerColIndx < headerCols.length; headerColIndx++)	{
			this.addSortabilityClass(headerCols[headerColIndx]);
			this.addSortingClickHandler(
				headerCols, 
				headerColIndx
				);
		}
	};
	
	return this;
};