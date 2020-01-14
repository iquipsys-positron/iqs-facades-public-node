"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const pip_services3_facade_node_1 = require("pip-services3-facade-node");
const pip_services3_facade_node_2 = require("pip-services3-facade-node");
const pip_services3_facade_node_3 = require("pip-services3-facade-node");
class AuthManagerV1 {
    constructor() {
        this.basicAuth = new pip_services3_facade_node_1.BasicAuthManager();
        this.roleAuth = new pip_services3_facade_node_2.RoleAuthManager();
        this.ownerAuth = new pip_services3_facade_node_3.OwnerAuthManager();
    }
    anybody() {
        return this.basicAuth.anybody();
    }
    signed() {
        return this.basicAuth.signed();
    }
    owner(idParam = 'user_id') {
        return this.ownerAuth.owner(idParam);
    }
    ownerOrAdmin(idParam = 'user_id') {
        return this.ownerAuth.ownerOrAdmin(idParam);
    }
    organizationRoles(roles, idParam = 'org_id') {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let orgId = req.route.params[idParam];
                let authorized = _.includes(user.roles, 'admin');
                if (orgId != null && !authorized) {
                    for (let role of roles)
                        authorized = authorized || _.includes(user.roles, orgId + ':' + role);
                }
                if (!authorized) {
                    pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_IN_ORG_ROLE', 'User must be organization:' + roles.join(' or organization:') + ' to perform this operation').withDetails('roles', roles).withStatus(403));
                }
                else {
                    next();
                }
            }
        };
    }
    admin() {
        return this.roleAuth.userInRole('admin');
    }
    organizationAdmin(idParam = 'org_id') {
        return this.organizationRoles(['admin'], idParam);
    }
    organizationManager(idParam = 'org_id') {
        return this.organizationRoles(['admin', 'manager'], idParam);
    }
    organizationUser(idParam = 'org_id') {
        return this.organizationRoles(['admin', 'manager', 'user'], idParam);
    }
    organizationAdminOrOwner(userIdParam = 'user_id', orgIdParam = 'org_id') {
        return (req, res, next) => {
            let user = req.user;
            if (user == null) {
                pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_SIGNED', 'User must be signed in to perform this operation').withStatus(401));
            }
            else {
                let userId = req.route.params[userIdParam] || req.param(userIdParam);
                if (userId != null && userId == user.user_id) {
                    next();
                }
                else {
                    let orgId = req.route.params[orgIdParam];
                    let authorized = _.includes(user.roles, 'admin')
                        || _.includes(user.roles, orgId + ':admin');
                    if (!authorized) {
                        pip_services3_rpc_node_1.HttpResponseSender.sendError(req, res, new pip_services3_commons_node_1.UnauthorizedException(null, 'NOT_IN_ORG_ROLE', 'User must be organization:admin to perform this operation').withDetails('roles', ['admin']).withStatus(403));
                    }
                    else {
                        next();
                    }
                }
            }
        };
    }
}
exports.AuthManagerV1 = AuthManagerV1;
//# sourceMappingURL=AuthManagerV1.js.map