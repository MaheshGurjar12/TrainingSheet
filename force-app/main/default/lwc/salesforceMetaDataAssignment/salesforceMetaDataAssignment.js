import { LightningElement, track } from 'lwc';
import getObject from '@salesforce/apex/SalesforceMetaDataAssingmentLwc.getObject';
import fieldMap from '@salesforce/apex/SalesforceMetaDataAssingmentLwc.fieldMap';
import fieldTable from '@salesforce/apex/SalesforceMetaDataAssingmentLwc.fieldTable';
export default class SalesforceMetaDataAssignment extends LightningElement {
    selectedObject = '';
    objects = [];
    fields = [];
    cardVisible = false;
    buttonVisible = false;
    textAreaVisible = false;
    tableButton = false;
    selectedvalues = [];
    soqlQuery = '';
    objtableColumns = [];
    tableData = [];

    //getter for combobox  
    get objects() {
        return this.objects;
    }

    //getter for selected values in dualList-box
    get selectedvalues() {
        return this.selectedvalues.length ? this.selectedvalues : 'none';
    }

    //calling apex method to get all objects
    connectedCallback() {
        getObject()
            .then(result => {
                let data = JSON.parse(JSON.stringify(result));
                let arr = [];//this array store the objects details in label and value pair
                for (var i = 0; i < data.length; i++) {
                    arr.push({ value: data[i], label: data[i] })
                }
                this.objects = arr;
            }).catch(error => {
                window.alert("error:" + error)
            })
    }

    //method to get selected objects' fields
    displayFields(event) {

        this.buttonVisible = false;
        this.textAreaVisible = false;
        this.tableButton = false;
        this.selectedvalues = [];
        this.soqlQuery = '';
        this.objtableColumns = [];


        this.cardVisible = true;
        this.selectedObject = event.detail.value;

        //call apex method to get fields of selected object
        fieldMap({ objname: this.selectedObject })  //pass slected object name to apex method to get related fields
            .then(result => {
                this.fields = result;
            })
            .catch(error => {
                window.alert("errormsg:" + error)
            })
    }

    //method to get selected values from dual-listbox
    dualChange(event) {
        this.selectedvalues = event.detail.value;
        this.buttonVisible = true;
    }

    //method to create SOQL Query
    createQuery() {
        this.textAreaVisible = true;
        var objectName = this.selectedObject;
        var selectedFields = this.selectedvalues;
        this.soqlQuery = 'SELECT ' + selectedFields.join(', ') + ' ' + 'FROM ' + objectName;
        this.tableButton = true;
    }

    //method to create table based on SOQL Query
    getTable() {
        var objectName = this.selectedObject;
        var selectedFields = this.selectedvalues;

        // Set table columns
        var tableColumns = [];
        selectedFields.forEach(function (field) {
            tableColumns.push({ label: field, fieldName: field, type: "string" });
        });
        this.objtableColumns = tableColumns;

        //calling apex controller method to fetch data dynamically of the selected fields
        console.log('Line 87');
        fieldTable({ objname: objectName, fields: selectedFields })
            .then(result => {
                this.tableData = result;
            })
            .catch(error => {
                window.alert(`Error message: ${error}`);
            });
        console.log('Line 98');
    }

}