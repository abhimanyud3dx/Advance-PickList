({  
    doInit : function (component, event, helper) {
        let value = component.get("v.value");
        let selectedObject = {};
        let records = component.get("v.optionsList");
        let isMultiselect = component.get("v.multiselect");
        
        if(value) {
            for (let i in records) {
                if (records[i].value == value) {
                    selectedObject.value = records[i].value;
                    selectedObject.label = records[i].label;
        
                    component.set("v.selectedRecord", selectedObject);
        
                    let forclose = component.find("searchRes");
                    $A.util.addClass(forclose, 'slds-is-close');
                    $A.util.removeClass(forclose, 'slds-is-open');
        
                    if(!isMultiselect) {
                        let lookUpTarget = component.find("lookupField");
                        $A.util.addClass(lookUpTarget, 'slds-hide');
                        $A.util.removeClass(lookUpTarget, 'slds-show');
                    }
                }
            }
        }
        
        if(isMultiselect && value) {
          let selectedRecordList = [];
          var valueList = value.split(';');
          for (let v in valueList) {
            if(valueList[v]) {
              for (let i in records) {
                if (records[i].value == valueList[v]) {
                  let selectedObject = {};
                  selectedRecordList.push(records[i]);
                  if(records[i].value) {
                      records.splice(i, 1);
                  }
                }
              }
            }
          }
          
          records = helper.sortList(records);
          component.set("v.optionsList", records);
          component.set("v.selectedRecords", selectedRecordList);
        }
        component.set('v.optionSearchResult',component.get('v.optionsList'));
    },
    onfocus : function (component, event, helper) {
        let forOpen = component.find("searchRes");
        $A.util.addClass(forOpen, 'slds-is-open');
        $A.util.removeClass(forOpen, 'slds-is-close');
        let inputkeyWord = '';
        component.set('v.message','');
        helper.searchValues(component, event, helper, inputkeyWord);
    },
    onblur : function (component, event, helper) {
        component.set("v.optionSearchResult", null);
        let forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    keyPressController : function (component, event, helper) {
        // get the search Input keyword
        let inputkeyWord = component.get("v.SearchKeyWord");
        component.set('v.message','');
        // else close the lookup result List part.
        if (inputkeyWord.length > 0) {
            let forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchValues(component, event, helper, inputkeyWord);
        } else {
            component.set("v.optionSearchResult", null);
            let forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },
    // function for clear the Record Selaction
    clear : function (component, event, helper) {
        let isMultiselect = component.get("v.multiselect");
        let optionsList = component.get("v.optionsList");
        
        if(isMultiselect) {
          
          let removeObject = event.getSource().get("v.name");
          let selectedRecordToRemove = {};
          let selectedRecordList = component.get("v.selectedRecords") || [];
          let selectedRecords = [];
          
          let value = '';
          for (let i in selectedRecordList) {
            if(removeObject != selectedRecordList[i].value) {
              value += selectedRecordList[i].value+';';
              selectedRecords.push(selectedRecordList[i]);
            } else {
                selectedRecordToRemove = selectedRecordList[i];
            }
          }
          
          // Add item back to Search List
          if (selectedRecordToRemove) {
              optionsList.push(selectedRecordToRemove);
          }
          optionsList = helper.sortList(optionsList);
          component.set("v.optionsList", optionsList);
          component.set("v.selectedRecords", selectedRecords);
          component.set("v.value", value);
        }
        else{
          let lookUpTarget = component.find("lookupField");
          $A.util.addClass(lookUpTarget, 'slds-show');
          $A.util.removeClass(lookUpTarget, 'slds-hide');
          component.set("v.selectedRecord", {});
          component.set("v.value", '');
        }
        
        component.set("v.SearchKeyWord", null);
        component.set("v.optionSearchResult", null);
    },
    selectRecord : function (component, event, helper) {
      let records = component.get("v.optionSearchResult");
      let isMultiselect = component.get("v.multiselect");
      let optionsList = component.get("v.optionsList");

      let currentTarget = event.currentTarget.dataset;
      let selectedObject = {};        

      for (let i in records) {
        if (records[i].value == currentTarget.id && records[i].value != null) {
          selectedObject.value = records[i].value;
          selectedObject.label = records[i].label;
        }
      }
      
      if(selectedObject.value) {
          if(isMultiselect) {
            let selectedRecordList = [];
            let value = '';
            let selectedRecords = component.get("v.selectedRecords") || [];
            let isNew = true;
    
            for (let i in selectedRecords) {
              if(selectedRecords[i].value == selectedObject.value) {
                isNew = false;
              }
              value += selectedRecords[i].value+';';
              selectedRecordList.push(selectedRecords[i]);
            }
    
            if(isNew) {
              selectedRecordList.push(selectedObject);
              value += selectedObject.value+';';
              component.set("v.selectedRecords", selectedRecordList);
              component.set("v.value", value);
            }
            
            // Remove item from Search List
            for(let i in optionsList){ 
               if ( optionsList[i].value === selectedObject.value) {
                 optionsList.splice(i, 1); 
               }
            }
            optionsList = helper.sortList(optionsList);
            component.set("v.optionsList", optionsList);
            
          } else {
            component.set("v.selectedRecord", selectedObject);
            component.set("v.value", selectedObject.value);
            
            let lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');
          }
        }
        let forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    clearAll : function(component, event, helper) {
        
        // Reset optionsList
        let optionsList = component.get("v.optionsList");
        let selectedRecords = component.get("v.selectedRecords");
        let selectedRecord = component.get("v.selectedRecord");
        if(selectedRecords) {
            for(let i in selectedRecords){
                if(selectedRecords) {
                    optionsList.push(selectedRecords[i]);
                }
            } 
        }
        if(selectedRecord && selectedRecord.value) {
             optionsList.push(selectedRecord);
        }
        optionsList = helper.sortList(optionsList);
        component.set("v.optionsList", optionsList);
        
        component.set("v.optionsList", optionsList);
        component.set("v.selectedRecord", {});
        component.set("v.selectedRecords", []);
        component.set("v.value", '');
        component.set("v.SearchKeyWord", null);
        component.set("v.optionSearchResult", null);
    
        let lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');
    },
})
