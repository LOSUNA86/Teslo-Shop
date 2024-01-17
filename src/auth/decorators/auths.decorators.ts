import { Get, HttpCode, HttpStatus, Post, applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { Auth } from "./auth.decorator";

export function AuthCreateUser() {
    return applyDecorators(
        Post('register'),
        ApiResponse({ status: 201, description: 'El usuario fue creado', type: User  }),
        ApiResponse({ status: 400, description: 'Bad request' }),
        ApiResponse({ status: 403, description: 'Forbidden. Token related.' }),
    );  
}

export function AuthLoginUser() {
    return applyDecorators(
        Post('login'),
        ApiResponse({ status: 200, description: 'Usuario logeado', type: User  }),
        ApiResponse({ status: 400, description: 'Bad request' }),
        ApiResponse({ status: 403, description: 'Forbidden. Token related.' }),
        HttpCode( HttpStatus.OK ),
    );  
}

export function AuthCheckAuthStatus() {
    return applyDecorators(
        Get('check-status'),
        Auth(),
        ApiBearerAuth(),        
    );  
}