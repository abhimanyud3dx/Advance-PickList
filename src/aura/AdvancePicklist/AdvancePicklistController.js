({  
    doInit : function (component, event, helper) {
        let value = component.get("v.value");
        let values = component.get("v.values");
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
        
        if(isMultiselect && values) {
          let selectedRecordList = [];
          var valueList = values.split(',');
          for (let v in valueList) {
            if(valueList[v]) {
              for (let i in records) {
                if (records[i].value == valueList[v]) {
                  let selectedObject = {};
                  selectedRecordList.push(records[i]);
                }
              }
            }
          }
          component.set("v.selectedRecords", selectedRecordList);
        }
        component.set('v.optionSearchResult',component.get('v.optionsList'));
    },
    setDefaultValue : function (component, event, helper) {
        component.set('v.optionSearchResult',component.get('v.optionsList'));
    },
    showOptionList : function (component, event, helper) {
        component.set('v.message','');
        if(component.get('v.optionsList').length == 0) {
            component.set('v.message','No Result Found');
        }
        component.set('v.optionSearchResult',component.get('v.optionsList'));
        let records = component.get('v.optionsList');
        let value = component.get("v.value");
        let selectedObject = {};
        if(value) {
          for (let i in records) {
              if (records[i].value == value) {
                  selectedObject.value = records[i].value;
                  selectedObject.label = records[i].label;
      
                  component.set("v.selectedRecord", selectedObject);
      
                  let forclose = component.find("searchRes");
                  $A.util.addClass(forclose, 'slds-is-close');
                  $A.util.removeClass(forclose, 'slds-is-open');
            
                  let lookUpTarget = component.find("lookupField");
                  $A.util.addClass(lookUpTarget, 'slds-hide');
                  $A.util.removeClass(lookUpTarget, 'slds-show');
                 
              }
          }
        }
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
        if(!component.get("v.isPillRemovable")) {
            event.preventDefault();
            alert($A.get("$Label.c.TEK_Pill_Is_Not_Removable"));
            return;
        }
        let isMultiselect = component.get("v.multiselect");
        if(isMultiselect) {
          
          let removeObject = event.getSource().get("v.name");
          let selectedRecordList = component.get("v.selectedRecords") || [];
          let selectedRecords = [];
          
          let values = '';
          for (let i in selectedRecordList) {
            if(removeObject != selectedRecordList[i].value) {
              values += selectedRecordList[i].value+',';
              selectedRecords.push(selectedRecordList[i]);
            }
          }
          component.set("v.selectedRecords", selectedRecords);
          component.set("v.values", values);
        }
        else{
          let lookUpTarget = component.find("lookupField");
          $A.util.addClass(lookUpTarget, 'slds-show');
          $A.util.removeClass(lookUpTarget, 'slds-hide');
          component.set("v.selectedRecord", {});
          component.set("v.value", "");
        }
        
        component.set("v.SearchKeyWord", null);
        component.set("v.optionSearchResult", null);
    },
    selectRecord : function (component, event, helper) {
      let records = component.get("v.optionSearchResult");
      let isMultiselect = component.get("v.multiselect");

      let currentTarget = event.currentTarget.dataset;
      let selectedObject = {};        

      for (let i in records) {
        if (records[i].value == currentTarget.id) {
          selectedObject.value = records[i].value;
          selectedObject.label = records[i].label;
        }
      }

      if(isMultiselect) {
        let selectedRecordList = [];
        let values = '';
        let selectedRecords = component.get("v.selectedRecords") || [];
        let isNew = true;

        for (let i in selectedRecords) {
          if(selectedRecords[i].value == selectedObject.value) {
            isNew = false;
          }
          values += selectedRecords[i].value+',';
          selectedRecordList.push(selectedRecords[i]);
        }

        if(isNew) {
          selectedRecordList.push(selectedObject);
          values += selectedObject.value+',';
          component.set("v.selectedRecords", selectedRecordList);
          component.set("v.values", values);
        }
        
      } else {
        component.set("v.selectedRecord", selectedObject);
        component.set("v.value", selectedObject.value);
        
        let lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, 'slds-hide');
        $A.util.removeClass(lookUpTarget, 'slds-show');
      }

      let forclose = component.find("searchRes");
      $A.util.addClass(forclose, 'slds-is-close');
      $A.util.removeClass(forclose, 'slds-is-open');
    },
    resetMessage : function(component, event) {
        component.set('v.message','');
    },
    clearAll : function(component, event) {
      component.set("v.selectedRecord", {});
      component.set("v.value", '');
      component.set("v.selectedRecords", []);
      component.set("v.values", '');
      component.set("v.SearchKeyWord", null);
      component.set("v.optionSearchResult", null);
      
      let lookUpTarget = component.find("lookupField");
      $A.util.addClass(lookUpTarget, 'slds-show');
      $A.util.removeClass(lookUpTarget, 'slds-hide');
    },
})
