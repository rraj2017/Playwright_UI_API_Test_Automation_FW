import{test as baseTest} from '@playwright/test';
import { APIHelper } from '../api/APIHelper';

//define types for API fixtures:
type ApiFixtures = {
   apiHelper: APIHelper
};

export let test = baseTest.extend<ApiFixtures>({

    //anonymous functions 
    
    apiHelper: async({ request }, use) => {
      let apiHelper = new APIHelper(
          request,
          process.env.API_BASE_URL!
          
          );
      await use(apiHelper);

    },

});
export {expect} from '@playwright/test';