({
    //method for dropDown of Institutes
    dropDown: function(component) {
        var action = component.get("c.getInstitutes");
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set("v.instituteList", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    }, 
    
    //method for mentor table
    mentorTable: function(component){
        //if select null option("select an Institute") then table sholud not be displayed.
        var selectedOption = component.find("select1").get("v.value");
        if(selectedOption === "null") {
            component.set("v.showTable", false);
            component.set("v.studentLabel",[]);
        } else {
            component.set("v.showTable", true);
        }
        
        //setting label for mentor table
        var recordId=component.find("select1");
        var value=recordId.get("v.value");
        component.set("v.recordId",value);
        component.set("v.mentorLabel",[
            {label:"Name", fieldName:"Name", type:"text"},
            {label:"Designation",fieldName:"Designation__c", type:"text"},
            {label:"Student Number", fieldName:"Student_Number__c", type:"Number"}]);
        
        var action=component.get("c.getMentors");
        action.setParams({
            instituteId:component.get("v.recordId")   
        });
        
        action.setCallback(this,function(data){
            component.set("v.Mentors",data.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    //method  for student table
    getStudentTable: function(selectedRows,component){
        //component.set("v.selectedRows",[]);
        const selected = event.detail.selectedRows;
        console.log(selected);
        // Display the studentTable of the selected rows
        if(selected.length>0){
            for (let i = 0; i < selected.length; i++) {
                component.set("v.studentLabel",[
                    {label:"Name", fieldName:"Name", type:"text"},
                    {label:"Class",fieldName:"Class__c", type:"text"},
                    {label:"State", fieldName:"State__c", type:"text"}]);
                component.set("v.selectedRows",selected[i].Id);
                var mentorId = selected[i].Id;
                component.set("v.selectedMentorId",mentorId);
                var action= component.get("c.studentTable");
                action.setParams({"mentorId": mentorId});
                action.setCallback(this,function(data){
                    component.set("v.students",data.getReturnValue());
                });
                $A.enqueueAction(action);
            }
        }
        else{
            component.set("v.studentLabel", []);
        }
        
    }
})