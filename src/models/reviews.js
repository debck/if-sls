import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class reviews extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}reviews`;
	}
}