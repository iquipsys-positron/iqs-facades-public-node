import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { ClientFacadeServiceV1 } from '../services/ClientFacadeServiceV1';
import { ClustersOperationsV1 } from '../operations/version1/ClustersOperationsV1';
import { OrganizationsOperationsV1 } from '../operations/version1/OrganizationsOperationsV1';
import { ServiceAgreementsOperationsV1 } from '../operations/version1/ServiceAgreementsOperationsV1';
import { SessionsOperationsV1 } from '../operations/version1/SessionsOperationsV1';
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
import { RolesOperationsV1 } from '../operations/version1/RolesOperationsV1';

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

import { Shutdown } from 'pip-services3-components-node'

export class ClientFacadeServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-facade", "factory", "services", "default", "1.0");

	public static ClientServiceV1Descriptor = new Descriptor("iqs-services-facade", "service", "facade", "*", "1.0");
	public static SessionsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "sessions", "*", "1.0");
	public static ClustersOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "clusters", "*", "1.0");
	public static OrganizationsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "organizations", "*", "1.0");
	public static ServiceAgreementsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "agreements", "*", "1.0");
	public static LocationsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "locations", "*", "1.0");
	public static ObjectGroupsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "object-groups", "*", "1.0");
	public static ControlObjectsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "control-objects", "*", "1.0");
	public static DataProfilesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "data-profiles", "*", "1.0");
	public static DeviceProfilesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "device-profiles", "*", "1.0");
	public static DeviceConfigsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "device-configs", "*", "1.0");
	public static DevicesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "devices", "*", "1.0");
	public static EventTemplatesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "event-templates", "*", "1.0");
	public static ResolutionsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "resolutions", "*", "1.0");
	public static GatewaysOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "gateways", "*", "1.0");
	public static InvitationsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "invitations", "*", "1.0");
	public static RolesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "roles", "*", "1.0");
	
	public static CurrentObjectStatesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "curr-object-states", "*", "1.0");
	public static CurrentDeviceStatesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "curr-device-states", "*", "1.0");
	public static IncidentsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "incidents", "*", "1.0");
	public static ZonesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "zones", "*", "1.0");
	public static BeaconsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "beacons", "*", "1.0");
	public static EventRulesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "event-rules", "*", "1.0");
	public static ShiftsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "shifts", "*", "1.0");
	public static EmergencyPlansOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "emergency-plans", "*", "1.0");
	public static StateUpdatesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "state-updates", "*", "1.0");
	public static RestGatewayOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "rest-gateway", "*", "1.0");
	public static RouteAnalysisOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "route-analysis", "*", "1.0");

	public static OperationalEventsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "operational-events", "*", "1.0");
	public static ObjectDataOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "object-data", "*", "1.0");
	public static ObjectPositionsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "object-positions", "*", "1.0");
	public static ObjectStatesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "object-states", "*", "1.0");
	public static ObjectRoutesOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "object-routes", "*", "1.0");
	public static AttendanceOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "attendance", "*", "1.0");
	public static RostersOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "rosters", "*", "1.0");
	public static SignalsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "signals", "*", "1.0");
	public static CorrectionsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "corrections", "*", "1.0");
	public static OrganizationStatisticsOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "organization-statistics", "*", "1.0");

	public static OrganizationUsersOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "organization-users", "*", "1.0");

	public static CloudwatchOperationsV1Descriptor = new Descriptor("iqs-services-facade", "operations", "cloudwatch", "*", "1.0");
	
	public static readonly ShutdownDescriptor = new Descriptor("pip-services", "shutdown", "*", "*", "1.0");

	public constructor() {
		super();

		this.registerAsType(ClientFacadeServiceFactory.ClientServiceV1Descriptor, ClientFacadeServiceV1);
		this.registerAsType(ClientFacadeServiceFactory.SessionsOperationsV1Descriptor, SessionsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ClustersOperationsV1Descriptor, ClustersOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.OrganizationsOperationsV1Descriptor, OrganizationsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ServiceAgreementsOperationsV1Descriptor, ServiceAgreementsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.LocationsOperationsV1Descriptor, LocationsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ObjectGroupsOperationsV1Descriptor, ObjectGroupsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ControlObjectsOperationsV1Descriptor, ControlObjectsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.DataProfilesOperationsV1Descriptor, DataProfilesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.DeviceProfilesOperationsV1Descriptor, DeviceProfilesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.DeviceConfigsOperationsV1Descriptor, DeviceConfigsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.DevicesOperationsV1Descriptor, DevicesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.EventTemplatesOperationsV1Descriptor, EventTemplatesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ResolutionsOperationsV1Descriptor, ResolutionsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.GatewaysOperationsV1Descriptor, GatewaysOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.InvitationsOperationsV1Descriptor, InvitationsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.RolesOperationsV1Descriptor, RolesOperationsV1);
		
		this.registerAsType(ClientFacadeServiceFactory.CurrentObjectStatesOperationsV1Descriptor, CurrentObjectStatesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.CurrentDeviceStatesOperationsV1Descriptor, CurrentDeviceStatesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.IncidentsOperationsV1Descriptor, IncidentsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ZonesOperationsV1Descriptor, ZonesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.BeaconsOperationsV1Descriptor, BeaconsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.EventRulesOperationsV1Descriptor, EventRulesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ShiftsOperationsV1Descriptor, ShiftsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.EmergencyPlansOperationsV1Descriptor, EmergencyPlansOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.StateUpdatesOperationsV1Descriptor, StateUpdatesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.RestGatewayOperationsV1Descriptor, RestGatewayOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.RouteAnalysisOperationsV1Descriptor, RouteAnalysisOperationsV1);

		this.registerAsType(ClientFacadeServiceFactory.OperationalEventsOperationsV1Descriptor, OperationalEventsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ObjectDataOperationsV1Descriptor, ObjectDataOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ObjectPositionsOperationsV1Descriptor, ObjectPositionsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ObjectStatesOperationsV1Descriptor, ObjectStatesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.ObjectRoutesOperationsV1Descriptor, ObjectRoutesOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.AttendanceOperationsV1Descriptor, AttendanceOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.RostersOperationsV1Descriptor, RostersOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.SignalsOperationsV1Descriptor, SignalsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.CorrectionsOperationsV1Descriptor, CorrectionsOperationsV1);
		this.registerAsType(ClientFacadeServiceFactory.OrganizationStatisticsOperationsV1Descriptor, OrganizationStatisticsOperationsV1);

		this.registerAsType(ClientFacadeServiceFactory.CloudwatchOperationsV1Descriptor, CloudwatchOperationsV1);

		this.registerAsType(ClientFacadeServiceFactory.ShutdownDescriptor, Shutdown);
	}
	
}
