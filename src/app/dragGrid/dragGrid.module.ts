import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatToolbarModule, MatExpansionModule, MatCardModule, MatMenuModule, MatTooltipModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {DragGridComponent} from './dragGrid.component';
import {DragCardComponent} from './components/dragCard/dragCard.component';
import {ChartComponent} from './components/chart/chart.component';
import {TableComponent} from './components/table/table.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatProgressSpinnerModule
  ],
  declarations: [
    DragCardComponent,
    DragGridComponent,
    ChartComponent,
    TableComponent,
  ],
  exports: [
    DragGridComponent,
  ]
})
export class DragGridModule {}
