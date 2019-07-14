import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class companyaddresses extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}companyaddresses`;
	}
}