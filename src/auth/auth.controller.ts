import { Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { GetUser } from './decorators';
import { ApiTags } from '@nestjs/swagger';
import { AuthCreateUser, AuthLoginUser, AuthCheckAuthStatus } from './decorators/auths.decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor( private readonly authService: AuthService ) {}

  @AuthCreateUser()
  createUser( @Body() createUserDto:CreateUserDto ) {
    return this.authService.create( createUserDto );
  }
  
  @AuthLoginUser()
  loginUser( @Body() loginUserDto:LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

  @AuthCheckAuthStatus()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

  // @Get('private')
  // @UseGuards( AuthGuard() )
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: User,
  //   @GetUser('email') userEmail: string,  
  //   @RawHeaders() rawHeaders: string[],
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {
    
  //   return {
  //     ok: true,
  //     message: 'Hola Mundo Private', 
  //     user,
  //     userEmail,
  //     rawHeaders,
  //     headers,
  //   }
  // }

  // @SetMetadata('roles', ['admin','super-user'])

  // @Get('private2')
  // @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
  // @UseGuards( AuthGuard(), UserRoleGuard )
  // privateRoute2(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }

  // @Get('private3')
  // @Auth( ValidRoles.admin, ValidRoles.superUser )
  // privateRoute3(
  //   @GetUser() user: User
  // ) {

  //   return {
  //     ok: true,
  //     user
  //   }
  // }
  
}
