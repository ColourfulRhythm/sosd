import { Role } from 'src/user/schemas/user.schema';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { UnauthorizedException } from '@nestjs/common/exceptions';

const RoleGuard = (role: Role | Role[]): Type<CanActivate> => {
    class RoleGuardMixin extends JwtGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            if(Array.isArray(role)){
                if (!role.includes(user?.role)) {
                    throw new UnauthorizedException(
                        `Unauthorized to perform this action, only ${role}s are authorized`,
                    );
                } else {
                    return role.includes(user?.role)
                }
            }

            console.log(role)
            if (!(user?.role === role)) {
                throw new UnauthorizedException(
                    `Unauthorized to perform this action, only ${role}s are authorized`,
                    );
                }

            return (user?.role === role);
        }
    }

    return mixin(RoleGuardMixin);
};

export default RoleGuard;
