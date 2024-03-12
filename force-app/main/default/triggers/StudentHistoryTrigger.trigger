trigger StudentHistoryTrigger on Student__c (before insert,before update ,before delete,after update,after insert,after undelete,after delete) {
    
    if(Trigger.isAfter)
    {
        if(Trigger.isUpdate)
        {
                StudentHistoryHelper.historyHelper(Trigger.new , Trigger.oldMap);
        }
    }
}