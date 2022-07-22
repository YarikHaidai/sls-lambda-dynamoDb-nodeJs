import {APIGatewayEvent, APIGatewayProxyResult, Handler} from 'aws-lambda';
import personService from "../services";
import * as uuid from "uuid";
import StorePerson from "./dto/storePerson";

export const handler: Handler = async(event: APIGatewayEvent & StorePerson): Promise<APIGatewayProxyResult> => {
  const {name, surname, age} = JSON.parse(event.body);

  try {
    const personId: string = uuid.v4();
    const person = await personService.createPerson({
      personId,
      name,
      surname,
      age,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      statusCode: 201,
      body: JSON.stringify(person)
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    };
  }
}
