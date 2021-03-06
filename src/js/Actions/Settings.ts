import ActionConstants from 'Constants/Actions/Index';

/**
 * @param  {string} period
 */
export function updatePollPeriod(period: string)
{
  return dispatch => dispatch(updateSettingsValue('pollPeriod', period));
};

/**
 * @param  {string} key
 * @param  {any} value
 */
export function updateSettingsValue(key: string, value: any)
{
  return {
    type  : ActionConstants.settings.SET_SETTINGS_VALUE,
    key,
    value
  };
};

/**
 * @param  {boolean} enabled
 */
export function setNewItemsEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('newItemsEnabled', enabled);
};

/**
 * @param  {boolean} enabled
 */
export function setAlertSuccessEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('alertSuccessEnabled', enabled);
};

/**
 * @param  {boolean} enabled
 */
export function setAlertErrorEnabled(enabled: boolean)
{
  return updateSoundSettingsEnabled('alertErrorEnabled', enabled);
};


/**
 * @param  {string} key
 * @param  {boolean} enabled
 */
export function updateSoundSettingsEnabled(key: string, enabled: boolean)
{
  return {
    type    : ActionConstants.settings.SET_SOUND_SETTINGS_ENABLED,
    key,
    enabled
  };
};

/**
 * @param  {string} action
 */
export function setNotificationDoubleClickAction(action: string)
{
  return {
    type   : ActionConstants.settings.SET_NOTIFICATIONS_DOUBLE_CLICK_ACTION,
    action
  };
};

/**
 * @param  {boolean} confirm
 */
export function setConfirmBeforeMarkingMultipleNotificationsAsRead(confirm: boolean)
{
  return {
    type    : ActionConstants.settings.SET_CONFIRM_BEFORE_MARKING_NOTIFICATIONS_AS_READ,
    confirm
  };
};

/**
 * @param  {string} colorMode
 */
export function setColorMode(colorMode: string)
{
  return {
    type      : ActionConstants.settings.SET_COLOR_MODE,
    colorMode
  };
};