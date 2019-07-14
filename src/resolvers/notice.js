
import _ from "lodash";

let noticesArr = [
	{
		id: 1,
		title : "Diwali Celerbration",
		noticeDate: "27-04-2018",
	},
	{
		id: 2,
		title : "Garbage Cleanup",
		noticeDate: "28-05-2018",
	},
	{
		id: 3,
		title : "Rainwater Harvesting and Monsoon Preps",
		noticeDate: "01-06-2018",
	},
];

export default {
	Query : {
		notices : (root, args, {event, lambdaContext, user}) => {
			
			return new Promise((resolve, reject) => {
				try {
					resolve(noticesArr);
				} catch(err) {
					reject("Error fetching notices");
				}
			});
		},

		noticeById: (root, args, {event, lambdaContext, user}) => {
			let notice = _.find(noticesArr, {id : args.noticeId});
			return new Promise((resolve, reject) => {
				resolve(notice);
			});
		}
	}
}