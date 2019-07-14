import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import  CompanyModel from './../models/company';
import  CompanyAddressModel from './../models/companyAddress';
import  CompanyTypesModel from './../models/companytypes';
import  CompanyReviewModel from './../models/reviews';
import  ProductModel from './../models/products';

export default async function Profile(args) {

	const { companyName } = args;

	const company = await CompanyModel.query().where('companyName', companyName).first();

	if(company) {

		const companyType = await CompanyTypesModel.query().where('companyId', company.id).first();
		const companyAddress = await CompanyAddressModel.query().where('companyId', company.id).first();
		const companyReview = await CompanyReviewModel.query().where('companyId', company.id);
		const products = await ProductModel.query().where('listingid', company.id);

		return {
				status: true,
				data: {
					companyInfo: company,companyReview,
					companyType: companyType,
					companyAddress: companyAddress,
					product: products
				},
				message: `Successfully sent company Info`,
			}
	} 
	else {
		return {
			status: false,
			message: `company not found!`,
			errorType: `COMPANY_ERROR`
		}
	}
}
