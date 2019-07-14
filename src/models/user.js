import _ from 'lodash';

import { BaseModel, tablePrefix }  from "./base";

export default class User extends BaseModel {

	static get tableName() {
	    return `${tablePrefix}users`;
	}

	publicObject() {
		return _.omit(this, ['password', 'socketID']);
	}

	static get statusOtpPending() {
		return 1;
	}

	static get statusOtpDone() {
		return 2;
	}

	static get defaultCountryCode() {
		return `91`;
	}

	static get defaultAccessLevel() {
		return `vendor`;
	}

	fullMobileNumber() {
		const { countryCode, mobile } = this;
		return `${countryCode}${mobile}`;
	}

}