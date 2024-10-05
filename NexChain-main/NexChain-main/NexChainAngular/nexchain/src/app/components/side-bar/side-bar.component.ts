import { Component, Output,EventEmitter, OnInit, HostListener} from '@angular/core';
import { navbarData } from './nav-data';
import { INavbarData } from './helper';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';


interface SideNavToggle{
  screenWidth:number;
  collapsed: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity:0}),
        animate('350ms' ,
        style({opacity: 1})
        )
      ]),

      transition(':leave',[
        style({opacity:0}),
        animate('350ms' ,
        style({opacity: 0})
        )
      ])

    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: '0' }),
          style({ transform: 'rotate(0deg)', offset: '1' })
        ]))
      ])
    ])

    

  ]
})
export class SideBarComponent implements OnInit{


  @Output()onToggleSideNav: EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData= navbarData;
  multiple: boolean = false;


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth <= 768) {
        this.collapsed = true;
        this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      }
    }
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth = window.innerWidth; // for screen width based on side bar open
    }  }

  toggleCollapse():void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth: this.screenWidth});
  }

  closeSidenav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }


  handleClick(item: INavbarData): void {
    if (!this.multiple) {
        for (let modelItem of this.navData) {
            if (item !== modelItem && modelItem.expanded) {
                modelItem.expanded = false;
            }
        }
    }
    if (item.items && item.items.length > 0) {
        item.expanded = !item.expanded;
    }
}

}
