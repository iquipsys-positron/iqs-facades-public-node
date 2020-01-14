import { Descriptor } from 'pip-services3-commons-node';
import { PartitionFacadeService } from 'pip-services3-facade-node';
import { AboutOperations } from 'pip-services3-facade-node';

import { LoggingOperationsV1 } from 'pip-facade-infrastructure-node';
import { CountersOperationsV1 } from 'pip-facade-infrastructure-node';
import { EventLogOperationsV1 } from 'pip-facade-infrastructure-node';
import { SettingsOperationsV1 } from 'pip-facade-infrastructure-node';
import { StatisticsOperationsV1 } from 'pip-facade-infrastructure-node';
import { BlobsOperationsV1 } from 'pip-facade-infrastructure-node';

import { AccountsOperationsV1 } from 'pip-facade-users-node';
import { ActivitiesOperationsV1 } from 'pip-facade-users-node';
import { PasswordsOperationsV1 } from 'pip-facade-users-node';
import { RolesOperationsV1 } from 'pip-facade-users-node';
import { EmailSettingsOperationsV1 } from 'pip-facade-users-node';
import { EmailOperationsV1 } from 'pip-facade-infrastructure-node';
import { SmsSettingsOperationsV1 } from 'pip-facade-users-node';
import { SmsOperationsV1 } from 'pip-facade-infrastructure-node';

import { ApplicationsOperationsV1 } from 'pip-facade-content-node';
import { TipsOperationsV1 } from 'pip-facade-content-node';
import { GuidesOperationsV1 } from 'pip-facade-content-node';
import { HelpOperationsV1 } from 'pip-facade-content-node';
import { ImageSetsOperationsV1 } from 'pip-facade-content-node';
import { DashboardsOperationsV1 } from 'pip-facade-content-node';
import { MessageTemplatesOperationsV1 } from 'pip-facade-content-node';

import { AnnouncementsOperationsV1 } from 'pip-facade-support-node';
import { FeedbacksOperationsV1 } from 'pip-facade-support-node';

import { CreditCardsOperationsV1 } from 'pip-facade-ecommerce-node';

import { ClustersOperationsV1 } from '../operations/version1/ClustersOperationsV1';
import { SessionsOperationsV1 } from '../operations/version1/SessionsOperationsV1';
import { OrganizationsOperationsV1 } from '../operations/version1/OrganizationsOperationsV1';
import { ServiceAgreementsOperationsV1 } from '../operations/version1/ServiceAgreementsOperationsV1';
import { LocationsOperationsV1 } from '../operations/version1/LocationsOperationsV1';
import { ObjectGroupsOperationsV1 } from '../operations/version1/ObjectGroupsOperationsV1';
import { ControlObjectsOperationsV1 } from '../operations/version1/ControlObjectsOperationsV1';
import { DataProfilesOperationsV1 } from '../operations/version1/DataProfilesOperationsV1';
import { DeviceProfilesOperationsV1 } from '../operations/version1/DeviceProfilesOperationsV1';
import { DeviceConfigsOperationsV1 } from '../operations/version1/DeviceConfigsOperationsV1';
import { DevicesOperationsV1 } from '../operations/version1/DevicesOperationsV1';
import { EventTemplatesOperationsV1 } from '../operations/version1/EventTemplatesOperationsV1';
import { ResolutionsOperationsV1 } from '../operations/version1/ResolutionsOperationsV1';
import { GatewaysOperationsV1 } from '../operations/version1/GatewaysOperationsV1';
import { InvitationsOperationsV1 } from '../operations/version1/InvitationsOperationsV1';
import { RolesOperationsV1 as OrganizationRolesOperationsV1 } from '../operations/version1/RolesOperationsV1';

import { CurrentObjectStatesOperationsV1 } from '../operations/version1/CurrentObjectStatesOperationsV1';
import { CurrentDeviceStatesOperationsV1 } from '../operations/version1/CurrentDeviceStatesOperationsV1';
import { IncidentsOperationsV1 } from '../operations/version1/IncidentsOperationsV1';
import { ZonesOperationsV1 } from '../operations/version1/ZonesOperationsV1';
import { BeaconsOperationsV1 } from '../operations/version1/BeaconsOperationsV1';
import { EventRulesOperationsV1 } from '../operations/version1/EventRulesOperationsV1';
import { ShiftsOperationsV1 } from '../operations/version1/ShiftsOperationsV1';
import { EmergencyPlansOperationsV1 } from '../operations/version1/EmergencyPlansOperationsV1';
import { StateUpdatesOperationsV1 } from '../operations/version1/StateUpdatesOperationsV1';
import { RestGatewayOperationsV1 } from '../operations/version1/RestGatewayOperationsV1';
import { RouteAnalysisOperationsV1 } from '../operations/version1/RouteAnalysisOperationsV1';

import { OperationalEventsOperationsV1 } from '../operations/version1/OperationalEventsOperationsV1';
import { ObjectDataOperationsV1 } from '../operations/version1/ObjectDataOperationsV1';
import { ObjectPositionsOperationsV1 } from '../operations/version1/ObjectPositionsOperationsV1';
import { ObjectStatesOperationsV1 } from '../operations/version1/ObjectStatesOperationsV1';
import { ObjectRoutesOperationsV1 } from '../operations/version1/ObjectRoutesOperationsV1';
import { AttendanceOperationsV1 } from '../operations/version1/AttendanceOperationsV1';
import { RostersOperationsV1 } from '../operations/version1/RostersOperationsV1';
import { SignalsOperationsV1 } from '../operations/version1/SignalsOperationsV1';
import { CorrectionsOperationsV1 } from '../operations/version1/CorrectionsOperationsV1';
import { OrganizationStatisticsOperationsV1 } from '../operations/version1/OrganizationStatisticsOperationsV1';

import { CloudwatchOperationsV1 } from '../operations/version1/CloudwatchOperationsV1';

import { AuthManagerV1 } from './AuthManagerV1';

export class ClientFacadeServiceV1 extends PartitionFacadeService {

