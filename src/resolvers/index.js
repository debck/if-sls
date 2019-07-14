import { mergeResolvers } from 'merge-graphql-schemas';
import noticeResolver from './notice';

export default mergeResolvers([ 
		noticeResolver, 
]);