import InstanceCache from 'Core/InstanceCache';
import { renderApplication } from 'Core/Renderer';

import App from 'View/App';
import AppIndex from 'View/Index';

import Routing from 'Core/Routing';
import StoreCreator from 'Core/StoreCreator';
import RequestFactory from 'Core/RequestFactory';

import GitHub from 'GitHub/GitHub';
import Scheduler from 'Scheduler/Scheduler';

import { gitHubApiUrl } from 'Constants/Services/GitHub';
import { appSetupFlow } from 'Actions/HawkEye';

import GitHubAccountsService from 'Services/GitHubAccountsService';
import GitHubAuthenticationService from 'Services/GitHubAuthenticationService';
import GitHubNotificationsService from 'Services/GitHubNotificationsService';

import Routes from 'Routes';

class HawkEye
{
  private routing: IRouting;

  private storeCreator: IStoreCreator<IState>;

  constructor()
  {
    /*
     * Setup Routing and StoreCreator for our application
     */
    this.routing      = new Routing(App, AppIndex);
    this.storeCreator = new StoreCreator<IState>(this.routing.getHistory(),
                                                 this.onRehydrated.bind(this));

    /*
     * Sync history with the Store and add
     * the routing configuration
     */
    this.routing
        .syncHistoryWithStore(this.storeCreator.getStore())
        .addRouteConfigs(...Routes);

    /*
     * Bind our Routing and StoreCreator to the cache
     */
    InstanceCache
      .addInstance<IRouting>('IRouting', this.routing)
      .addInstance<IStoreCreator<IState>>('IStoreCreator', this.storeCreator)
      .addInstance<IScheduler>('IScheduler', new Scheduler);

    // @todo: Migrate the lot. ServiceBinder
    const gitHubService = new GitHub(new RequestFactory(gitHubApiUrl));

    InstanceCache
      .addInstance<IGitHub>('IGitHub', gitHubService)
      .addInstance<IGitHubAccountsService>('IGitHubAccountsService',
                                                 new GitHubAccountsService(gitHubService))
      .addInstance<IGitHubAuthenticationService>('IGitHubAuthenticationService',
                                                 new GitHubAuthenticationService(gitHubService))
      .addInstance<IGitHubNotificationsService>('IGitHubNotificationsService',
                                                 new GitHubNotificationsService(gitHubService));

    /*
     * Render our application in the container,
     * along with our storeCreator and routing instances.
     */
    renderApplication(
      document.getElementById('root'),
      this.storeCreator,
      this.routing
    );
  }

  public onRehydrated = () =>
  {
    this.storeCreator.getStore().dispatch(appSetupFlow());
  }
};

export default HawkEye;