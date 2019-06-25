({
    searchValues :function (component, event, helper, inputkeyWord) {
        var searchResultList = [];
        var records = component.get("v.optionsList");
        inputkeyWord = (inputkeyWord ? inputkeyWord.toLowerCase(): '');
        for (var i in records) {
            var str1 = (records[i].label ? records[i].label.toLowerCase(): '');
            if (str1.includes(inputkeyWord)) {
                searchResultList.push(records[i])
            }
        }
        component.set('v.optionSearchResult',searchResultList);
    },
    sortList :function (inputList) {
        inputList.sort(function(a, b){
        var nameA = (a.label ? a.label.toLowerCase(): ''), nameB = (b.label ? b.label.toLowerCase(): '');
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
        });
        return inputList;
    }
})