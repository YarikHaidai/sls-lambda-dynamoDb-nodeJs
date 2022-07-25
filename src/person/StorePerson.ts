import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import StorePersonRequest from './dto/StorePersonRequest';
import {
  requestValidation,
  requestFail,
  requestSuccess
} from '../../utils/http.util';
import personService from '../services';
import {Person} from '../models';

export const handler: Handler = async (
  event: APIGatewayEvent & StorePersonRequest
): Promise<APIGatewayProxyResult> => {
  try {
    const params = JSON.parse(event.body) as Person;

    await requestValidation(Person, params);
    const person = await personService.storePerson(params);

    return requestSuccess(person);
  } catch (error) {
    console.error(error);
    return requestFail({message: error});
  }
};
