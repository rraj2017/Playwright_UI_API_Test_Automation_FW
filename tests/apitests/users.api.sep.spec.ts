import {test, expect} from '../../src/fixtures/apifixtures';
const TOKEN = process.env.API_Token!;
let AUTH_HEADER = {Authorization: `Bearer ${TOKEN}` };
let userId: number;

test.describe.serial('running e2e go rest CRUD api tests', ()=>{

test('GET API ---get all users test', async ({ apiHelper }) => {
    
    let response = await apiHelper.get('/public/v2/users',AUTH_HEADER);
      expect(response.status).toBe(200);
     expect(response.body.length).toBeGreaterThan(0);
     
    });

    test('POST API ---create a user test', async ({ apiHelper }) => {
        let userData = {
            name: 'Ritu Test API',
            email:`automation_${Date.now()}@open.com`,
            gender:'male',
            status: 'active'
        };
        let response = await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
          expect(response.status).toBe(201);
          expect(response.body.name).toBe(userData.name);
           userId = response.body.id;
          console.log('Created User is : ', userId);
          //expect(!userId).toBeNull();
        });


        test('PUT API ---Update a user test', async ({ apiHelper }) => {
            let updatedUserData = {
                name: 'Ritu Test API Updated',
                status: 'inactive'
            };
            let response = await apiHelper.put(`/public/v2/users/${userId}`,updatedUserData, AUTH_HEADER);
              expect(response.status).toBe(200);
              expect(response.body.name).toBe(updatedUserData.name);
              expect(response.body.status).toBe(updatedUserData.status);
            });


            test('DELETE API ---Delete a user test', async ({ apiHelper }) => {
                let response = await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
                  expect(response.status).toBe(204);
                  
                });

        })