    public constructor() {
        super();

        this._rootPath = "/api/v1";

        this._dependencyResolver.put('about', new Descriptor("pip-services", "facade-operations", "about", "*", "1.0"));

        this._dependencyResolver.put('logging', new Descriptor("pip-facade-infrastructure", "operations", "logging", "*", "1.0"));
        this._dependencyResolver.put('counters', new Descriptor("pip-facade-infrastructure", "operations", "counters", "*", "1.0"));
        this._dependencyResolver.put('eventlog', new Descriptor("pip-facade-infrastructure", "operations", "eventlog", "*", "1.0"));
        this._dependencyResolver.put('settings', new Descriptor("pip-facade-infrastructure", "operations", "settings", "*", "1.0"));
        this._dependencyResolver.put('statistics', new Descriptor("pip-facade-infrastructure", "operations", "statistics", "*", "1.0"));
        this._dependencyResolver.put('blobs', new Descriptor("pip-facade-infrastructure", "operations", "blobs", "*", "1.0"));
        this._dependencyResolver.put('email', new Descriptor("pip-facade-infrastructure", "operations", "email", "*", "1.0"));
        this._dependencyResolver.put('sms', new Descriptor("pip-facade-infrastructure", "operations", "sms", "*", "1.0"));

        this._dependencyResolver.put('accounts', new Descriptor("pip-facade-users", "operations", "accounts", "*", "1.0"));
        this._dependencyResolver.put('activities', new Descriptor("pip-facade-users", "operations", "activities", "*", "1.0"));
        this._dependencyResolver.put('passwords', new Descriptor("pip-facade-users", "operations", "passwords", "*", "1.0"));
        this._dependencyResolver.put('roles', new Descriptor("pip-facade-users", "operations", "roles", "*", "1.0"));
        this._dependencyResolver.put('email-settings', new Descriptor("pip-facade-users", "operations", "email-settings", "*", "1.0"));
        this._dependencyResolver.put('sms-settings', new Descriptor("pip-facade-users", "operations", "sms-settings", "*", "1.0"));

        this._dependencyResolver.put('applications', new Descriptor("pip-facade-content", "operations", "applications", "*", "1.0"));
        this._dependencyResolver.put('tips', new Descriptor("pip-facade-content", "operations", "tips", "*", "1.0"));
        this._dependencyResolver.put('guides', new Descriptor("pip-facade-content", "operations", "guides", "*", "1.0"));
        this._dependencyResolver.put('help', new Descriptor("pip-facade-content", "operations", "help", "*", "1.0"));
        this._dependencyResolver.put('imagesets', new Descriptor("pip-facade-content", "operations", "imagesets", "*", "1.0"));
        this._dependencyResolver.put('dashboards', new Descriptor("pip-facade-content", "operations", "dashboards", "*", "1.0"));
        this._dependencyResolver.put('msgtemplates', new Descriptor("pip-facade-content", "operations", "msgtemplates", "*", "1.0"));
        
        this._dependencyResolver.put('announcements', new Descriptor("pip-facade-support", "operations", "announcements", "*", "1.0"));
        this._dependencyResolver.put('feedbacks', new Descriptor("pip-facade-support", "operations", "feedbacks", "*", "1.0"));

        this._dependencyResolver.put('credit-cards', new Descriptor("pip-facade-ecommerce", "operations", "creditcards", "*", "1.0"));
        
        this._dependencyResolver.put('clusters', new Descriptor("iqs-services-facade", "operations", "clusters", "*", "1.0"));

        this._dependencyResolver.put('sessions', new Descriptor("iqs-services-facade", "operations", "sessions", "*", "1.0"));
        this._dependencyResolver.put('organizations', new Descriptor("iqs-services-facade", "operations", "organizations", "*", "1.0"));
        this._dependencyResolver.put('agreements', new Descriptor("iqs-services-facade", "operations", "agreements", "*", "1.0"));
        this._dependencyResolver.put('locations', new Descriptor("iqs-services-facade", "operations", "locations", "*", "1.0"));
        this._dependencyResolver.put('object-groups', new Descriptor("iqs-services-facade", "operations", "object-groups", "*", "1.0"));
        this._dependencyResolver.put('control-objects', new Descriptor("iqs-services-facade", "operations", "control-objects", "*", "1.0"));
        this._dependencyResolver.put('data-profiles', new Descriptor("iqs-services-facade", "operations", "data-profiles", "*", "1.0"));
        this._dependencyResolver.put('device-profiles', new Descriptor("iqs-services-facade", "operations", "device-profiles", "*", "1.0"));
        this._dependencyResolver.put('device-configs', new Descriptor("iqs-services-facade", "operations", "device-configs", "*", "1.0"));
        this._dependencyResolver.put('devices', new Descriptor("iqs-services-facade", "operations", "devices", "*", "1.0"));
        this._dependencyResolver.put('event-templates', new Descriptor("iqs-services-facade", "operations", "event-templates", "*", "1.0"));
        this._dependencyResolver.put('resolutions', new Descriptor("iqs-services-facade", "operations", "resolutions", "*", "1.0"));
        this._dependencyResolver.put('gateways', new Descriptor("iqs-services-facade", "operations", "gateways", "*", "1.0"));
        this._dependencyResolver.put('zones', new Descriptor("iqs-services-facade", "operations", "zones", "*", "1.0"));
        this._dependencyResolver.put('beacons', new Descriptor("iqs-services-facade", "operations", "beacons", "*", "1.0"));
        this._dependencyResolver.put('event-rules', new Descriptor("iqs-services-facade", "operations", "event-rules", "*", "1.0"));
        this._dependencyResolver.put('shifts', new Descriptor("iqs-services-facade", "operations", "shifts", "*", "1.0"));
        this._dependencyResolver.put('emergency-plans', new Descriptor("iqs-services-facade", "operations", "emergency-plans", "*", "1.0"));
        this._dependencyResolver.put('invitations', new Descriptor("iqs-services-facade", "operations", "invitations", "*", "1.0"));
        this._dependencyResolver.put('organization-roles', new Descriptor("iqs-services-facade", "operations", "roles", "*", "1.0"));
        
        this._dependencyResolver.put('curr-object-states', new Descriptor("iqs-services-facade", "operations", "curr-object-states", "*", "1.0"));
        this._dependencyResolver.put('curr-device-states', new Descriptor("iqs-services-facade", "operations", "curr-device-states", "*", "1.0"));
        this._dependencyResolver.put('incidents', new Descriptor("iqs-services-facade", "operations", "incidents", "*", "1.0"));
        this._dependencyResolver.put('rosters', new Descriptor("iqs-services-facade", "operations", "rosters", "*", "1.0"));
        this._dependencyResolver.put('signals', new Descriptor("iqs-services-facade", "operations", "signals", "*", "1.0"));
        this._dependencyResolver.put('corrections', new Descriptor("iqs-services-facade", "operations", "corrections", "*", "1.0"));
        this._dependencyResolver.put('state-updates', new Descriptor("iqs-services-facade", "operations", "state-updates", "*", "1.0"));
        this._dependencyResolver.put('rest-gateway', new Descriptor("iqs-services-facade", "operations", "rest-gateway", "*", "1.0"));
        this._dependencyResolver.put('route-analysis', new Descriptor("iqs-services-facade", "operations", "route-analysis", "*", "1.0"));

        this._dependencyResolver.put('operational-events', new Descriptor("iqs-services-facade", "operations", "operational-events", "*", "1.0"));
        this._dependencyResolver.put('object-data', new Descriptor("iqs-services-facade", "operations", "object-data", "*", "1.0"));
        this._dependencyResolver.put('object-positions', new Descriptor("iqs-services-facade", "operations", "object-positions", "*", "1.0"));
        this._dependencyResolver.put('object-states', new Descriptor("iqs-services-facade", "operations", "object-states", "*", "1.0"));
        this._dependencyResolver.put('object-routes', new Descriptor("iqs-services-facade", "operations", "object-routes", "*", "1.0"));
        this._dependencyResolver.put('attendance', new Descriptor("iqs-services-facade", "operations", "attendance", "*", "1.0"));
        this._dependencyResolver.put('organization-statistics', new Descriptor("iqs-services-facade", "operations", "organization-statistics", "*", "1.0"));
        
        this._dependencyResolver.put('organization-users', new Descriptor("iqs-services-facade", "operations", "organization-users", "*", "1.0"));
    
        this._dependencyResolver.put('cloudwatch', new Descriptor("iqs-services-facade", "operations", "cloudwatch", "*", "1.0"));
    }

