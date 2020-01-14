let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { Opener } from 'pip-services3-commons-node';
import { Closer } from 'pip-services3-commons-node';
import { Referencer } from 'pip-services3-commons-node';
import { ManagedReferences } from 'pip-services3-container-node';

import { MainFacadeService } from 'pip-services3-facade-node';
import { IAccountsPersistence } from 'pip-services-accounts-node';
import { AccountV1 } from 'pip-services-accounts-node';
import { IRolesPersistence } from 'pip-services-roles-node';
import { UserRolesV1 } from 'pip-services-roles-node';
import { ISessionsPersistence } from 'pip-services-sessions-node';
import { SessionV1 } from 'pip-services-sessions-node';
import { IOrganizationsPersistence } from 'pip-services-organizations-node';
import { OrganizationV1 } from 'pip-services-organizations-node';

import { SessionUserV1 } from '../../src/operations/version1/SessionUserV1';
import { TestUsers } from './TestUsers';
import { TestOrganizations } from './TestOrganizations';
import { ClientFacadeFactory } from '../../src/build/ClientFacadeFactory';
import { ClientFacadeServiceFactory } from '../../src/build/ClientFacadeServiceFactory';

export class TestReferences extends ManagedReferences {
    private _factory = new ClientFacadeFactory();

    public constructor() {
        super();

        this.appendCore();
        this.appendMicroservices();
        this.appendFacade();

        this.configureService();
        this.createUsersAndSessions();
    }

    private appendCore(): void {
        this.put(null, this._factory);

        this.append(new Descriptor('pip-services', 'facade-service', 'default', 'default', '*'));
    }

    private appendMicroservices(): void {
        this.append(new Descriptor('pip-services-activities', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-activities', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-activities', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-accounts', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-accounts', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-accounts', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-sessions', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-sessions', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-sessions', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-passwords', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-passwords', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-passwords', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-roles', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-roles', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-roles', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-email', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-email', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-sms', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-sms', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-emailsettings', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-emailsettings', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-emailsettings', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-smssettings', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-smssettings', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-smssettings', 'client', 'direct', 'default', '*'));
        this.append(new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-msgdistribution', 'client', 'direct', 'default', '*'));
        
        this.append(new Descriptor('pip-services-statistics', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-statistics', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('iqs-services-statistics', 'client', 'direct', 'default', '*'));
        
        this.append(new Descriptor('pip-services-organizations', 'persistence', 'memory', 'default', '*'));
        this.append(new Descriptor('pip-services-organizations', 'controller', 'default', 'default', '*'));
        this.append(new Descriptor('pip-services-organizations', 'client', 'direct', 'default', '*'));
    }

    private appendFacade(): void {
        this.append(new Descriptor('pip-facade-users', 'operations', 'sessions', 'default', '1.0'));
        this.append(new Descriptor('iqs-services-facade', 'service', 'facade', 'default', '1.0'));
    }

    public append(descriptor: Descriptor): void {
        let component = this._factory.create(descriptor);
        this.put(descriptor, component);
    }

    private configureService(): void {
        // Configure Facade service
        let service = this.getOneRequired<MainFacadeService>(
            new Descriptor('pip-services', 'facade-service', 'default', 'default', '*')
        );
        service.configure(ConfigParams.fromTuples(
            'root_path', '', //'/api/v1',
            'connection.protocol', 'http',
            'connection.host', '0.0.0.0',
            'connection.port', 3000
        ));
    }

    private createUsersAndSessions(): void {
        // Create accounts
        let accountsPersistence = this.getOneRequired<IAccountsPersistence>(
            new Descriptor('pip-services-accounts', 'persistence', '*', '*', '*')
        );

        let adminUserAccount = <AccountV1>{
            id: TestUsers.AdminUserId, 
            login: TestUsers.AdminUserLogin, 
            name: TestUsers.AdminUserName,
            active: true,
            create_time: new Date()
        };
        accountsPersistence.create(null, adminUserAccount, () => {});

        let user1Account = <AccountV1>{
            id: TestUsers.User1Id, 
            login: TestUsers.User1Login, 
            name: TestUsers.User1Name,
            active: true,
            create_time: new Date()
        };
        accountsPersistence.create(null, user1Account, () => {});

        let user2Account = <AccountV1>{
            id: TestUsers.User2Id, 
            login: TestUsers.User2Login, 
            name: TestUsers.User2Name,
            active: true,
            create_time: new Date()
        };
        accountsPersistence.create(null, user2Account, () => {});

        // Create test organization(s)
        let organizationsPersistence = this.getOneRequired<IOrganizationsPersistence>(
            new Descriptor('pip-services-organizations', 'persistence', '*', '*', '*')
        );
        let organization1 = <OrganizationV1>{
            id: TestOrganizations.Organization1Id, 
            name: TestOrganizations.Organization1Name
        };
        organizationsPersistence.create(null, organization1, () => {});

        // Create user roles
        let rolesPersistence = this.getOneRequired<IRolesPersistence>(
            new Descriptor('pip-services-roles', 'persistence', '*', '*', '*')
        );
        let adminUserRoles = <UserRolesV1>{
            id: TestUsers.AdminUserId,
            roles: [ 'admin', TestOrganizations.Organization1Id + ':admin' ]
        };
        rolesPersistence.set(null, adminUserRoles, () => {});

        let userRoles1 = <UserRolesV1>{
            id: TestUsers.User1Id,
            roles: [ TestOrganizations.Organization1Id + ':manager' ]
        };
        rolesPersistence.set(null, userRoles1, () => {});

        let userRoles2 = <UserRolesV1>{
            id: TestUsers.User2Id,
            roles: [ TestOrganizations.Organization1Id + ':user' ]
        };
        rolesPersistence.set(null, userRoles2, () => {});

        // Create opened sessions
        let sessionsPersistence = this.getOneRequired<ISessionsPersistence>(
            new Descriptor('pip-services-sessions', 'persistence', '*', '*', '*')
        );

        let adminUserData = _.clone(adminUserAccount);
        adminUserData.roles = [ 'admin', TestOrganizations.Organization1Id + ':admin' ];
        let adminUserSession = <SessionV1>{
            id: TestUsers.AdminUserSessionId,
            user_id: TestUsers.AdminUserId,
            user_name: TestUsers.AdminUserName,
            active: true,
            open_time: new Date(),
            request_time: new Date(),
            user: adminUserData
        };
        sessionsPersistence.create(null, adminUserSession, () => {});

        let user1Data = _.clone(user1Account);
        user1Data.roles = [ TestOrganizations.Organization1Id + ':manager' ];
        let user1Session = <SessionV1>{
            id: TestUsers.User1SessionId,
            user_id: TestUsers.User1Id,
            user_name: TestUsers.User1Name,
            active: true,
            open_time: new Date(),
            request_time: new Date(),
            user: user1Data
        };

        let user2Data = _.clone(user2Account);
        user2Data.roles = [ TestOrganizations.Organization1Id + ':user' ];
        sessionsPersistence.create(null, user1Session, () => {});
        let user2Session = <SessionV1>{
            id: TestUsers.User2SessionId,
            user_id: TestUsers.User2Id,
            user_name: TestUsers.User2Name,
            active: true,
            open_time: new Date(),
            request_time: new Date(),
            user: user2Data
        };
        sessionsPersistence.create(null, user2Session, () => {});
    }

}