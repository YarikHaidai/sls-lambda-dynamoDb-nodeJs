import createDynamoDBClient from "../config/db";
import PersonService from "./personService";
import {getEnvironmentVariable} from "../../utils";

const PERSON_TABLE = getEnvironmentVariable('PERSONS_TABLE');
const personService = new PersonService(createDynamoDBClient(), PERSON_TABLE);

export default personService;