    protected register(): void {
        this.registerAllMiddleware();
        this.registerInfrastructureRoutes();
        this.registerUsersRoutes();
        this.registerContentRoutes();
        this.registerRootRoutes();
        this.registerSupportRoutes();
        this.registerRealtimeRoutes();
        this.registerHistoricalRoutes();
        this.registerConfigurationRoutes();
    }

    private registerAllMiddleware(): void {
        let sessions = this._dependencyResolver.getOneRequired<SessionsOperationsV1>('sessions');
        if (sessions) {
            this.registerMiddleware(sessions.loadSessionOperation());
        }
    }

    private registerInfrastructureRoutes(): void {
        let auth = new AuthManagerV1();

        let about = this._dependencyResolver.getOneRequired<AboutOperations>('about');
        if (about) {
            this.registerRouteWithAuth('get', '/about', auth.anybody(), about.getAboutOperation());
        }

        let logging = this._dependencyResolver.getOneRequired<LoggingOperationsV1>('logging');
        if (logging) {
            this.registerRouteWithAuth('get', '/logging', auth.admin(), logging.getMessagesOperation());
            this.registerRouteWithAuth('get', '/logging/errors', auth.admin(), logging.getErrorsOperation());
            this.registerRouteWithAuth('get', '/logging/text', auth.admin(), logging.getMessagesAsTextOperation());
            this.registerRouteWithAuth('get', '/logging/errors/text', auth.admin(), logging.getErrorsAsTextOperation());
            this.registerRouteWithAuth('post', '/logging', auth.admin(), logging.writeMessageOperation());
            this.registerRouteWithAuth('del', '/logging', auth.admin(), logging.clearMessagesOperation());
        }

        let counters = this._dependencyResolver.getOneRequired<CountersOperationsV1>('counters');
        if (counters) {
            this.registerRouteWithAuth('get', '/counters', auth.admin(), counters.getCountersOperation());
            this.registerRouteWithAuth('get', '/counters/text', auth.admin(), counters.getCountersAsTextOperation());
            this.registerRouteWithAuth('post', '/counters', auth.admin(), counters.writeCounterOperation());
            this.registerRouteWithAuth('del', '/counters', auth.admin(), counters.clearCountersOperation());
        }

        let eventlog = this._dependencyResolver.getOneRequired<EventLogOperationsV1>('eventlog');
        if (eventlog) {
            this.registerRouteWithAuth('get', '/eventlog', auth.admin(), eventlog.getEventsOperation());
            this.registerRouteWithAuth('post', '/eventlog', auth.admin(), eventlog.logEventOperation());
        }

        let settings = this._dependencyResolver.getOneRequired<SettingsOperationsV1>('settings');
        if (settings) {
            this.registerRouteWithAuth('get', '/settings', auth.admin(), settings.getSectionsOperation());
            this.registerRouteWithAuth('get', '/settings/ids', auth.admin(), settings.getSectionIdsOperation());
            this.registerRouteWithAuth('get', '/settings/:id', auth.ownerOrAdmin('id'), settings.getSectionOperation());
            this.registerRouteWithAuth('get', '/settings/:id/:key', auth.ownerOrAdmin('id'), settings.getParameterOperation());
            this.registerRouteWithAuth('post', '/settings/:id', auth.ownerOrAdmin('id'), settings.setSectionOperation());
            this.registerRouteWithAuth('post', '/settings/:id/:key', auth.ownerOrAdmin('id'), settings.setParameterOperation());
            this.registerRouteWithAuth('post', '/settings/:id/:key/increment', auth.ownerOrAdmin('id'), settings.incrementParameterOperation());
            this.registerRouteWithAuth('put', '/settings/:id', auth.ownerOrAdmin('id'), settings.modifySectionOperation());
            this.registerRouteWithAuth('del', '/settings/:id', auth.ownerOrAdmin('id'), settings.clearSectionOperation());
        }

        let statistics = this._dependencyResolver.getOneRequired<StatisticsOperationsV1>('statistics');
        if (statistics) {
            this.registerRouteWithAuth('get', '/statistics/counters', auth.admin(), statistics.getCountersOperation());
            this.registerRouteWithAuth('get', '/statistics/groups', auth.admin(), statistics.getGroupsOperation());
            this.registerRouteWithAuth('post', '/statistics', auth.admin(), statistics.readCountersOperation());
            this.registerRouteWithAuth('get', '/statistics/:group', auth.admin(), statistics.readCountersByGroupOperation());
            this.registerRouteWithAuth('get', '/statistics/:group/:name', auth.admin(), statistics.readCounterOperation());
            this.registerRouteWithAuth('post', '/statistics/:group/:name', auth.admin(), statistics.incrementCounterOperation());
        }

        // Todo: Protect for various routes
        let blobs = this._dependencyResolver.getOneRequired<BlobsOperationsV1>('blobs');
        if (blobs) {
            this.registerRoute('get', '/blobs', blobs.getBlobsOperation());
            this.registerRoute('get', '/blobs/:blob_id/info', blobs.getBlobInfoOperation());
            this.registerRoute('get', '/blobs/:blob_id', blobs.getBlobOperation());
            this.registerRoute('post', '/blobs', blobs.setBlobOperation());
            this.registerRoute('post', '/blobs/url', blobs.loadBlobFromUrlOperation());
            this.registerRoute('put', '/blobs/:blob_id/info', blobs.updateBlobInfoOperation());
            this.registerRoute('put', '/blobs/:blob_id', blobs.setBlobOperation());
            this.registerRoute('put', '/blobs/:blob_id/url', blobs.loadBlobFromUrlOperation());
            this.registerRoute('del', '/blobs/:blob_id', blobs.deleteBlobOperation());

            this.registerRoute('get', '/avatars/:blob_id', blobs.getBlobOperation());
            this.registerRoute('put', '/avatars/:blob_id', blobs.setBlobOperation());
            this.registerRoute('del', '/avatars/:blob_id', blobs.deleteBlobOperation());
        }

        let email = this._dependencyResolver.getOneRequired<EmailOperationsV1>('email');
        if (email) {
            this.registerRouteWithAuth('post', '/email', auth.admin(), email.sendMessageOperation());
        }

        let sms = this._dependencyResolver.getOneRequired<SmsOperationsV1>('sms');
        if (sms) {
            this.registerRouteWithAuth('post', '/sms', auth.admin(), sms.sendMessageOperation());
        }

        let cloudwatch = this._dependencyResolver.getOneRequired<CloudwatchOperationsV1>('cloudwatch');
        if (cloudwatch) {
            this.registerRouteWithAuth('get', '/cloudwatch/log_groups', auth.admin(), cloudwatch.getAWSLogGroupsOperation());
            this.registerRouteWithAuth('get', '/cloudwatch/log_streams', auth.admin(), cloudwatch.getAWSLogStreamsOperation());
            this.registerRouteWithAuth('get', '/cloudwatch/logs', auth.admin(), cloudwatch.getAWSLogEventsOperation());
            this.registerRouteWithAuth('get', '/cloudwatch/metrics', auth.admin(), cloudwatch.getAWSMetricDataOperation());
        }
    }

