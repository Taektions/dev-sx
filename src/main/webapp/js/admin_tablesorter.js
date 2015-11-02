function addAttrParserForTablesorter(attrName, sortType) {
	$.tablesorter.addParser({ 
		id: attrName, 
		is: function(s) { 
		    // return false so this parser is not auto detected 
		    return false; 
		}, 
		format: function(s, table, cell, cellIndex) { 
			var $cell = $(cell);
			return $cell.attr(attrName);
		}, 
		type: sortType
	});
}
 