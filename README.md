npm install OpenCartWebAPIFramework
import { LoginPage, HomePage, ApiHelper, CsvHelper } from 'OpenCartWebAPIFramework';

// Use page objects
const loginPage = new LoginPage(page);
await loginPage.doLogin('user@test.com', 'password');

// Use API helper
const apiHelper = new ApiHelper(request, 'https://api.example.com');
const response = await apiHelper.get('/users');

// Use data helpers
const data = CsvHelper.readCsv('test-data.csv');
