import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsStringOrArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' ||
            (Array.isArray(value) && value.every((item) => typeof item === 'string'))
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be either a string or an array of strings.`;
        },
      },
    });
  };
}
