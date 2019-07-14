import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import UserModel from './../models/user';
import  CompanyModel from './../models/company';
import  CompanyAddressModel from './../models/companyAddress';
import  CompanyTypesModel from './../models/companytypes';

export default async function CompanyList(args) {

	const { useremail } = args;


	const user = await UserModel.query().where('email', useremail).first();
	// console.log(user.id);

	if(user) {
			const company = await CompanyModel.query().where('userId', user.id);
			var companyType = [];
			var companyAddress = [];

			for(var i = 0 ; i < company.length; i++) {
				
				 const type = await CompanyTypesModel.query().where('companyId', company[i].id).first();
				 companyType.push(type)
				 const address = await CompanyAddressModel.query().where('companyId', company[i].id).first();
				 companyAddress.push(address)
			}
				return {
				status: true,
				data: {
					companyInfo: company,
					companyType: companyType,
					companyAddress : companyAddress
				},
				message: `Successfully sent company Info`,
			}
	} 
	else {
		return {
			status: false,
			message: `User not found!`,
			errorType: `USER_ERROR`
		}
	}
	
}
