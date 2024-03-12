public class StudentHistoryHelper {
    public static void historyHelper(List<Student__c> newStudents , Map<Id,Student__c> oldStudents){
        
        List<Student_History__c> studentHistoryRecords = new List<Student_History__c>();
        Map<String ,Schema.SObjectField> fieldMap = Student__c.SObjectType.getDescribe().fields.getMap();
        for(Student__c newStudent : newStudents){
            Student__c oldStudent = oldStudents.get(newStudent.Id);
            for(String fieldName : fieldMap.KeySet())
            {
                if(fieldMap.get(fieldName).getDescribe().isUpdateable()&&oldStudent!=null&&oldStudent.get(fieldName)!=newStudent.get(fieldName))
                {
                    studentHistoryRecords.add(new Student_History__c(
                        FieldName__c = fieldName,
                        old_Value__c = String.valueOf(oldStudent.get(fieldName)),
                        new_Value__c = String.valueOf(newStudent.get(fieldName)),
                        Record_Id__c = newStudent.Id,
                        Student__c = newStudent.Id,
                        Name = newStudent.Name
                        
                    ));
                }
            }
        }
        if(!studentHistoryRecords.isEmpty())
        {
            insert studentHistoryRecords;
        }
    }
    
}