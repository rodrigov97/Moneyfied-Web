import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-screen-confirmation',
  templateUrl: './screen-confirmation.component.html',
  styleUrls: ['./screen-confirmation.component.scss']
})
export class ScreenConfirmationComponent implements OnInit {

  isLoading: boolean = true;

  type: string;
  status: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    var params = this.activatedRoute.snapshot.params;

    this.type = params.type;
    this.status = params.status;
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }
}
