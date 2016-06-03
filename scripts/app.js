var dataModel = new DataTableModel(),
	dataController = new DataTableController(),
	columnHeaders = dataController.parseColumnHeaders(dataModel.getData()),
	customDataTable = new CustomDataTable(columnHeaders, dataModel.getData());
	
customDataTable.initiate(
	document.getElementsByClassName("custom-data-table"),
	{sortable:true, searchable: true}
	);
