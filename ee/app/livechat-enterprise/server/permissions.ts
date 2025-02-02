import { Permissions, Roles } from '../../../../app/models/server/raw';

export const createPermissions = async (): Promise<void> => {
	const livechatMonitorRole = 'livechat-monitor';
	const livechatManagerRole = 'livechat-manager';
	const adminRole = 'admin';

	const monitorRole = await Roles.findOneById(livechatMonitorRole, { fields: { _id: 1 } });
	if (!monitorRole) {
		await Roles.createOrUpdate(livechatMonitorRole);
	}

	await Promise.all([
		Permissions.create('manage-livechat-units', [adminRole, livechatManagerRole]),
		Permissions.create('manage-livechat-monitors', [adminRole, livechatManagerRole]),
		Permissions.create('manage-livechat-tags', [adminRole, livechatManagerRole]),
		Permissions.create('manage-livechat-priorities', [adminRole, livechatManagerRole]),
		Permissions.create('manage-livechat-canned-responses', [adminRole, livechatManagerRole, livechatMonitorRole]),
	]);
};
