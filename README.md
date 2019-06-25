# Advance PickList
Custom Picklist component with search feature and both single select and multi-select Picklist 


<a href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04t0K000001KgFz&isdtp=p1">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png">
</a>

## Advance PickList for Salesforce Lightning

Demo : https://www.screencast.com/t/XuBGqkQJm

### Features
1. Support Single Select

![alt text](https://raw.githubusercontent.com/abhimanyud3dx/Advance-PickList/master/Sreenshots/Picklist-Single-Select.png)

2. Support Multiselect

![alt text](https://raw.githubusercontent.com/abhimanyud3dx/Advance-PickList/master/Sreenshots/Picklist-Multi-Select.png)

3. Searching 
4. Help Text

### Usage


| Attribute | Type | Description |
| --- | --- | --- |
| label | String | Field Label |
| value | String | Selected Value, format will be A;B;C in multiselect |
| optionsList | List | List of Object with 2 attributes label and value, eg. [{"label":"Agriculture", "value":"Agriculture"},{"label":"Banking", "value":"Banking"}] | 
| required | Boolean | Show required * on UI, you have to add validation separatly. |
| helptext | String | Help text to be displayed |
| multiselect | Boolean | Make this a multiselect picklist |
| showLabel | Boolean | Make label visible on UI |




1. Single Select
```
<c:AdvancePicklist  helptext="Please fill in this field as this is required field."
                    label="{!v.ObjectType.Account.Industry.label}" 
                    value="{!v.record.Industry}"
                    optionsList="{!v.ObjectType.Account.Industry.picklistOptions}"
                   ></c:AdvancePicklist>
```

2. Multi Select
```
<c:AdvancePicklist  required="true"
                    helptext="Please fill in this field as this is a required field."
                    label="{!v.ObjectType.Account.Industry.label}" 
                    value="{!v.record.Industry}"
                    multiselect="true"
                    optionsList="{!v.ObjectType.Account.Industry.picklistOptions}"
                   ></c:AdvancePicklist>
```

3. To clear the value in picklist give AdvancePicklist component an aura:id say "advPicklistId",

```
<c:AdvancePicklist  aura:id="advPicklistId"
                    label="{!v.ObjectType.Account.Industry.label}" 
                    value="{!v.record.Industry}"
                    optionsList="{!v.ObjectType.Account.Industry.picklistOptions}"
                   ></c:AdvancePicklist>
```
In parent component controller, execute this command and it will reset the picklist.
```
let childPicklistCmp = component.find("advPicklistId");
if (childPicklistCmp) {
  let auraMethodResult = childCmp.clearPicklist();
}
 ```
