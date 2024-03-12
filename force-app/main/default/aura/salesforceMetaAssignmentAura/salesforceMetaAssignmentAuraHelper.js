({
    //method to get all Sobjects dynamically
    objects : function(component) {
        //calling apex controller method to fetch all the objects dynamically and put in picklist
        var action= component.get("c.getObject");
        action.setCallback(this, function(response){
            var state=response.getState();
            if(state === "SUCCESS"){
                var allValues = response.getReturnValue();
                component.set("v.options", allValues);
            }
            else{
                console.log("Unknown error")
            }
            
        });
        $A.enqueueAction(action);
    },
    
    //method to get the fields of the selected object in picklist
    getFields : function(component) {
        //if we change the object from picklist the table will be empty 
        component.set("v.tableLabel",[]);
        
        //if we change the object from picklist the dual-listbox(2) will be empty 
        component.set("v.selectedValues",[]);
        
        //if we change the object from picklist the textArea will be empty  
        component.set("v.textAreaValues",[]);
        
        var objectName= component.get("v.selectedValue");
        
        //calling apex controller method to fetch the fields of the selected object from picklist
        var action=component.get("c.fieldMap");
        action.setParams({
            objname:objectName
        });
        action.setCallback(this,function(data){
            component.set("v.fields",data.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    //method to create SOQL Query
    getQuery:function(component){
        var objectName= component.get("v.selectedValue");
        var selectedFields = component.get("v.selectedValues");
        var fieldsWithCommas = 'SELECT '+selectedFields.join(', ')+' '+'FROM '+objectName;
        component.set("v.textAreaValues",fieldsWithCommas);
        
    },
    
    //method to create table based on SOQL Query
    getTable:function(component,event,helper){
        var objectName= component.get("v.selectedValue");
        var selectedFields = component.get("v.selectedValues");
        
        // Set table columns
        var tableColumns = [];
        selectedFields.forEach(function(field) {
            tableColumns.push({ label: field, fieldName: field, type: "string" });
        });
        component.set("v.tableLabel", tableColumns);
        
        //calling apex controller method to fetch data dynamically of the selected fields
        var action=component.get("c.fieldTable");
        action.setParams({
            objname:objectName,
            fields:selectedFields
        });
        action.setCallback(this,function(data){
            component.set("v.tableData",data.getReturnValue());
        });
        //without this above action won't be performed 
        $A.enqueueAction(action); 
        
    }    
})