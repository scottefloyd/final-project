import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { CompetitorComponent } from './competitor/competitor.component';
import { JudgeComponent } from './judge/judge.component';
import { AudienceComponent } from './audience/audience.component';
import { ResultsComponent } from './results/results.component';
import { PlayerQueueComponent } from './player-queue/player-queue.component';
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [ 
  { path: "", redirectTo: "/home", pathMatch: "full" }, 
  { path: "home", component: HomeComponent },
  { path: "organizer", component: OrganizerComponent },
  { path: "judge", component: JudgeComponent },
  { path: "competitor", component: CompetitorComponent },
  { path: "audience", component: AudienceComponent },
  { path: "results", component: ResultsComponent },
  { path: "player-queue", component: PlayerQueueComponent}
  

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrganizerComponent,
    CompetitorComponent,
    JudgeComponent,
    AudienceComponent,
    ResultsComponent,
    PlayerQueueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
