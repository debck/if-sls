import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class Company extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}company`;
	}
}