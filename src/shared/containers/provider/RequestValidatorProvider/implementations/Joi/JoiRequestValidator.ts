import joi from 'joi';
import IRequestValidatorProvider, { IRequestValidate } from '../../models/IRequestValidatorProvider';
import JoiSchemaValidator from './JoiSchemaValidator';

export default class JoiRequestValidator implements IRequestValidatorProvider {
  async validateRegister(data: IRequestValidate): Promise<any> {
    const joiSchemaValidator = new JoiSchemaValidator();
    return this._validate(data, joiSchemaValidator.register);
  }

  private async _validate(data: IRequestValidate, schemaValidation: () => object): Promise<any> {
    const schema = joi.object().keys(schemaValidation());
    try {
      await schema.validateAsync(data.body);
    } catch (error) {
      console.log(error);
      throw new Error('Invalid params');
    }
  }
}
