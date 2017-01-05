export const apiDomain = 'http://10.1.5.236:2500/'
export const loginUrl = apiDomain + 'oauth/token'
export const userUrl = apiDomain + 'api/user'
export const userListUrl = apiDomain + 'api/v1/user-list'
export const getUserConversationUrl = apiDomain + 'api/v1/get-user-conversation'
export const saveChatMessageUrl = apiDomain + 'api/v1/chat-save'
export const getAgentUserChatActive = apiDomain + 'api/v1/agent-active'
export const saveLiveChatMessageUrl = apiDomain + 'api/v1/set-live-chat'
export const getNotification = apiDomain + 'api/v1/notify-chat'
export const getLiveChat = apiDomain + 'api/v1/get-live-chat'
export const getAttributeLiveChat = apiDomain + 'api/v1/get-attribute-chat'
export const setEndLiveChat = apiDomain + 'api/v1/set-end-chat'

export const getHeader = function () {
	const tokenData = JSON.parse(window.localStorage.getItem('syaraniSession')) 
	const headers = {
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + tokenData.access_token
	}
	return headers
}