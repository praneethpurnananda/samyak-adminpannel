import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {


  navbarData = [
    {title: 'Dashboard' , icon: 'dashboard' , link: '/admin/dashboard'},
    {title: 'Users' , icon: 'face' , link: "/admin/users"},
    {title: 'IAM & Security' , icon: 'admin_panel_settings' , link: ''},
    {title: 'Event Management' , icon: 'event' , link: ''}
  ]
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

  }



}
