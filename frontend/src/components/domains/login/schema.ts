import { z } from "@/commom/form/pt-zod";
import { PasswordValidationMessage } from "@/commom/form/form-validation";
import { containsLowercase, containsSpecialChar, containsUppercase } from "@/commom/form/form-validation-utils";

export const userLoginSchema = z.object({
    username: z.string().max(15),
    password: z.string().min(1)
});
// .superRefine((data, ctx) => {
//     if(!containsUppercase(data.password)){
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: PasswordValidationMessage.uppercaseRequired,
//             path: ['password']
//         });
//     }

//     if(!containsLowercase(data.password)){
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: PasswordValidationMessage.lowercaseRequired,
//             path: ['password']
//         });
//     }

//     if(!containsSpecialChar(data.password)){
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: PasswordValidationMessage.specialCharRequired,
//             path: ['password']
//         });
//     }
// });

export type UserLoginSchema = z.infer<typeof userLoginSchema>;