    private registerUsersRoutes(): void {
        let auth = new AuthManagerV1();

        let sessions = this._dependencyResolver.getOneRequired<SessionsOperationsV1>('sessions');
        if (sessions) {
            this.registerRouteWithAuth('all', '/signup', auth.anybody(), sessions.signupOperation());
            this.registerRouteWithAuth('get', '/signup/validate', auth.anybody(), sessions.signupValidateOperation());
            this.registerRouteWithAuth('all', '/signin', auth.anybody(), sessions.signinOperation());
            this.registerRouteWithAuth('all', '/signout', auth.anybody(), sessions.signoutOperation());

            this.registerRouteWithAuth('get', '/sessions', auth.admin(), sessions.getSessionsOperation());
            this.registerRouteWithAuth('post', '/sessions/restore', auth.signed(), sessions.restoreSessionOperation());
            this.registerRouteWithAuth('get', '/sessions/current', auth.signed(), sessions.getCurrentSessionOperation());
            this.registerRouteWithAuth('get', '/sessions/:user_id', auth.ownerOrAdmin('user_id'), sessions.getUserSessionsOperation());
            this.registerRouteWithAuth('del', '/sessions/:user_id/:session_id', auth.ownerOrAdmin('user_id'), sessions.closeSessionOperation());
        }

        let accounts = this._dependencyResolver.getOneRequired<AccountsOperationsV1>('accounts');
        if (accounts) {
            this.registerRouteWithAuth('get', '/accounts', auth.signed(), accounts.getAccountsOperation());
            this.registerRouteWithAuth('get', '/accounts/current', auth.signed(), accounts.getCurrentAccountOperation());
            this.registerRouteWithAuth('get', '/accounts/:user_id', auth.ownerOrAdmin('user_id'), accounts.getAccountOperation());
            this.registerRouteWithAuth('post', '/accounts', auth.admin(), accounts.createAccountOperation());
            this.registerRouteWithAuth('put', '/accounts/:user_id', auth.ownerOrAdmin('user_id'), accounts.updateAccountOperation());
            this.registerRouteWithAuth('del', '/accounts/:user_id', auth.admin(), accounts.deleteAccountOperation());
        }

        let activities = this._dependencyResolver.getOneRequired<ActivitiesOperationsV1>('activities');
        if (activities) {
            this.registerRouteWithAuth('get', '/activities', auth.admin(), activities.getActivitiesOperation());
            this.registerRouteWithAuth('get', '/activities/:party_id', auth.ownerOrAdmin('party_id'), activities.getPartyActivitiesOperation());
            this.registerRouteWithAuth('post', '/activities', auth.admin(), activities.logPartyActivityOperation());
        }

        let passwords = this._dependencyResolver.getOneRequired<PasswordsOperationsV1>('passwords');
        if (passwords) {
            this.registerRouteWithAuth('post', '/passwords/recover', auth.anybody(), passwords.recoverPasswordOperation());
            this.registerRouteWithAuth('post', '/passwords/reset', auth.anybody(), passwords.resetPasswordOperation());
            this.registerRouteWithAuth('post', '/passwords/:user_id/change', auth.ownerOrAdmin('user_id'), passwords.changePasswordOperation());
        }

        let emailSettings = this._dependencyResolver.getOneRequired<EmailSettingsOperationsV1>('email-settings');
        if (emailSettings) {
            this.registerRouteWithAuth('post', '/email_settings/resend', auth.anybody(), emailSettings.resendVerificationOperation());
            this.registerRouteWithAuth('post', '/email_settings/verify', auth.anybody(), emailSettings.verifyEmailOperation());
            this.registerRouteWithAuth('get', '/email_settings/:user_id', auth.ownerOrAdmin('user_id'), emailSettings.getEmailSettingsOperation());
            this.registerRouteWithAuth('put', '/email_settings/:user_id', auth.ownerOrAdmin('user_id'), emailSettings.setEmailSettingsOperation());
        }

        let smsSettings = this._dependencyResolver.getOneRequired<SmsSettingsOperationsV1>('sms-settings');
        if (smsSettings) {
            this.registerRouteWithAuth('post', '/sms_settings/resend', auth.anybody(), smsSettings.resendVerificationOperation());
            this.registerRouteWithAuth('post', '/sms_settings/verify', auth.anybody(), smsSettings.verifyPhoneOperation());
            this.registerRouteWithAuth('get', '/sms_settings/:user_id', auth.ownerOrAdmin('user_id'), smsSettings.getSmsSettingsOperation());
            this.registerRouteWithAuth('put', '/sms_settings/:user_id', auth.ownerOrAdmin('user_id'), smsSettings.setSmsSettingsOperation());
        }

        let roles = this._dependencyResolver.getOneRequired<RolesOperationsV1>('roles');
        if (roles) {
            this.registerRouteWithAuth('get', '/roles/:user_id', auth.admin(), roles.getUserRolesOperation());
            this.registerRouteWithAuth('post', '/roles/:user_id/grant', auth.admin(), roles.grantUserRolesOperation());
            this.registerRouteWithAuth('post', '/roles/:user_id/revoke', auth.admin(), roles.revokeUserRolesOperation());
        }
    }

