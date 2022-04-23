import { Component, OnInit } from '@angular/core';
import { productsDB } from 'src/app/shared/data/products';

@Component({
  selector: 'app-offres-archives',
  templateUrl: './offres-archives.component.html',
  styleUrls: ['./offres-archives.component.scss']
})
export class OffresArchivesComponent implements OnInit {

  view = 'list';

  products;
  constructor() {}

  ngOnInit(): void {
    this.products = productsDB.Product;
  }
}


