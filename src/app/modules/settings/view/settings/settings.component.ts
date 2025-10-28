import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  subscription!: Subscription;


ionViewWillLeave() {
  this.subscription.unsubscribe();
}


  constructor(
    private _routerSvc: Router, 
  ) {  }

    dashlets: any[] = [
       {
      title: 'Funder',
      subTitle: 'Funder Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/funder',
      color: 'ng-indigo'
    },
    {
      title: 'organization',
      subTitle: 'Organization Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/organization',
      color: 'ng-indigo'
    },
    {
      title: 'Consultant',
      subTitle: 'Consultant Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/consultant',
      color: 'ng-indigo'
    },
    {
      title: 'Contractor',
      subTitle: 'System Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/contractor',
      color: 'ng-indigo'
    },
    {
      title: 'ContractType',
      subTitle: 'System Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/contractType',
      color: 'ng-indigo'
    },

       {
      title: 'Configuration',
      subTitle: 'Configuration Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/configuration',
      color: 'ng-indigo'
    },

       {
      title: 'Contracts',
      subTitle: 'Packages Settings',
      iconName: 'ri-file-settings-line',
      route: 'settings/contract',
      color: 'ng-indigo'
    },
  ];

  public gotoLink(route: string, params: any){
    this._routerSvc.navigateByUrl(route);
  }

}
