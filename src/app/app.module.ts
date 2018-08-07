import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LayoutModule} from '@angular/cdk/layout';

import {MatButtonModule, MatToolbarModule, MatExpansionModule, MatCardModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppComponent} from './app.component';
import {SideBarNavComponent} from './side-bar-nav/side-bar-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DashboardComponent} from './dashboard/dashboard.component';

import {DragGridModule} from './dragGrid/dragGrid.module';

@NgModule({
   declarations: [
      AppComponent,
      SideBarNavComponent,
      DashboardComponent,
    ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      LayoutModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      MatSidenavModule,
      MatExpansionModule,
      MatGridListModule,
      MatCardModule,
      MatMenuModule,
      MatInputModule,
      MatTableModule,
      MatTooltipModule,
      MatTabsModule,
      MatProgressSpinnerModule,
      FormsModule,
      DragGridModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
