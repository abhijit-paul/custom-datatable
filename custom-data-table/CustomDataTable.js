var CustomDataTable = function (columnHeaders, tableData)	{
	this.columnHeaders = columnHeaders,
	this.tableData = tableData;
	
	this.addClass = function(domElement, header)	{
		domElement.classList.add(header.key);
		if(header.key==="id")	{
			domElement.classList.add("hideColumn");
		}
		if(header.dataType === "number")	{
			domElement.classList.add("alignRight");
		}
		else	{
			domElement.classList.add("alignLeft");
		}
	};
	
	this.createHeader = function(tableDom)	{
		var header = document.createElement("tr"),
			headerCol,
			sortImg;

		for(let headerIndx = 0; headerIndx<this.columnHeaders.length; headerIndx++)	{
			headerCol = document.createElement("th");
			headerCol.innerText = this.columnHeaders[headerIndx].keyTitle;
			header.appendChild(headerCol);
			this.addClass(headerCol, this.columnHeaders[headerIndx]);
		};
		tableDom.appendChild(header);
		return header;
	};
	
	this.createTableData = function (tableDom, tableData)	{
		var rowData,
			row,
			rowCol;
		if(tableData === undefined)	{
			tableData = this.tableData;
		}
		for(let rowIndx=0; rowIndx<tableData.length; rowIndx++)	{
			rowData = tableData[rowIndx];
			row = document.createElement("tr");
			for(let headerIndx = 0; headerIndx<this.columnHeaders.length; headerIndx++)	{
				rowCol = document.createElement("td");
				rowCol.innerText = rowData[this.columnHeaders[headerIndx].key];
				row.appendChild(rowCol);
				this.addClass(rowCol, this.columnHeaders[headerIndx]);
			}
			tableDom.appendChild(row);
		}
	};
	
	this.destroyTableData = function (tableDom)	{
		var allRows=tableDom.childNodes,
			dataRows = [].slice.call(allRows, 1);
			
		for(let i = 0; i<dataRows.length; i++)	{
			dataRows[i].remove();
		}
	};
	
	this.initiate = function (tableDoms, options)	{
		if(tableDoms.nodeName !== undefined)	{
			tableDoms = [tableDoms];
		}
		if(tableDoms.length === undefined)	{
			return;
		}
		for(let i=0; i<tableDoms.length; i++)	{
			let tableDom = tableDoms[i];
			if(tableDom.nodeName === undefined)	{
				continue;
			}
			let header = this.createHeader(tableDom);
			this.createTableData(tableDom);
			if(options!==undefined)	{			
				if(options.sortable)	{
					let dataTableSortingPlugin = 
						new DataTableSortingPlugin(this);
					dataTableSortingPlugin.initiateSortability(tableDom);
				}
				if(options.searchable)	{
					let dataTableSearchingPlugin = 
						new DataTableSearchingPlugin(this);
					dataTableSearchingPlugin.initiateSearchability(tableDom);
				}
			}
		}
	};
	return this;
};