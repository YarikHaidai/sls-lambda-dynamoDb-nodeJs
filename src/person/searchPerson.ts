import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import personService from "../services";
import SearchPersonRequest from "./dto/searchPersonRequest";

export const handler: Handler = async(event: APIGatewayEvent & SearchPersonRequest): Promise<APIGatewayProxyResult> => {
  const params = JSON.parse(event.body);
  const persons = await personService.searchPerson(params);

  return  {
    statusCode: 200,
    body: JSON.stringify(persons)
  };
};
