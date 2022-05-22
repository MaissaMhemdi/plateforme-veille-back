import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';

@Component({
  selector: 'app-mes-offres',
  templateUrl: './mes-offres.component.html',
  styleUrls: ['./mes-offres.component.scss']
})
export class MesOffresComponent implements OnInit {

  offres: Observable<Offre[]>;
  pageSize : number = 10;
  pageElement : number =0;
  totalElement : number;

   constructor(private offresService: OffresServiceService,
               private router: Router,  private activatedRoute: ActivatedRoute) {}


   // tslint:disable-next-line:typedef
   ngOnInit() {
     this.reloadData();
     
   }
   detailsOffre(id: string) {
    this.router.navigate(['/dashadmin/detail', id]);
  }
   private getOffres() {
    this.offresService.getOffresUser()
    .subscribe(data => {
        this.offres = data['offres'];
        console.log("yyyyyyyyyyyyyyyyyyyy\n",this.totalElement)
    }
    , error => {
        console.log(error.error.message);
    }
    );
}
reloadData() {
  this.offres = this.offresService.getOffresUser();

}

nextPage(event) {
 this.pageSize=event.pageSize
 this.pageElement=event.pageIndex.toString();

  this.getOffres();
  console.log("hhhhhhhhhh",this.getOffres())
}
  
   // tslint:disable-next-line:typedef


   deleteOffres(id: string) {
     this.offresService.deleteOffre(id)
       .subscribe(
         data => {
           console.log(data);
           window.location.reload();

         },
         error => console.log(error));
   }


   getArchived(id: string) {
    this.offresService.getArchived(id)
       .subscribe(
         data => {
           console.log(data);
           window.location.reload();
         },
         error => console.log(error));

 }
  
    // tslint:disable-next-line:typedef
}

