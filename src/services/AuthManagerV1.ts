let _ = require('lodash');

import { UnauthorizedException } from 'pip-services3-commons-node';
import { HttpResponseSender } from 'pip-services3-rpc-node';

import { BasicAuthManager } from 'pip-services3-facade-node';
import { RoleAuthManager } from 'pip-services3-facade-node';
import { OwnerAuthManager } from 'pip-services3-facade-node';

export class AuthManagerV1 {
    private basicAuth = new BasicAuthManager();
    private roleAuth = new RoleAuthManager();
    private ownerAuth = new OwnerAuthManager();

    public anybody(): (req: any, res: any, next: () => void) => void {
        return this.basicAuth.anybody();
    }

    public signed(): (req: any, res: any, next: () => void) => void {
        return this.basicAuth.signed();
    }

    public owner(idParam: string = 'user_id'): (req: any, res: any, next: () => void) => void {
        return this.ownerAuth.owner(idParam);
    }
        
    public ownerOrAdmin(idParam: string = 'user_id'): (req: any, res: any, next: () => void) => void {
        return this.ownerAuth.ownerOrAdmin(idParam);
    }

    public organizationRoles(roles: string[], idParam: string = 'org_id'): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    ).withStatus(401)
                );
            } else {
                let orgId = req.route.params[idParam];
                let authorized = _.includes(user.roles, 'admin');
                
                if (orgId != null && !authorized) {
                    for (let role of roles)
                        authorized = authorized || _.includes(user.roles, orgId + ':' + role);
                }

                if (!authorized) {
                    HttpResponseSender.sendError(
                        req, res,
                        new UnauthorizedException(
                            null, 'NOT_IN_ORG_ROLE',
                            'User must be organization:' + roles.join(' or organization:') + ' to perform this operation'
                        ).withDetails('roles', roles).withStatus(403)
                    );
                } else {
                    next();
                }
            }
        };
    }

    public admin(): (req: any, res: any, next: () => void) => void {
        return this.roleAuth.userInRole('admin');
    }

    public organizationAdmin(idParam: string = 'org_id'): (req: any, res: any, next: () => void) => void {
        return this.organizationRoles(['admin'], idParam);
    }

    public organizationManager(idParam: string = 'org_id'): (req: any, res: any, next: () => void) => void {
        return this.organizationRoles(['admin', 'manager'], idParam);
    }

    public organizationUser(idParam: string = 'org_id'): (req: any, res: any, next: () => void) => void {
        return this.organizationRoles(['admin', 'manager', 'user'], idParam);
    }

    public organizationAdminOrOwner(userIdParam: string = 'user_id', orgIdParam: string = 'org_id'): (req: any, res: any, next: () => void) => void {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                HttpResponseSender.sendError(
                    req, res,
                    new UnauthorizedException(
                        null, 'NOT_SIGNED',
                        'User must be signed in to perform this operation'
                    ).withStatus(401)
                );
            } else {
                let userId = req.route.params[userIdParam] || req.param(userIdParam);
                if (userId != null && userId == user.user_id) {
                    next();
                } else {
                    let orgId = req.route.params[orgIdParam];
                    let authorized = _.includes(user.roles, 'admin')
                        || _.includes(user.roles, orgId + ':admin');
                    
                    if (!authorized) {
                        HttpResponseSender.sendError(
                            req, res,
                            new UnauthorizedException(
                                null, 'NOT_IN_ORG_ROLE',
                                'User must be organization:admin to perform this operation'
                            ).withDetails('roles', ['admin']).withStatus(403)
                        );
                    } else {
                        next();
                    }
                }
            }
        };
    }

}