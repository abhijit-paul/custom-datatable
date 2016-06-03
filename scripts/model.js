var DataTableModel = function ()	{
	this.data = undefined;
	this.getData = function ()	{
		if(this.data === undefined)	{
			this.data = BookListConfig.books;
		}
		return this.data;
	};
	return this;
};