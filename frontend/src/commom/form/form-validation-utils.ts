import { z } from "zod";
import { isBoolean, parseBoolean } from "@/commom/primitives/boolean";

export function numberCoerce(schema: z.ZodNumber | z.ZodOptional<z.ZodNumber> | z.ZodNullable<z.ZodNumber> | any) {

  const { nullable } = isNullOrUndefined(schema);

  return z.any().transform(valor => {

    if (valor === undefined)
      return undefined;

    if (valor === '') {

      if (nullable)
        return null;

      return undefined;
    }

    if (valor === null)
      return null;

    return Number(valor);
  }).pipe(schema);
}

export function booleanCoerce(schema: z.ZodBoolean | z.ZodOptional<z.ZodBoolean> | z.ZodNullable<z.ZodBoolean> | any) {

  const { nullable } = isNullOrUndefined(schema);

  return z.any().transform(valor => {

    if (valor === undefined)
      return undefined;

    if (valor === '') {

      if (nullable)
        return null;

      return undefined;
    }

    if (valor === null)
      return null;

    return isBoolean(valor) ? valor : parseBoolean(valor);
  }).pipe(schema);
}

function isNullOrUndefined(schema: z.ZodType<any, z.ZodAnyDef>) {
  const types = {
    nullable: false,
    optional: false
  };

  let schemaAtual = schema;
  while (schemaAtual) {

    if (schemaAtual._def.typeName.toString() === 'ZodOptional') {
      types.optional = true;
    }
    else if (schemaAtual._def.typeName.toString() === 'ZodNullable') {
      types.nullable = true;
    }

    schemaAtual = (schemaAtual._def as any).innerType;

  }
  return types;
}

export const containsUppercase = (char: string) => /[A-Z]/.test(char)

export const containsLowercase = (char: string) => /[a-z]/.test(char)

export const containsSpecialChar = (char: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(char);

