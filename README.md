# Advance PickList
Custom Picklist component with search feature and both single select and multi-select Picklist 


<a href="https://githubsfdeploy.herokuapp.com?owner=abhimanyud3dx&repo=Advance-PickList">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png">
</a>

## Advance PickList for Salesforce Lightning

### Feature
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
| optionsList | List | List of Object with 2 attributes label and value, eg. [{"label":"Agriculture", "value":"Agriculture"}] | 
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

