import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offre } from 'src/app/services/offres';
import { OffresServiceService } from 'src/app/services/offres-service.service';

@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})
export class OffreDetailsComponent implements OnInit {
  id: string;
  offre: Offre;
  constructor(private route: ActivatedRoute, private router: Router,
    private offreService: OffresServiceService ) { }

  ngOnInit(): void {
    this.offre = new Offre();

    this.id = this.route.snapshot.params.id;
    this.offreService.getOffres(this.id)
      .subscribe(data => {
        console.log(data),
        this.offre = data;
      }, error => console.log(error));
  }

}
