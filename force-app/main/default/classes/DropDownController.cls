public class DropDownController 
{
    public String selectedValue { get; set; }
    public String selectedMentorId { get; set; }
    public List<SelectOption> dropdownOptions { get; set; }
    public List<Mentor2__c> mentors { get; set; }
    public List<Student1__c> students { get; set; }
    
    
    public DropDownController() 
    {
        dropdownOptions = new List<SelectOption>();
        dropdownOptions.add(new selectOption('','Select Institute'));
        for(Institute1__c inst : [SELECT Id, Name FROM Institute1__c])
        {
            dropdownOptions.add(new SelectOption(inst.Id, inst.Name));
        }
    }
    public void fetchMentors()
    {
        // Fetch mentors for the selected institute
        mentors = [SELECT Id,Name, Designation__c,Student_Number__c FROM Mentor2__c WHERE Institute1__c = :selectedValue];
        students=null;
        
    }
    
    public void fetchStudents()
    {
        System.debug(selectedMentorId);
        students= [SELECT Id, Name,Mentor2__c,Class__c,City__c,State__c FROM Student1__c WHERE Mentor2__c  = :selectedMentorId];
        System.debug(students);
        
    }
}