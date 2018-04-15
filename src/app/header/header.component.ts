import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DataStoregeService} from '../shared/data-storege.service';
import {Http, Headers, Response} from '@angular/http';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  show = false;

  constructor(private dataStorageService: DataStoregeService, public authService: AuthService) {}

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string){
      this.featureSelected.emit(feature);
  }

  showDropDown(){
    this.show = !this.show;
  }

  onSave(){
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onLogout(){
    this.authService.logout();
  }

  onFetchData(){
    this.dataStorageService.getRecipes();
  }

}
