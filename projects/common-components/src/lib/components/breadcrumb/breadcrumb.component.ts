import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, UrlSegment } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const routeConfig = route.routeConfig;

    if (routeConfig && routeConfig.path) {
      let path = routeConfig.path;
      // Split path and iterate over segments, replacing segments like ":event"  by their value
      const segments = path.split('/').map(segment => {
        if (segment.startsWith(':')) {
          const paramName = segment.slice(1);
          return route.snapshot.params[paramName] || segment;
        }
        return segment;
      });

      const routeUrl = segments.join('/');
      url += `/${routeUrl}`;

      // check if a label is defined
      let label = route.snapshot.data['breadcrumb'] || undefined;
      
      if (label && (label.startsWith(':'))) {
        const paramName = label.slice(1);
        label = route.snapshot.params[paramName];
      }
      breadcrumbs.push({ label, url });
    }

    for (const child of route.children) {
      this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

}