    private registerContentRoutes(): void {
        let auth = new AuthManagerV1();

        let applications = this._dependencyResolver.getOneRequired<ApplicationsOperationsV1>('applications');
        if (applications) {
            this.registerRouteWithAuth('get', '/applications', auth.anybody(), applications.getApplicationsOperation());
            this.registerRouteWithAuth('get', '/applications/:application_id', auth.anybody(), applications.getApplicationOperation());
            this.registerRouteWithAuth('post', '/applications', auth.admin(), applications.createApplicationOperation());
            this.registerRouteWithAuth('put', '/applications/:application_id', auth.admin(), applications.updateApplicationOperation());
            this.registerRouteWithAuth('del', '/applications/:application_id', auth.admin(), applications.deleteApplicationOperation());
        }

        let tips = this._dependencyResolver.getOneRequired<TipsOperationsV1>('tips');
        if (tips) {
            this.registerRouteWithAuth('get', '/tips', auth.anybody(), tips.getTipsOperation());
            this.registerRouteWithAuth('get', '/tips/random', auth.anybody(), tips.getRandomTipOperation());
            this.registerRouteWithAuth('get', '/tips/:tip_id', auth.anybody(), tips.getTipOperation());
            this.registerRouteWithAuth('post', '/tips', auth.admin(), tips.createTipOperation());
            this.registerRouteWithAuth('put', '/tips/:tip_id', auth.admin(), tips.updateTipOperation());
            this.registerRouteWithAuth('del', '/tips/:tip_id', auth.admin(), tips.deleteTipOperation());
        }

        let guides = this._dependencyResolver.getOneRequired<GuidesOperationsV1>('guides');
        if (guides) {
            this.registerRouteWithAuth('get', '/guides', auth.anybody(), guides.getGuidesOperation());
            this.registerRouteWithAuth('get', '/guides/random', auth.anybody(), guides.getRandomGuideOperation());
            this.registerRouteWithAuth('get', '/guides/:guide_id', auth.anybody(), guides.getGuideOperation());
            this.registerRouteWithAuth('post', '/guides', auth.admin(), guides.createGuideOperation());
            this.registerRouteWithAuth('put', '/guides/:guide_id', auth.admin(), guides.updateGuideOperation());
            this.registerRouteWithAuth('del', '/guides/:guide_id', auth.admin(), guides.deleteGuideOperation());
        }

        let help = this._dependencyResolver.getOneRequired<HelpOperationsV1>('help');
        if (help) {
            this.registerRouteWithAuth('get', '/help/topics', auth.anybody(), help.getTopicsOperation());
            this.registerRouteWithAuth('get', '/help/topics/:topic_id', auth.anybody(), help.getTopicOperation());
            this.registerRouteWithAuth('post', '/help/topics', auth.admin(), help.createTopicOperation());
            this.registerRouteWithAuth('put', '/help/topics/:topic_id', auth.admin(), help.updateTopicOperation());
            this.registerRouteWithAuth('del', '/help/topics/:topic_id', auth.admin(), help.deleteTopicOperation());

            this.registerRouteWithAuth('get', '/help/articles', auth.anybody(), help.getArticlesOperation());
            this.registerRouteWithAuth('get', '/help/articles/random', auth.anybody(), help.getRandomArticleOperation());
            this.registerRouteWithAuth('get', '/help/articles/:article_id', auth.anybody(), help.getArticleOperation());
            this.registerRouteWithAuth('post', '/help/articles', auth.admin(), help.createArticleOperation());
            this.registerRouteWithAuth('put', '/help/articles/:article_id', auth.admin(), help.updateArticleOperation());
            this.registerRouteWithAuth('del', '/help/articles/:article_id', auth.admin(), help.deleteArticleOperation());
        }
        
        let dashboards = this._dependencyResolver.getOneRequired<DashboardsOperationsV1>('dashboards');
        if (dashboards) {
            this.registerRouteWithAuth('get', '/dashboards', auth.admin(), dashboards.getDashboardsOperation());
            this.registerRouteWithAuth('get', '/dashboards/:user_id/:app/:kind', auth.ownerOrAdmin('user_id'), dashboards.getDashboardOperation());
            this.registerRouteWithAuth('post', '/dashboards/:user_id/:app/:kind', auth.ownerOrAdmin('user_id'), dashboards.setDashboardOperation());
            this.registerRouteWithAuth('del', '/dashboards', auth.admin(), dashboards.deleteDashboardsOperation());
        }

        let messageTemplates = this._dependencyResolver.getOneRequired<MessageTemplatesOperationsV1>('msgtemplates');
        if (messageTemplates) {
            this.registerRouteWithAuth('get', '/msg_templates', auth.admin(), messageTemplates.getTemplatesOperation());
            this.registerRouteWithAuth('get', '/msg_templates/:template_id', auth.admin(), messageTemplates.getTemplateOperation());
            this.registerRouteWithAuth('post', '/msg_templates', auth.admin(), messageTemplates.createTemplateOperation());
            this.registerRouteWithAuth('put', '/msg_templates/:template_id', auth.admin(), messageTemplates.updateTemplateOperation());
            this.registerRouteWithAuth('del', '/msg_templates/:template_id', auth.admin(), messageTemplates.deleteTemplateOperation());
        }

        let imagesets = this._dependencyResolver.getOneRequired<ImageSetsOperationsV1>('imagesets');
        if (imagesets) {
            this.registerRouteWithAuth('get', '/imagesets', auth.anybody(), imagesets.getImageSetsOperation());
            this.registerRouteWithAuth('get', '/imagesets/:imageset_id', auth.anybody(), imagesets.getImageSetOperation());
            this.registerRouteWithAuth('post', '/imagesets', auth.admin(), imagesets.createImageSetOperation());
            this.registerRouteWithAuth('put', '/imagesets/:imageset_id', auth.admin(), imagesets.updateImageSetOperation());
            this.registerRouteWithAuth('del', '/imagesets/:imageset_id', auth.admin(), imagesets.deleteImageSetOperation());
        }
    }

    private registerSupportRoutes(): void {
        let auth = new AuthManagerV1();

        let announcements = this._dependencyResolver.getOneRequired<AnnouncementsOperationsV1>('announcements');
        if (announcements) {
            this.registerRouteWithAuth('get', '/announcements', auth.anybody(), announcements.getAnnouncementsOperation());
            this.registerRouteWithAuth('get', '/announcements/random', auth.anybody(), announcements.getRandomAnnouncementOperation());
            this.registerRouteWithAuth('get', '/announcements/:announcement_id', auth.anybody(), announcements.getAnnouncementOperation());
            this.registerRouteWithAuth('post', '/announcements', auth.admin(), announcements.createAnnouncementOperation());
            this.registerRouteWithAuth('put', '/announcements/:announcement_id', auth.admin(), announcements.updateAnnouncementOperation());
            this.registerRouteWithAuth('del', '/announcements/:announcement_id', auth.admin(), announcements.deleteAnnouncementOperation());
        }

        let feedbacks = this._dependencyResolver.getOneRequired<FeedbacksOperationsV1>('feedbacks');
        if (feedbacks) {
            this.registerRouteWithAuth('get', '/feedbacks', auth.signed(), feedbacks.getFeedbacksOperation());
            this.registerRouteWithAuth('get', '/feedbacks/:feedback_id', auth.signed(), feedbacks.getFeedbackOperation());
            this.registerRouteWithAuth('post', '/feedbacks', auth.anybody(), feedbacks.sendFeedbackOperation());
            this.registerRouteWithAuth('put', '/feedbacks/:feedback_id', auth.admin(), feedbacks.replyFeedbackOperation());
            this.registerRouteWithAuth('del', '/feedbacks/:feedback_id', auth.admin(), feedbacks.deleteFeedbackOperation());
        }
    }

    private registerRootRoutes(): void {
        let auth = new AuthManagerV1();

        let clusters = this._dependencyResolver.getOneRequired<ClustersOperationsV1>('clusters');
        if (clusters) {
            this.registerRouteWithAuth('get', '/clusters', auth.admin(), clusters.getClustersOperation());
            this.registerRouteWithAuth('get', '/clusters/:cluster_id', auth.admin(), clusters.getClusterOperation());
            this.registerRouteWithAuth('get', '/clusters/organization/:org_id', auth.admin(), clusters.getClusterByOrganizationOperation());
            this.registerRouteWithAuth('post', '/clusters', auth.admin(), clusters.createClusterOperation());
            this.registerRouteWithAuth('post', '/clusters/add_organization', auth.admin(), clusters.ClusterAddOrganizationOperation());
            this.registerRouteWithAuth('post', '/clusters/remove_organization', auth.admin(), clusters.ClusterRemoveOrganizationOperation());
            this.registerRouteWithAuth('put', '/clusters/:cluster_id', auth.admin(), clusters.updateClusterOperation());
            this.registerRouteWithAuth('del', '/clusters/:cluster_id', auth.admin(), clusters.deleteClusterOperation());
        }

        let agreements = this._dependencyResolver.getOneRequired<ServiceAgreementsOperationsV1>('agreements');
        if (agreements) {
            this.registerRouteWithAuth('get', '/agreements', auth.admin(), agreements.getAgreementsOperation());
            this.registerRouteWithAuth('get', '/agreements/verify', auth.anybody(), agreements.verifyAgreementOperation());
            this.registerRouteWithAuth('get', '/agreements/:agreement_id', auth.admin(), agreements.getAgreementOperation());
            this.registerRouteWithAuth('post', '/agreements', auth.admin(), agreements.createAgreementOperation());
            this.registerRouteWithAuth('put', '/agreements/:agreement_id', auth.admin(), agreements.updateAgreementOperation());
            this.registerRouteWithAuth('del', '/agreements/:agreement_id', auth.admin(), agreements.deleteAgreementOperation());
        }
    }

