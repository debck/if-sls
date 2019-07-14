import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class Products extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}products`;
	}

}