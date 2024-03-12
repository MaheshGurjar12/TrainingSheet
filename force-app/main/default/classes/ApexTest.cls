public class ApexTest {
    public static void show(){
    List<Contact> l=new List<Contact>();
    for(Integer i=0;i<200;i++)
    {
        Contact c=new Contact(LastName='Test'+i);
        l.add(c);
    }
    
    insert  l;
    }
}