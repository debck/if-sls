import Knex from "knex";
import objection from "objection";

const knex = Knex({
	client: process.env.DB_PROVIDER || 'mysql',
	debug:  process.env.DB_DEBUG == 1, // eslint-disable-line eqeqeq
    connection: {
		host : process.env.MYSQL_HOST,
    	user : process.env.MYSQL_USER,
    	password : process.env.MYSQL_PASS,
    	database : process.env.MYSQL_DB
    },
});

objection.Model.knex(knex);

class BaseModel extends objection.Model {

	static get delimiter() {
		return "_";
	}

	static get softDelete() {
	    return true;
	}

	static get useLimitInFirst() {
		return true;
	}
}

const tablePrefix = process.env.MYSQL_TABLE_PREFIX || '';

export { BaseModel, knex, tablePrefix }; 