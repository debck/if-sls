import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class companytypes extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}companytypes`;
	}
}