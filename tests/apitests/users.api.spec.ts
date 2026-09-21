import {test, expect} from '@playwright/test';

let AUTH_TOKEN = {Authorization: 'Bearer 3485b5b274229c6f4a2cf80e65f98bef88a9ca98270afef676982e987733dcc9'};

test('get user test', async ({ request }) => {
    
   let response = await request.get('https://gorest.co.in/public/v2/users', {

     headers: AUTH_TOKEN

   });

  // console.log(response);

   let jsonResBody = await response.json();
   console.log(jsonResBody);

   console.log(response.status());
   console.log(response.statusText());
   expect(response.status()).toBe(200);
 
 });

 test('create a user test', async ({ request }) => {
    //JS Object
    let userData = {
        name: 'sam',
        email:`automation_${Date.now()}@open.com`,
        gender:'male',
        status: 'active'
    };
    //JS Object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
 
      headers: AUTH_TOKEN,
      data: userData
 
    });
 
   // console.log(response);
 
    let jsonResBody = await response.json();
    console.log(jsonResBody);
 
    console.log(response.status());
    console.log(response.statusText());
  
  });

  test('Update a user test', async ({ request }) => {
    //JS Object
    let userData = {
        name: 'Uday-1001',
        email:`automation_${Date.now()}@open.com`,
        gender:'male',
        status: 'inactive'
    };
    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8615515', {
 
      headers: AUTH_TOKEN,
      data: userData
 
    });
 
   // console.log(response);
 
    let jsonResBody = await response.json();
    console.log(jsonResBody);
 
    console.log(response.status());
    console.log(response.statusText());
  
  });

  test('Delete a user test', async ({ request }) => {
   
    let response = await request.delete('https://gorest.co.in/public/v2/users/8615515', {
 
      headers: AUTH_TOKEN
 
    });
 
    console.log(response.status());
    console.log(response.statusText());
  
  });

