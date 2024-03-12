({
    doInit: function(component, event, helper) {
        helper.dropDown(component);
    },
    
    getMentorTable: function(component, event, helper){
        helper.mentorTable(component);
    },
    
    handleRowAction: function(component, event, helper){
          var selectedRows = event.getParam('selectedRows');
            helper.getStudentTable(selectedRows,component);

    }
})