import { Injectable } from '@angular/core';
import { NavigationEnd, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbsSubject = new BehaviorSubject<string[]>([]);
  private pageTitleSubject = new BehaviorSubject<string>('');

  breadcrumbs: Observable<string[]> = this.breadcrumbsSubject.asObservable();
  pageTitle: Observable<string> = this.pageTitleSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.getBreadcrumbs(this.router.routerState.root);
      this.breadcrumbsSubject.next(breadcrumbs);
      this.pageTitleSubject.next(this.getPageTitle(this.router.routerState.root));
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, breadcrumbs: string[] = []): string[] {
    if (route.snapshot.data['breadcrumbs']) {
      breadcrumbs.push(...route.snapshot.data['breadcrumbs']);
    }
    if (route.children.length > 0) {
      for (let child of route.children) {
        this.getBreadcrumbs(child, breadcrumbs);
      }
    }
    console.log(breadcrumbs);
    return breadcrumbs;
  }

  private getPageTitle(route: ActivatedRoute): string {
    let title = '';
    if (route.snapshot.data['pageTitle']) {
      title = route.snapshot.data['pageTitle'];
    } else if (route.children.length > 0) {
      title = this.getPageTitle(route.children[0]);
    }
    return title;
  }
}
