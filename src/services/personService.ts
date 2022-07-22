import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {Person} from "../models";
import SearchPerson from "../person/dto/searchPerson";

class PersonService {
  constructor(
    private readonly docClient: DocumentClient,
    private readonly tableName: string
  ) {}

  public async getAllPersons(): Promise<Person[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Person[];
  }

  public async getPerson(id: string): Promise<Person> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: {id},
      })
      .promise();

    return result.Item as Person;
  }

  public async createPerson(person: Person): Promise<Person> {
     await this.docClient
      .put({
        TableName: this.tableName,
        Item: person,
      })
      .promise();

    return person;
  }

  public async searchPerson(params: SearchPerson): Promise<Person[]> {
    const response = await this.docClient
      .scan({
        TableName: this.tableName,
        FilterExpression: "#key_name = :name AND #key_surname = :surname",
        ExpressionAttributeValues: {
          ":name": params.name,
          ":surname": params.surname
        },
        ExpressionAttributeNames: {
          "#key_name": "name",
          "#key_surname": "surname"
        },
      })
      .promise();

    return response.Items as Person[];
  }
}

export default PersonService;
