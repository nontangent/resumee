import { GoogleApis } from 'googleapis';
import * as settings from '../settings';
import { environment } from '../../environments/environment';

const google = new GoogleApis();
const analytics = google.analyticsreporting('v4');

const scopes = ["https://www.googleapis.com/auth/analytics.readonly"]
const START_DATE = '2020-04-01';
const END_DATE = 'today';

const jwtClient = new google.auth.JWT(
	settings.GOOGLE_CLIENT_EMAIL, 
	null, 
	settings.GOOGLE_PRIVATE_KEY, 
	scopes, 
	null
);

const requestBody = {
	"reportRequests": [
		{
    	"dateRanges": [
      	{
        	"startDate": START_DATE,
          "endDate": END_DATE
        }
     	],
    	"viewId": settings.GOOGLE_ANALYTICS_VIEW_ID,
      "dimensions": [
      	{
        	"name": "ga:pagePath"
        }
      ],
      "metrics": [
        {
          "expression": "ga:pageviews"
        }
      ],
    }
	]

};

export async function getPV(){	
	try {
 		const tokens = await jwtClient.authorize();
		const response = await analytics.reports.batchGet({requestBody: requestBody, auth: jwtClient});
		const pv = response.data.reports[0].data.rows[0].metrics[0].values[0]; 
		console.debug('PV:', pv);
		return pv
	} catch (e) {
		console.log(`エラー発生 ${e}`);
	}
};
