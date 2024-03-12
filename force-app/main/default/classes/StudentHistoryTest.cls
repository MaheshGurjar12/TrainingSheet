@isTest
public class StudentHistoryTest {
    
   @testSetup
    public static void setup()
    {
        List<Student__c> student = new List<Student__c>();
        student.add(new student__c(Class__c = 'MBA',
                                  City__c = 'Ujjain',
                                  State__c = 'MP',
                                  Name = 'Divyansh',
                                  Mentor__c= 'a01F900001QA37fIAD'));
        insert student;
    }
    @isTest
    public static void testStudent()
    {
        Student__c student = [SELECT Class__c,City__c,State__c FROM Student__c WHERE Name = 'Divyansh' LIMIT 1];
           student.Class__c = '10th';
          student.City__c = 'dewas';
        student.State__c = 'MP';
        
        update student;
       // Query student history records
        List<Student_History__c> studentHistory = [SELECT FieldName__c, Old_Value__c, New_Value__c FROM Student_History__c WHERE Record_Id__c = :student.Id];
        
        // Assert that student history records are created
        System.assertNotEquals(0, studentHistory.size(), 'No student history records found');
        for(Student_History__c history : studentHistory) {
            // Assert that field name, old value, and new value are not null
            System.assertNotEquals(null, history.FieldName__c, 'Field name is null');
            System.assertNotEquals(null, history.Old_Value__c, 'Old value is null');
            System.assertNotEquals(null, history.New_Value__c, 'New value is null');
            
            // Assert that the field name corresponds to the updated field in Student__c
            if (history.FieldName__c == 'Class__c') {
                System.assertEquals('MBA', history.Old_Value__c, 'Old value does not match');
                System.assertEquals('10th', history.New_Value__c, 'New value does not match');
            } else if (history.FieldName__c == 'City__c') {
                System.assertEquals('Ujjain', history.Old_Value__c, 'Old value does not match');
                System.assertEquals('dewas', history.New_Value__c, 'New value does not match');
            } else if (history.FieldName__c == 'State__c') {
                System.assertEquals('MP', history.Old_Value__c, 'Old value does not match');
                System.assertEquals('MP', history.New_Value__c, 'New value does not match');
            }
        
    }
    }
}