    private registerConfigurationRoutes(): void {
        let auth = new AuthManagerV1();

        let creditCards = this._dependencyResolver.getOneRequired<CreditCardsOperationsV1>('credit-cards');
        if (creditCards) {
            this.registerRouteWithAuth('get', '/organizations/:customer_id/credit_cards', auth.organizationAdmin('customer_id'), creditCards.getCreditCardsOperation());
            this.registerRouteWithAuth('get', '/organizations/:customer_id/credit_cards/:card_id', auth.organizationAdmin('customer_id'), creditCards.getCreditCardOperation());
            this.registerRouteWithAuth('post', '/organizations/:customer_id/credit_cards', auth.organizationAdmin('customer_id'), creditCards.createCreditCardOperation());
            this.registerRouteWithAuth('put', '/organizations/:customer_id/credit_cards/:card_id', auth.organizationAdmin('customer_id'), creditCards.updateCreditCardOperation());
            this.registerRouteWithAuth('del', '/organizations/:customer_id/credit_cards/:card_id', auth.organizationAdmin('customer_id'), creditCards.deleteCreditCardOperation());
        }

        let locations = this._dependencyResolver.getOneRequired<LocationsOperationsV1>('locations');
        if (locations) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/locations', auth.organizationUser(), locations.getLocationsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/locations/:location_id', auth.organizationUser(), locations.getLocationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/locations', auth.organizationManager(), locations.createLocationOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/locations/:location_id', auth.organizationManager(), locations.updateLocationOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/locations/:location_id', auth.organizationManager(), locations.deleteLocationOperation());
        }

