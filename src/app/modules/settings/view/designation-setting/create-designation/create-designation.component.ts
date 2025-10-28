import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicForm } from 'src/app/shared/components/dynamic-form/dynamic-form.model';
import { AppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-create-designation',
  templateUrl: './create-designation.component.html',
  styleUrl: './create-designation.component.scss'
})
export class CreateDesignationComponent implements OnInit{
  formFields: DynamicForm;
  title: any;
  action: any;
  designation: any;

  constructor(
    public dialogRef: MatDialogRef<CreateDesignationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.title = this.data?.title;
    this.action = this.data?.action;
    this.designation = this.data?.designation;
  }

  ngOnInit(): void {
    
  }



  




  save(data){
    this.dialogRef.close();
  }

}
