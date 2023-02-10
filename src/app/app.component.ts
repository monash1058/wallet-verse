import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonService } from './shared/service/common.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loadingSpninerHide = true;
  constructor(private commonSer: CommonService, private cdRef: ChangeDetectorRef){}
  ngOnInit(): void{
    this.commonSer.loadingSpinner.subscribe((data: boolean) => {
      this.loadingSpninerHide = data;
      this.cdRef.detectChanges();
    });
  }
}
