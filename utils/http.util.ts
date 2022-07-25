import {validateOrReject} from 'class-validator';
import {plainToInstance} from 'class-transformer';

export const requestSuccess = (body: object, statusCode = 200) => {
  return {statusCode, body: JSON.stringify(body)};
};

export const requestFail = (body: object, statusCode = 400) => {
  return {statusCode, body: JSON.stringify(body)};
};

export const requestValidation = async (classModel: any, body: object) => {
  try {
    const toValidate = plainToInstance(classModel, body);
    await validateOrReject(toValidate, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false
      }
    });
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
