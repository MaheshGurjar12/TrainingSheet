public class InstituteAuraController {
@AuraEnabled
    public static List<Institute1__c> getInstitutes(){
        
        return  [SELECT  Name FROM Institute1__c];
}
    @AuraEnabled
      public static List<Mentor2__c> getMentors(Id instituteId){
        return [SELECT Student_Number__c,Designation__c, Name FROM Mentor2__c WHERE Institute1__c =: instituteId];
    }
    
    @AuraEnabled
    public static List<Student1__c> studentTable(Id mentorId){
        System.debug('Student');
        return [SELECT Id, Name,Mentor2__c,Class__c,City__c,State__c FROM Student1__c WHERE Mentor2__c  = :mentorId];
  
    }
}