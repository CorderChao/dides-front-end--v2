import { Component } from '@angular/core';
import { SettingService } from 'src/app/modules/settings/service/setting.service';

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrl: './dashboard-data.component.scss'
})
export class DashboardDataComponent {
  reportList: any[] = [
{title:"Monthly Report", period: "Apr 1st 2024 - May 31st 2024", createdBy: "Admin", lastUpdate: "June 21st 2024"}
];
  tableColumns: any;
/**
 *
 */
constructor(
private setSvc: SettingService
) {

  
}
  ngOnInit(): void {
    this.fetchAllReports();
    this.tableColumns = {
      no: "S/No",
      title: "Title",
      period: "Report Period",
      createdBy: "GeneratedBy",
      lastUpdate: "Last Update"
    }
    
  }


  public fetchAllReports() {
    this.setSvc.getAllOrganization().subscribe((response) => {
      console.log("projects", response);
      if (response.code === 6000) {
        //this.reportList = response.data;
      }
    });
  }

add(){
}
edit(item:any){
}
remove(item:any){
}
}
