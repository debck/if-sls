import handlebars from "handlebars";
import layouts from "handlebars-layouts";
import fs from "fs";
import path from "path";
import _ from "lodash";

handlebars.registerHelper(layouts(handlebars)); // Register helpers

const defaultEncoding = "utf8";
const templateTypes = {
	email: "email",
	default: "default"
}

const templateLayoutPaths = {
	email: "../templates/emails/layout.hbs",
}

function getTemplateTypePath(templateType) {
	if(templateType === templateTypes.email) {
		return "../templates/emails/";
	} 
	return "../templates/";
}

function readLayoutFromPath(templateType) {
	return fs.readFileSync(path.resolve(__dirname, templateLayoutPaths[templateType]), defaultEncoding);
}

function readTemplateFromPath(templateFile, templateType) {
	const templatePath = path.resolve(__dirname, path.join(getTemplateTypePath(templateType), templateFile));
	const content = fs.readFileSync(templatePath, defaultEncoding);
	return content;
}

async function templateBuilder(templateFile, templateType, data) {
	try {
		const layout = readLayoutFromPath(templateType);
		handlebars.registerPartial('layout', layout); // Register partials
		const content = readTemplateFromPath(templateFile, templateType);
		const template = handlebars.compile(content);
		const output = template(data);
		return {
			status: true,
			message: "Template Rendering Successful!",
			data: {
				content: output
			}
		}
	} catch(err) {
		console.error("Template Error", "Error rendering the template", [templateFile, templateType, data], err);
		return {
			status: false,
			message: "Error rendering the template"
		}
	}
}

export { templateBuilder, templateTypes };