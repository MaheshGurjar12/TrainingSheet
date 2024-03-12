public class salesforceMetaAssignmentAura {
    
    //method to fetch all the sobjects dynamically
    @AuraEnabled
    public static List<String> getObject(){
        List<String> objects = new List<String>();
        List<Schema.SObjectType> gd = Schema.getGlobalDescribe().Values();
        for(Schema.SObjectType sobj : gd){
            objects.add(sobj.getDescribe().getName());
        }
        objects.sort();
        System.debug(objects);
        return objects;
    }
    
    //method to fetch all the fields of the selected object dynamically
    @AuraEnabled
    public static List<wrapper> fieldMap(string objname){
        //List to store labels and values of the fields because in duallist box we can store values in the 
        //form of label and value that's why created wrapper
        List<wrapper> fieldsList = new List<wrapper>();
        
        //Map to get the objects dynamically
        Map<String,Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Schema.SObjectType sobjType = gd.get(objname); 
        Schema.DescribeSObjectResult describeResult = sobjType.getDescribe(); 
        
        //map to get the fields dynmically
        Map<String,Schema.SObjectField> fieldsMap = describeResult.fields.getMap();
        for (String fieldName : fieldsMap.keySet()) {
            wrapper wrapperObject =new wrapper(); 
            wrapperObject.label = fieldName;
            wrapperObject.value = string.valueof(fieldsMap.get(fieldName));
            fieldsList.add(wrapperObject);
        }
        System.debug(fieldsList);
        return fieldsList;
    }
    
    //wrapper class to store field label and value
    public class wrapper{
        @auraEnabled public String label;
        @auraEnabled public String value;
    }
    
    //method to create table based on SOQL Query
    @AuraEnabled
    public static   List<SObject> fieldTable(string objname, List<string> fields){
        // Construct the query dynamically using String.join to concatenate fields
        String soqlQuery = 'SELECT ' + String.join(fields, ',') + ' FROM ' + objname;
        
        // Execute the SOQL query
        List<SObject> objectData = Database.query(soqlQuery);
        return   objectData;
    }
    
}