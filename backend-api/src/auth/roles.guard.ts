import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        try {
            const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
            if (!requiredRoles) {
                return true; // Không yêu cầu role, cho phép tất cả
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            if (!user) {
                return false;
            }

            return requiredRoles.some((role) => user.roles.includes(role));
        } catch (err) {
            console.log(err);
            return false;
        }

    }
}