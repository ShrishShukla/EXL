import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

const isIframe = window !== window.parent && !window.opener;
const CLIENT_ID = '388990599477-cgjkfc0g865ds5fi7n4115jnhshqqpc9.apps.googleusercontent.com';

const routes: Routes = [{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [MsalGuard]
},
{
  path: '',
  component: HomeComponent
},]

@NgModule({
  declarations: [
    AppComponent,HomeComponent, ProfileComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    NgbModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      // apiKey: 'AIzaSyAc0HGvxy8GMNNhghre2u4-0dFm-hUGpBc'
      apiKey: '/'
    })
    ,
    ReactiveFormsModule,
    FormsModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '574226fe-8ecf-4fb2-a545-f027eb09c546', 
        authority: 'https://login.microsoftonline.com/c00a8c31-ebdd-4ef9-ae78-a27ca5ec64f9', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
        redirectUri: 'http://localhost:4200'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie:  isIframe, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      }
  }, {
    interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
    protectedResourceMap: new Map([ 
        // ['https://graph.microsoft.com/v1.0/me', ['user.read','user.readBasic.all','user.read.all', 'User.ReadWrite.All', 'Directory.Read.All', 'Directory.ReadWrite.All','Mail.Read']],
        ['https://graph.microsoft.com/v1.0/', ['user.read','user.readBasic.all','user.read.all', 'User.ReadWrite.All','Calendars.Read', 'Calendars.ReadWrite']],
    ])
  })
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }, MsalGuard,
   ],
  bootstrap: [AppComponent,MsalRedirectComponent],
  exports: [RouterModule]
})
export class AppModule { }
