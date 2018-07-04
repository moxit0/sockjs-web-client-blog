import {Component, OnDestroy, OnInit} from '@angular/core';
import * as  EventBus from 'vertx3-eventbus-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private eb;
  private host = 'http://localhost:9090';

  ngOnInit(): void {
    const self = this;
    self.eb = new EventBus(this.host + '/ws');
    self.eb.onopen = function () {

      // set a handler to receive a message
      self.eb.registerHandler('ws-to-client', function (error, message) {
        console.log('received a message: ' + JSON.stringify(message));
      });
      console.log('Send message: ');
      self.eb.send('ws-to-server', {fruit: 'apple', color: 'red'});
      self.eb.publish('ws-to-server', {fruit: 'grape', color: 'yellow'});
    };
    self.eb.enableReconnect(true);
  }

  ngOnDestroy(): void {
    this.eb.close();
  }
}
