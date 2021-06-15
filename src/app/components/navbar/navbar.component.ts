import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewChecked,
  Output, EventEmitter
} from "@angular/core";
import { FormGroup } from "@angular/forms";
// import { NavInfo } from 'src/app/models/application-nav-info.model';
// import { ApplicationNavService } from 'src/app/services/application/application-nav.service';
// import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css", "../../app.component.css"],
})
export class NavbarComponent
  implements OnInit, AfterContentInit, AfterViewChecked {
  // navInfo: NavInfo;
  // profileServe = this.profileService;
  constructor(
    // private appNav: ApplicationNavService,
    // private profileService: ProfileService,
  ) {
    // this.BindToServiceProperties(appNav)
  }
  // BindToServiceProperties(appNav) {
  // this.navInfo = appNav.navInfo;
  // }
  // header_text = "Start your EYMAXX Experience today!";

  // applicationForm: FormGroup;
  // companySizeOptionValue: number;

  ngOnInit(): void { }
  ngAfterContentInit() {
  }
  @Output() stepSelected = new EventEmitter<FormGroup>();
  onSelect(form: FormGroup) {
    this.stepSelected.emit(form);
  }
  ngAfterViewChecked() { }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
  }

}
