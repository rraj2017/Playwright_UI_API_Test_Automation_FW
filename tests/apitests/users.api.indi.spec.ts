import { APIHelper } from '../../src/api/APIHelper';
import {test, expect} from '../../src/fixtures/apifixtures';
const TOKEN = process.env.API_Token!;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}` };

//helper - generic function - create a fresh user
async function createUser(apiHelper:APIHelper) {
    let userData = {
        name: 'Ritu Test API',
        email:`automation_${Date.now()}@open.com`,
        gender:'male',
        status: 'active'
    };
    let response = await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
      expect(response.status).toBe(201);
      return response.body;
}

//Test 1: Create a user test + verify : AAA
//POST--> userId--> GET/userId -- verify
test('POST - create a user', async ({ apiHelper }) => {
      //create a user:
      let userResponse = await createUser(apiHelper);

      //get the user:

      let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Ritu Test API');
    });


//Test 2: Update a user test + verify : AAA
//POST--> userId-->PUT--> GET/userId -- verify
test('PUT - update a user', async ({ apiHelper }) => {
    //create a user:
    let userResponse = await createUser(apiHelper);

    //update the user:
    let updatedUserData = {
        name: 'Ritu Test API Updated',
        status: 'inactive'
    };
    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, updatedUserData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUserData.name);

     //get the user:

     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
     expect(getResponse.status).toBe(200);
     expect(getResponse.body.name).toBe(updatedUserData.name);
     expect(getResponse.body.status).toBe(updatedUserData.status);
  });


  //Test 3: Delete a user test + verify : AAA
//POST--> userId-->DELETE--> GET/userId -- verify
test('DELETE - delete a user', async ({ apiHelper }) => {
    //create a user:
    let userResponse = await createUser(apiHelper);
   
    //delete a user:
    let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(204);

     //get the user:

     let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
     expect(getResponse.status).toBe(404);
     expect(getResponse.body.message).toBe('Resource not found');
  });