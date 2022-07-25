import {APIGatewayProxyEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import personService from '../services';
import SearchPersonRequest from './dto/SearchPersonRequest';
import {requestFail, requestSuccess} from '../../utils/http.util';

export const handler: Handler = async (
  event: APIGatewayProxyEvent & SearchPersonRequest
): Promise<APIGatewayProxyResult> => {
  if (
    !event.queryStringParameters ||
    !event.queryStringParameters.name ||
    !event.queryStringParameters.surname
  ) {
    return requestFail({message: 'Name and surname is required'});
  }

  const name = event.queryStringParameters.name;
  const surname = event.queryStringParameters.surname;

  const persons = await personService.searchPerson({name, surname});
  return requestSuccess(persons);
};
