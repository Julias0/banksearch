import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-branch-grid',
  templateUrl: './branch-grid.component.html',
  styleUrls: ['./branch-grid.component.scss']
})
export class BranchGridComponent implements OnInit {

  @Input() headers: string[] = [];
  @Input() data = [];

  constructor() { }

  ngOnInit() {
  }

}