        let objectGroups = this._dependencyResolver.getOneRequired<ObjectGroupsOperationsV1>('object-groups');
        if (objectGroups) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_groups', auth.organizationUser(), objectGroups.getGroupsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_groups/:group_id', auth.organizationUser(), objectGroups.getGroupOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_groups', auth.organizationManager(), objectGroups.createGroupOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/object_groups/:group_id', auth.organizationManager(), objectGroups.updateGroupOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_groups/:group_id', auth.organizationManager(), objectGroups.deleteGroupOperation());
        }

        let controlObjects = this._dependencyResolver.getOneRequired<ControlObjectsOperationsV1>('control-objects');
        if (controlObjects) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/control_objects', auth.organizationUser(), controlObjects.getObjectsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/control_objects/:object_id', auth.organizationUser(), controlObjects.getObjectOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/control_objects', auth.organizationManager(), controlObjects.createObjectOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/control_objects/:object_id', auth.organizationManager(), controlObjects.updateObjectOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/control_objects/:object_id', auth.organizationManager(), controlObjects.deleteObjectOperation());
        }

        let dataProfiles = this._dependencyResolver.getOneRequired<DataProfilesOperationsV1>('data-profiles');
        if (dataProfiles) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/data_profiles', auth.organizationUser(), dataProfiles.getProfileOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/data_profiles', auth.organizationAdmin(), dataProfiles.setProfileOperation());
        }

        let deviceProfiles = this._dependencyResolver.getOneRequired<DeviceProfilesOperationsV1>('device-profiles');
        if (deviceProfiles) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices/profiles', auth.organizationUser(), deviceProfiles.getProfilesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices/profiles/base', auth.organizationUser(), deviceProfiles.getBaseProfilesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices/profiles/:profile_id', auth.organizationUser(), deviceProfiles.getProfileOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/profiles', auth.organizationAdmin(), deviceProfiles.createProfileOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/devices/profiles/:profile_id', auth.organizationManager(), deviceProfiles.updateProfileOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/devices/profiles/:profile_id', auth.organizationAdmin(), deviceProfiles.deleteProfileOperation());
        }

        let deviceConfigs = this._dependencyResolver.getOneRequired<DeviceConfigsOperationsV1>('device-configs');
        if (deviceConfigs) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices/configs/:device_id', auth.organizationUser(), deviceConfigs.getConfigOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/configs/:device_id', auth.organizationManager(), deviceConfigs.setConfigOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/configs/:device_id/request', auth.organizationManager(), deviceConfigs.requestConfigOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/configs/:device_id/send', auth.organizationManager(), deviceConfigs.sendConfigOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/configs/:device_id/receive', auth.organizationAdmin(), deviceConfigs.receiveConfigOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/devices/configs/:device_id', auth.organizationAdmin(), deviceConfigs.deleteConfigOperation());
        }

        let devices = this._dependencyResolver.getOneRequired<DevicesOperationsV1>('devices');
        if (devices) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices', auth.organizationUser(), devices.getDevicesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/devices/:device_id', auth.organizationUser(), devices.getDeviceOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices', auth.organizationAdmin(), devices.createDeviceOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/validate_udi', auth.signed(), devices.validateDeviceUdiOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/devices/:device_id', auth.organizationManager(), devices.updateDeviceOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/devices/:device_id', auth.organizationAdmin(), devices.deleteDeviceOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/devices/:device_id/ping', auth.organizationAdmin(), devices.pingDeviceOperation());
        }

        let eventTemplates = this._dependencyResolver.getOneRequired<EventTemplatesOperationsV1>('event-templates');
        if (eventTemplates) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/event_templates', auth.organizationUser(), eventTemplates.getTemplatesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/event_templates/:template_id', auth.organizationUser(), eventTemplates.getTemplateOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/event_templates', auth.organizationManager(), eventTemplates.createTemplateOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/event_templates/:template_id', auth.organizationManager(), eventTemplates.updateTemplateOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/event_templates/:template_id', auth.organizationManager(), eventTemplates.deleteTemplateOperation());
        }

        let resolutions = this._dependencyResolver.getOneRequired<ResolutionsOperationsV1>('resolutions');
        if (resolutions) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/resolutions', auth.organizationUser(), resolutions.getResolutionsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/resolutions/:resolution_id', auth.organizationUser(), resolutions.getResolutionOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/resolutions', auth.organizationManager(), resolutions.createResolutionOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/resolutions/:resolution_id', auth.organizationManager(), resolutions.updateResolutionOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/resolutions/:resolution_id', auth.organizationManager(), resolutions.deleteResolutionOperation());
        }

        let gateways = this._dependencyResolver.getOneRequired<GatewaysOperationsV1>('gateways');
        if (gateways) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/gateways', auth.organizationUser(), gateways.getGatewaysOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/gateways/:gateway_id', auth.organizationUser(), gateways.getGatewayOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/gateways', auth.organizationAdmin(), gateways.createGatewayOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/gateways/validate_udi', auth.signed(), gateways.validateGatewayUdiOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/gateways/:gateway_id', auth.organizationAdmin(), gateways.updateGatewayOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/gateways/:gateway_id', auth.organizationAdmin(), gateways.deleteGatewayOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/gateways/:gateway_id/ping', auth.organizationAdmin(), gateways.pingGatewayOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/gateways/:gateway_id/request_stats', auth.organizationAdmin(), gateways.requestStatisticsOperation());
        }

        let zones = this._dependencyResolver.getOneRequired<ZonesOperationsV1>('zones');
        if (zones) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/zones', auth.organizationUser(), zones.getZonesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/zones/:zone_id', auth.organizationUser(), zones.getZoneOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/zones', auth.organizationManager(), zones.createZoneOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/zones/:zone_id', auth.organizationManager(), zones.updateZoneOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/zones/:zone_id', auth.organizationManager(), zones.deleteZoneOperation());
        }

        let beacons = this._dependencyResolver.getOneRequired<BeaconsOperationsV1>('beacons');
        if (beacons) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/beacons', auth.organizationUser(), beacons.getBeaconsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/beacons/:beacon_id', auth.organizationUser(), beacons.getBeaconOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/beacons/calculate_position', auth.organizationManager(), beacons.calculatePositionOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/beacons', auth.organizationManager(), beacons.createBeaconOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/beacons/validate_udi', auth.signed(), beacons.validateBeaconUdiOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/beacons/:beacon_id', auth.organizationManager(), beacons.updateBeaconOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/beacons/:beacon_id', auth.organizationManager(), beacons.deleteBeaconOperation());
        }
        
        let eventRules = this._dependencyResolver.getOneRequired<EventRulesOperationsV1>('event-rules');
        if (eventRules) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/event_rules', auth.organizationUser(), eventRules.getEventRulesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/event_rules/:rule_id', auth.organizationUser(), eventRules.getEventRuleOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/event_rules', auth.organizationManager(), eventRules.createEventRuleOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/event_rules/:rule_id', auth.organizationManager(), eventRules.updateEventRuleOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/event_rules/:rule_id', auth.organizationManager(), eventRules.deleteEventRuleOperation());
        }

        let shifts = this._dependencyResolver.getOneRequired<ShiftsOperationsV1>('shifts');
        if (shifts) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/shifts', auth.organizationUser(), shifts.getShiftsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/shifts/:shift_id', auth.organizationUser(), shifts.getShiftOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/shifts', auth.organizationManager(), shifts.createShiftOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/shifts/:shift_id', auth.organizationManager(), shifts.updateShiftOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/shifts/:shift_id', auth.organizationManager(), shifts.deleteShiftOperation());
        }

        let emergencyPlans = this._dependencyResolver.getOneRequired<EmergencyPlansOperationsV1>('emergency-plans');
        if (emergencyPlans) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/emergency_plans', auth.organizationUser(), emergencyPlans.getPlansOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/emergency_plans/:plan_id', auth.organizationUser(), emergencyPlans.getPlanOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/emergency_plans', auth.organizationManager(), emergencyPlans.createPlanOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/emergency_plans/:plan_id', auth.organizationManager(), emergencyPlans.updatePlanOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/emergency_plans/:plan_id', auth.organizationManager(), emergencyPlans.deletePlanOperation());
        }

        let invitations = this._dependencyResolver.getOneRequired<InvitationsOperationsV1>('invitations');
        if (invitations) {
            // Todo: Restrict invitations to admins only 
            this.registerRouteWithAuth('get', '/organizations/:org_id/invitations', auth.organizationUser(), invitations.getInvitationsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/invitations/:invitation_id', auth.organizationUser(), invitations.getInvitationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/invitations', auth.signed(), invitations.sendInvitationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/invitations/notify', auth.organizationManager(), invitations.notifyInvitationOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/invitations/:invitation_id', auth.organizationManager(), invitations.deleteInvitationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/invitations/:invitation_id/approve', auth.organizationManager(), invitations.approveInvitationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/invitations/:invitation_id/deny', auth.organizationManager(), invitations.denyInvitationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/invitations/:invitation_id/resend', auth.organizationManager(), invitations.resendInvitationOperation());
        }
        
        let roles = this._dependencyResolver.getOneRequired<OrganizationRolesOperationsV1>('organization-roles');
        if (roles) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/users', auth.organizationUser(), roles.getOrganizationUsersOperation());
            this.registerRouteWithAuth('post', '/organizations/demo/roles', auth.signed(), roles.connectDemoOrganizationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/roles', auth.organizationAdmin(), roles.grantOrganizationRoleOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/roles', auth.organizationAdminOrOwner('user_id'), roles.revokeOrganizationRoleOperation());
        }

        let organizations = this._dependencyResolver.getOneRequired<OrganizationsOperationsV1>('organizations');
        if (organizations) {
            this.registerRouteWithAuth('get', '/organizations', auth.signed(), organizations.getAuthorizedOrganizationsOperation());
            this.registerRouteWithAuth('get', '/organizations/all', auth.admin(), organizations.getOrganizationsOperation());
            this.registerRouteWithAuth('get', '/organizations/find_by_code', auth.anybody(), organizations.findOrganizationByCodeOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id', auth.organizationUser(), organizations.getOrganizationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/generate_code', auth.organizationAdmin(), organizations.generateCodeOperation());
            this.registerRouteWithAuth('post', '/organizations', auth.signed(), organizations.createOrganizationOperation());
            this.registerRouteWithAuth('post', '/organizations/validate_code', auth.signed(), organizations.validateOrganizationCodeOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id', auth.organizationAdmin(), organizations.updateOrganizationOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id', auth.admin(), organizations.deleteOrganizationOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/remove', auth.organizationUser(), organizations.removeOrganizationOperation());
        }
    }

    private registerRealtimeRoutes(): void {
        let auth = new AuthManagerV1();

        let currObjectStates = this._dependencyResolver.getOneRequired<CurrentObjectStatesOperationsV1>('curr-object-states');
        if (currObjectStates) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_object_states', auth.organizationUser(), currObjectStates.getStatesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_object_states/:state_id', auth.organizationUser(), currObjectStates.getStateOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/curr_object_states/:state_id', auth.organizationAdmin(), currObjectStates.getStatesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/curr_object_states', auth.organizationAdmin(), currObjectStates.deleteStatesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/curr_object_states/:state_id', auth.organizationAdmin(), currObjectStates.deleteStateOperation());
        }

        let currDeviceStates = this._dependencyResolver.getOneRequired<CurrentDeviceStatesOperationsV1>('curr-device-states');
        if (currDeviceStates) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_device_states', auth.organizationUser(), currDeviceStates.getStatesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_device_states/:state_id', auth.organizationUser(), currDeviceStates.getStateOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/curr_device_states/:state_id', auth.organizationAdmin(), currDeviceStates.getStatesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/curr_device_states', auth.organizationAdmin(), currDeviceStates.deleteStatesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/curr_device_states/:state_id', auth.organizationAdmin(), currDeviceStates.deleteStateOperation());
        }
        
        let stateUpdates = this._dependencyResolver.getOneRequired<StateUpdatesOperationsV1>('state-updates');
        if (stateUpdates) {
            this.registerRouteWithAuth('post', '/organizations/:org_id/curr_object_states', auth.organizationAdmin(), stateUpdates.updateStateOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/state_updates', auth.organizationAdmin(), stateUpdates.updateStateOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/update_state', auth.organizationAdmin(), stateUpdates.updateStateOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/begin_update_state', auth.organizationAdmin(), stateUpdates.beginUpdateStateOperation());
        }

        // Todo: Protect routes
        let restGateway = this._dependencyResolver.getOneRequired<RestGatewayOperationsV1>('rest-gateway');
        if (restGateway) {
            this.registerRoute('post', '/gateway/update_status', restGateway.updateStatusOperation());
        }

        let incidents = this._dependencyResolver.getOneRequired<IncidentsOperationsV1>('incidents');
        if (incidents) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/incidents', auth.organizationUser(), incidents.getIncidentsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/incidents/count', auth.organizationUser(), incidents.getIncidentsCountOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/incidents/:incident_id', auth.organizationUser(), incidents.getIncidentOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/incidents', auth.organizationAdmin(), incidents.createIncidentOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/incidents/:incident_id', auth.organizationManager(), incidents.closeIncidentOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/incidents/:incident_id', auth.organizationAdmin(), incidents.deleteIncidentOperation());
        }

        let rosters = this._dependencyResolver.getOneRequired<RostersOperationsV1>('rosters');
        if (rosters) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/rosters', auth.organizationUser(), rosters.getRostersOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/rosters/:roster_id', auth.organizationUser(), rosters.getRosterOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/rosters', auth.organizationManager(), rosters.createRosterOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/rosters/:roster_id', auth.organizationManager(), rosters.updateRosterOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/rosters/:roster_id', auth.organizationManager(), rosters.deleteRosterOperation());
        }

        let signals = this._dependencyResolver.getOneRequired<SignalsOperationsV1>('signals');
        if (signals) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/signals', auth.organizationAdmin(), signals.getSignalsOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/signals', auth.organizationManager(), signals.sendSignalOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/signals/:signal_id/lock', auth.organizationAdmin(), signals.lockSignalOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/signals/:signal_id/close', auth.organizationAdmin(), signals.markSignalSentOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/signals/:signal_id', auth.organizationAdmin(), signals.deleteSignalOperation());
        }
        
        let corrections = this._dependencyResolver.getOneRequired<CorrectionsOperationsV1>('corrections');
        if (corrections) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/corrections', auth.organizationUser(), corrections.getCorrectionsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/corrections/:correction_id', auth.organizationUser(), corrections.getCorrectionOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/corrections', auth.organizationManager(), corrections.createCorrectionOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/corrections/:correction_id', auth.organizationManager(), corrections.updateCorrectionOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/corrections/:correction_id', auth.organizationManager(), corrections.deleteCorrectionOperation());
        }

        let routeAnalysis = this._dependencyResolver.getOneRequired<RouteAnalysisOperationsV1>('route-analysis');
        if (routeAnalysis) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_object_routes', auth.organizationUser(), routeAnalysis.getCurrentRoutesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/curr_object_routes/:object_id', auth.organizationUser(), routeAnalysis.getCurrentRouteOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/curr_object_routes/positions/batch', auth.organizationManager(), routeAnalysis.addPositionsOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/curr_object_routes/positions', auth.organizationManager(), routeAnalysis.addPositionOperation());
        }
    }

    private registerHistoricalRoutes(): void {
        let auth = new AuthManagerV1();

        let operationalEvents = this._dependencyResolver.getOneRequired<OperationalEventsOperationsV1>('operational-events');
        if (operationalEvents) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/operational_events', auth.organizationUser(), operationalEvents.getEventsOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/operational_events', auth.organizationManager(), operationalEvents.logEventOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/operational_events/:event_id', auth.organizationAdmin(), operationalEvents.deleteEventOperation());
        }

        let objectData = this._dependencyResolver.getOneRequired<ObjectDataOperationsV1>('object-data');
        if (objectData) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_data', auth.organizationUser(), objectData.getDataOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_data', auth.organizationAdmin(), objectData.addDataOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_data/batch', auth.organizationAdmin(), objectData.addDataBatchOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_data', auth.organizationAdmin(), objectData.deleteDataOperation());
        }

        let objectPositions = this._dependencyResolver.getOneRequired<ObjectPositionsOperationsV1>('object-positions');
        if (objectPositions) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_positions', auth.organizationUser(), objectPositions.getPositionsOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_positions/count', auth.organizationUser(), objectPositions.getPositionsCountOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_positions/count', auth.organizationUser(), objectPositions.getPositionsCountOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_positions', auth.organizationAdmin(), objectPositions.addPositionOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_positions/batch', auth.organizationAdmin(), objectPositions.addPositionsOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_positions', auth.organizationAdmin(), objectPositions.deletePositionsOperation());
        }

        let objectStates = this._dependencyResolver.getOneRequired<ObjectStatesOperationsV1>('object-states');
        if (objectStates) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_states', auth.organizationUser(), objectStates.getStatesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_states/timeline', auth.organizationUser(), objectStates.getTimelineStatesOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_states', auth.organizationAdmin(), objectStates.addStateOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_states/batch', auth.organizationAdmin(), objectStates.addStatesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_states', auth.organizationAdmin(), objectStates.deleteStatesOperation());
        }

        let objectRoutes = this._dependencyResolver.getOneRequired<ObjectRoutesOperationsV1>('object-routes');
        if (objectRoutes) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_routes', auth.organizationUser(), objectRoutes.getRoutesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/object_routes/:route_id', auth.organizationUser(), objectRoutes.getRouteOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/object_routes', auth.organizationManager(), objectRoutes.createRouteOperation());
            this.registerRouteWithAuth('put', '/organizations/:org_id/object_routes/:route_id', auth.organizationManager(), objectRoutes.updateRouteOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_routes/:route_id', auth.organizationManager(), objectRoutes.deleteRouteOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/object_routes', auth.organizationManager(), objectRoutes.deleteRoutesOperation());
        }

        let attendance = this._dependencyResolver.getOneRequired<AttendanceOperationsV1>('attendance');
        if (attendance) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/attendance', auth.organizationUser(), attendance.getAttendancesOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/attendance/within_time', auth.organizationUser(), attendance.getAttendancesWithinTimeOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/attendance', auth.organizationAdmin(), attendance.addAttendanceOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/attendance/batch', auth.organizationAdmin(), attendance.addAttendancesOperation());
            this.registerRouteWithAuth('del', '/organizations/:org_id/attendance', auth.organizationAdmin(), attendance.deleteAttendancesOperation());
        }
        
        let statistics = this._dependencyResolver.getOneRequired<OrganizationStatisticsOperationsV1>('organization-statistics');
        if (statistics) {
            this.registerRouteWithAuth('get', '/organizations/:org_id/statistics', auth.organizationUser(), statistics.readCountersByGroupOperation());
            this.registerRouteWithAuth('get', '/organizations/:org_id/statistics/:name', auth.organizationUser(), statistics.readCounterOperation());
            this.registerRouteWithAuth('post', '/organizations/:org_id/statistics/:name', auth.organizationAdmin(), statistics.incrementCounterOperation());
        }
    }
}